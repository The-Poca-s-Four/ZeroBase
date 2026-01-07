import { useAppContext } from '@/contexts/AppContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    RefreshControl
} from 'react-native';
import BudgetInfoCard from '../Reuse/BudgetInfoCard';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const {
    safeToSpend,
    unallocatedBalance,
    categoryOptions,
    incomeOptions,
    addTransaction,
    allocateFunds, 
    user,
    refreshData,
  } = useAppContext();
  
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeTab, setActiveTab] = useState('expense'); // expense | income | allocate

  // Determine which list to show
  const currentCategoryList = activeTab === 'income' ? incomeOptions : categoryOptions;

  // Form States
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  
  // Default to first item of current list when tab changes or initially
  const [selectedCategoryId, setSelectedCategoryId] = useState(currentCategoryList[0]?.id);
  
  // Allocate Tab State
  const [allocationPercents, setAllocationPercents] = useState({}); 

  const handlePercentChange = (catId, delta) => {
      setAllocationPercents(prev => {
          const current = prev[catId] || 0;
          const newValue = Math.max(0, Math.min(100, current + delta));
          return { ...prev, [catId]: newValue };
      });
  };

  const handleBatchAllocation = async () => {
      // Calculate total needed
      // Logic: Iterate keys in allocationPercents, calculate amount, call allocateFunds
      const categoriesToAllocate = Object.keys(allocationPercents).filter(k => allocationPercents[k] > 0);
      if (categoriesToAllocate.length === 0) {
           Alert.alert("Allocation", "Please set percentages for categories");
           return;
      }
      
      // Check total
      const totalPercent = Object.values(allocationPercents).reduce((a, b) => a + b, 0);
      if (totalPercent > 100) {
          Alert.alert("Error", "Total allocation exceeds 100%");
          return;
      }

      // Execute
      // Note: This matches "distributing safe to spend" or "unallocatedBalance"? 
      // User said "allocate is distributing funds (safe to spend) for each jar".
      // Usually you allocate the *Unallocated Balance*.
      // Let's assume the percentage is of the *Unallocated Balance*.
      // But if I allocate 20% to Food, I consume 20% of Unallocated?
      // Or is it "Set Food budget to 20% of Total Income"?
      // "Allocate is distributing funds (safe to spend) for each jar" implies Safe To Spend is the pool.
      // But `safeToSpend` is usually *derived* from (Income - Fixed - Savings).
      // Let's use `unallocatedBalance` as the base for now.
      
      const baseAmount = unallocatedBalance; // Or should it be (unallocatedBalance + currentAllocations)? 
      // If we are *adding* to budget, we are consuming Unallocated.
      // If we are *setting* budget, that's different.
      // `allocateFunds` *adds* amount.
      // So if I say 20% -> I want to add 20% of Base to this category.
      
      for (const catId of categoriesToAllocate) {
          const percent = allocationPercents[catId];
          const amountToAdd = Math.floor(baseAmount * (percent / 100));
          if (amountToAdd > 0) {
              await allocateFunds(amountToAdd, catId);
          }
      }
      
      setAllocationPercents({}); // Reset after done
      Alert.alert("Success", "Funds distributed successfully!");
  };

  // Effect to reset selection when tab changes
  React.useEffect(() => {
      const list = activeTab === 'income' ? incomeOptions : categoryOptions;
      if (list && list.length > 0) {
          setSelectedCategoryId(list[0].id);
      }
  }, [activeTab, categoryOptions, incomeOptions]);
  
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  }, [refreshData]);

  const handleTransaction = async () => {
      if (!amount) {
          Alert.alert("Enter amount");
          return;
      }
      const type = activeTab === 'expense' ? 'expense' : 'income';
      // Use standard Number.parseInt
      const amt = Number.parseInt(amount.replaceAll(/\./g, ''), 10);
      
      const cat = currentCategoryList.find(c => c.id === selectedCategoryId);
      
      await addTransaction({
          id: Date.now().toString(),
          amount: amt, 
          type,
          category: cat ? cat.name : 'General',
          note,
          date: new Date().toISOString()
      });
      
      // Reset form
      setAmount('');
      setNote('');
      Alert.alert("Success", `${type === 'income' ? 'Income' : 'Outcome'} added!`);
  };

  const formatNumber = (numString) => {
    if (!numString) return '';
    const cleaned = numString.toString().replaceAll(/\D/g, '');
    if (!cleaned) return '';
    return new Intl.NumberFormat('vi-VN').format(Number.parseInt(cleaned, 10));
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.greetingTitle}>Hey, {user?.name?.split(' ')[0] || 'Poca'}</Text>
            <TouchableOpacity style={styles.profileButton}>
                <Ionicons name="person-circle-outline" size={32} color="#FFF" />
            </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
             <View style={styles.balanceRow}>
                 <View>
                     <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                        <Text style={styles.limitAmount}>{formatNumber(safeToSpend.toString())}</Text>
                        <Text style={styles.limitTotal}>/400.000</Text>
                     </View>
                     <Text style={styles.limitLabel}>Today's Limit</Text>
                 </View>
                 <View style={{alignItems: 'flex-end'}}>
                     <Text style={styles.unallocAmount}>{formatNumber(unallocatedBalance.toString())}</Text>
                     <Text style={styles.limitLabel}>Unallocated balance</Text>
                 </View>
             </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
            <TouchableOpacity 
                style={[styles.tabButton, activeTab === 'expense' && styles.tabButtonExpense]}
                onPress={() => setActiveTab('expense')}
            >
                <Text style={[styles.tabText, activeTab === 'expense' && styles.tabTextActive]}>— Expense</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.tabButton, activeTab === 'income' && styles.tabButtonIncome]}
                onPress={() => setActiveTab('income')}
            >
                <Text style={[styles.tabText, activeTab === 'income' && styles.tabTextActive]}>+ Income</Text>
            </TouchableOpacity>

             <TouchableOpacity 
                style={[styles.tabButton, activeTab === 'allocate' && styles.tabButtonAllocate]}
                onPress={() => setActiveTab('allocate')}
            >
                <Text style={[styles.tabText, activeTab === 'allocate' && styles.tabTextActiveAllocate]}>% Allocate</Text>
            </TouchableOpacity>
        </View>

        {/* Input Form Area */}
        <View style={styles.formContainer}>
            {activeTab === 'allocate' ? (
                // ALLOCATE FORM (Vertical List)
                <View>
                    <View style={styles.allocHeader}>
                         <Text style={styles.allocTitle}>Unallocated balance</Text>
                         <Text style={styles.allocValue}>{formatNumber(unallocatedBalance.toString())}</Text>
                    </View>
                    
                    {/* Vertical List of Categories */}
                    <View style={{marginBottom: 20}}>
                        {categoryOptions.map(cat => {
                            const percent = allocationPercents[cat.id] || 0;
                            const amountVal = Math.floor(unallocatedBalance * (percent / 100));
                            const remaining = (cat.budget || 0) - (cat.spent || 0);
                            
                            return (
                                <View key={cat.id} style={styles.allocCard}>
                                    {/* Top Row: Icon, Name, Current Status */}
                                    <View style={styles.allocTopRow}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={[styles.miniIcon, {backgroundColor: cat.color}]}>
                                                <Text>{cat.icon}</Text>
                                            </View>
                                            <Text style={styles.catName}>{cat.name}</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end'}}>
                                            <Text style={styles.budgetLabel}>Budget: <Text style={{fontWeight: 'bold', color: '#333'}}>{formatNumber((cat.budget || 0).toString())}</Text></Text>
                                            <Text style={styles.budgetLabel}>Spent: <Text style={{color: '#E53935'}}>{formatNumber((cat.spent || 0).toString())}</Text></Text>
                                        </View>
                                    </View>
                                    
                                    {/* Middle: Control & New Allocation */}
                                    <View style={styles.allocControlRow}>
                                         <View style={styles.percentControl}>
                                            <TouchableOpacity onPress={() => handlePercentChange(cat.id, -5)}>
                                                <Ionicons name="remove-circle-outline" size={28} color="#666" />
                                            </TouchableOpacity>
                                            <Text style={styles.percentText}>{percent}%</Text>
                                            <TouchableOpacity onPress={() => handlePercentChange(cat.id, 5)}>
                                                <Ionicons name="add-circle-outline" size={28} color="#666" />
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text style={styles.addingLabel}>Adding:</Text>
                                            <Text style={styles.allocCalcValue}>+{formatNumber(amountVal.toString())}</Text>
                                        </View>
                                    </View>

                                    {/* Bottom: Bar or Remaining */}
                                    <View style={styles.allocBottom}>
                                        <View style={styles.progressBarBg}>
                                            <View style={[styles.progressBarFill, { 
                                                width: `${Math.min(100, ((cat.spent||0) / (cat.budget||1)) * 100)}%`,
                                                backgroundColor: cat.color 
                                            }]} />
                                        </View>
                                        <Text style={styles.leftText}>Left: {formatNumber(remaining.toString())}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>

                     <TouchableOpacity style={styles.allocateButton} onPress={handleBatchAllocation}>
                        <Text style={styles.buttonText}>Confirm Allocation</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                // INCOME / EXPENSE FORM
                <View>
                    {/* Category Selector (Horizontal List) - ONLY for Income/Expense */}
                    <View style={{marginBottom: 20}}>
                        <Text style={styles.inputLabel}>Select {activeTab === 'income' ? 'Source' : 'Category'}</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}>
                            {currentCategoryList.map(cat => (
                                <TouchableOpacity 
                                    key={cat.id} 
                                    style={[styles.catChip, selectedCategoryId === cat.id && styles.catChipSelected, {borderColor: cat.color}]}
                                    onPress={() => setSelectedCategoryId(cat.id)}
                                >
                                    <Text style={{fontSize: 20}}>{cat.icon}</Text>
                                    {selectedCategoryId === cat.id && <Text style={[styles.catChipText, {color: cat.color}]}>{cat.name}</Text>}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.inputRow}>
                        <Text style={styles.inputLabel}>Amount</Text>
                        <TextInput 
                            style={styles.mainInput}
                            placeholder="0"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={t => setAmount(formatNumber(t))}
                        />
                    </View>

                     <TextInput 
                        style={styles.noteInput}
                        placeholder="Note"
                        value={note}
                        onChangeText={setNote}
                     />

                     <TouchableOpacity 
                        style={[styles.actionButton, activeTab === 'income' ? styles.btnIncome : styles.btnExpense]}
                        onPress={handleTransaction}
                     >
                        <Text style={styles.buttonText}>{activeTab === 'income' ? 'Confirm Income' : 'Confirm Expense'}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>

        {/* Bottom Horizontal List */}
        <View style={styles.bottomList}>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingRight: 20}}>
                <View style={{width: 160, marginRight: 15}}>
                     <BudgetInfoCard 
                        type="daily"
                        color="#C5A880"
                        icon="silverware-fork-knife"
                        title="Safe to Spend"
                        progressText={`${formatNumber((safeToSpend/2).toString())} paid / ${formatNumber(safeToSpend.toString())}`} 
                        statusTitle="Daily spending"
                        statusValue={`${formatNumber(safeToSpend.toString())}`}
                        percent={70}
                     />
                 </View>
                 <View style={{width: 160, marginRight: 15}}>
                     <BudgetInfoCard 
                        type="savings"
                        color="#4A7C59"
                        icon="piggy-bank"
                        title="Savings goals sample"
                        progressText="5 000 000 / 10 000 000"
                        statusTitle="Congratulation!"
                        statusValue="You got 100%"
                        percent={50}
                     />
                 </View>
                 <View style={{width: 160, marginRight: 15}}>
                     <BudgetInfoCard 
                        type="future"
                        color="#AD4284"
                        icon="silverware-fork-knife" // Uses same icon as daily in image but we can change if needed. Image shows store/fork.
                        title="Future Budget sample"
                        progressText="5 000 000 / 10 000 000"
                        statusTitle="Congratulation!"
                        statusValue="You got 100%"
                        percent={100}
                     />
                 </View>
                 <View style={{width: 160, marginRight: 15}}>
                     <BudgetInfoCard 
                        type="fixed"
                        color="#4E81A5"
                        icon="scooter"
                        title="Fixed payment sample"
                        progressText="1 000 000 / 4 000 000"
                        statusTitle="Payment Date"
                        statusValue="June 14"
                        percent={25}
                     />
                 </View>
             </ScrollView>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    marginBottom: 20,
  },
  greetingTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFF',
  },
  balanceCard: {
      backgroundColor: '#FFF',
      marginHorizontal: 20,
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
  },
  balanceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  limitAmount: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
  },
  limitTotal: {
      fontSize: 14,
      color: '#999',
      marginLeft: 4,
  },
  limitLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: '#000',
      marginTop: 4,
  },
  unallocAmount: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
  },
  tabContainer: {
      flexDirection: 'row',
      marginHorizontal: 20,
      marginBottom: 10, // Overlap effect handled by formContainer margin? No, standard gap
      justifyContent: 'space-between'
  },
  tabButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: '#FFF', // Default logic for styling
      backgroundColor: 'transparent', 
      marginHorizontal: 3,
  },
  tabButtonExpense: {
      borderColor: '#E57373',
      backgroundColor: '#FFEBEE',
  },
  tabButtonIncome: {
      borderColor: '#81C784',
      backgroundColor: '#E8F5E9',
  },
  tabButtonAllocate: {
      borderColor: '#D4A574',
      backgroundColor: '#FFF8E1',
  },
  tabText: {
      fontWeight: '600',
      color: '#FFF',
  },
  tabTextActive: {
      color: '#333', // Or strict colors
  },
  tabTextActiveAllocate: {
      color: '#D4A574',
  },
  formContainer: {
      backgroundColor: '#FFF',
      marginHorizontal: 20,
      borderRadius: 24,
      padding: 20,
      minHeight: 300,
      marginBottom: 30,
  },
  inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
      paddingBottom: 8,
  },
  inputLabel: {
      fontSize: 16,
      color: '#F06292', // Pinkish red for expense label hint
      fontWeight: '600',
  },
  mainInput: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      flex: 1,
      textAlign: 'right',
  },
  selectorRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
  },
  catSelector: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  iconBox: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
  },
  catName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
  },
  catBal: {
      fontSize: 12,
      color: '#999',
  },
  dateBadge: {
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
  },
  dateText: {
      fontWeight: '600',
      color: '#333',
  },
  noteInput: {
      fontSize: 16,
      color: '#999',
      marginBottom: 30,
  },
  actionButton: {
      paddingVertical: 16,
      borderRadius: 30,
      alignItems: 'center',
  },
  btnExpense: {
      backgroundColor: '#FFCDD2',
  },
  btnIncome: {
      backgroundColor: '#C8E6C9',
  },
  buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333', // Or slightly darker shade of theme
  },
  // Alloc styles
  allocHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
  },
  allocTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
  },
  allocValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#D4A574',
  },
  allocRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 30,
      marginTop: 10,
  },
  allocInput: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'right',
      width: 120,
      borderBottomWidth: 1,
      borderBottomColor: '#CCC',
  },
  miniIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
  },
  allocateButton: {
      backgroundColor: '#FFF3E0',
      paddingVertical: 16,
      borderRadius: 30,
      alignItems: 'center',
  },
  bottomList: {
      paddingLeft: 20,
  },
  catChip: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#EEE',
      marginRight: 10,
      backgroundColor: '#FAFAFA',
      height: 48,
  },
  catChipSelected: {
      backgroundColor: '#FFF',
      borderWidth: 2,
      paddingHorizontal: 12,
  },
  catChipText: {
      marginLeft: 6,
      fontWeight: '600',
      fontSize: 14,
  },
  allocCard: {
      backgroundColor: '#FAFAFA',
      borderRadius: 16,
      padding: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#EEE',
  },
  allocTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
  },
  budgetLabel: {
      fontSize: 12,
      color: '#666',
  },
  allocControlRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      paddingVertical: 8,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#EEE',
  },
  percentControl: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  percentText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginHorizontal: 8,
      width: 40,
      textAlign: 'center',
  },
  addingLabel: {
      fontSize: 10,
      color: '#999',
      textAlign: 'right',
  },
  allocCalcValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#4CAF50',
  },
  allocBottom: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  progressBarBg: {
      flex: 1,
      height: 6,
      backgroundColor: '#E0E0E0',
      borderRadius: 3,
      marginRight: 12,
  },
  progressBarFill: {
      height: '100%',
      borderRadius: 3,
  },
  leftText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#333',
  },
});
