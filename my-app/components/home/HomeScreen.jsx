import { useAppContext } from '@/contexts/AppContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;
const CARD_SPACING = 15;

export default function HomeScreen() {
  // Use AppContext
  const {
    todayLimit,
    todaySpent,
    unallocatedBalance,
    categoryOptions,
    transactions,
    setTodayLimit,
    setTodaySpent,
    setUnallocatedBalance,
    addCategory,
    addTransaction,
    updateTodaySpent,
    updateUnallocatedBalance,
  } = useAppContext();
  
  // Tab states
  const [activeTab, setActiveTab] = useState(null);
  
  // Form states - Expense
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState({ name: 'Food', icon: '🍔', color: '#F4A460' });
  const [expenseNote, setExpenseNote] = useState('');
  
  // Form states - Income
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeSource, setIncomeSource] = useState('Salary');
  const [incomeNote, setIncomeNote] = useState('');
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  
  // New category form states
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('📦');
  const [newCategoryColor, setNewCategoryColor] = useState('#4A90E2');
  const [newCategoryBudget, setNewCategoryBudget] = useState('');

  const categories = [
    { id: '1', name: 'Transportation', icon: '🚗', amount: 1000000, total: 4000000, color: '#4A90E2' },
    { id: '2', name: 'Food', icon: '🍔', amount: 1000000, total: 4000000, color: '#50C878' },
    { id: '3', name: 'Entertainment', icon: '🎮', amount: 500000, total: 2000000, color: '#FF6B6B' },
    { id: '4', name: 'Shopping', icon: '🛍️', amount: 800000, total: 3000000, color: '#FFD93D' },
  ];

  const streakDays = [
    { day: 'S', completed: true, icon: '❄️' },
    { day: 'M', completed: true, icon: '🛡️' },
    { day: 'T', completed: true, icon: '🔥' },
    { day: 'W', completed: true, icon: '🔥' },
    { day: 'T', completed: true, icon: '🔥' },
    { day: 'F', completed: true, icon: '🔥' },
    { day: 'S', completed: false, icon: '⚡' },
  ];

  // Handlers
  const handleAddExpense = () => {
    if (!expenseAmount || parseFloat(expenseAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const amount = parseFloat(expenseAmount);
    const newTransaction = {
      id: Date.now().toString(),
      type: 'expense',
      category: expenseCategory.name,
      amount: amount,
      note: expenseNote,
      date: new Date().toISOString(),
    };

    addTransaction(newTransaction);
    updateTodaySpent(amount);
    
    Alert.alert('Success', `Added expense of ${formatAmount(amount)} to ${expenseCategory.name}`);
    
    // Reset form
    setExpenseAmount('');
    setExpenseNote('');
    setActiveTab(null);
  };

  const handleAddIncome = () => {
    if (!incomeAmount || parseFloat(incomeAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const amount = parseFloat(incomeAmount);
    const newTransaction = {
      id: Date.now().toString(),
      type: 'income',
      category: incomeSource,
      amount: amount,
      note: incomeNote,
      date: new Date().toISOString(),
    };

    addTransaction(newTransaction);
    updateUnallocatedBalance(amount);
    
    Alert.alert('Success', `Added income of ${formatAmount(amount)} from ${incomeSource}`);
    
    // Reset form
    setIncomeAmount('');
    setIncomeNote('');
    setActiveTab(null);
  };

  const handleEditBalance = (field) => {
    setEditField(field);
    if (field === 'todayLimit') {
      setEditValue(todayLimit.toString());
    } else if (field === 'unallocatedBalance') {
      setEditValue(unallocatedBalance.toString());
    }
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const value = parseFloat(editValue);
    if (isNaN(value) || value < 0) {
      Alert.alert('Error', 'Please enter a valid number');
      return;
    }

    if (editField === 'todayLimit') {
      setTodayLimit(value);
    } else if (editField === 'unallocatedBalance') {
      setUnallocatedBalance(value);
    }

    setShowEditModal(false);
    Alert.alert('Success', 'Updated successfully');
  };

  const handleAddNewCategory = () => {
    if (!newCategoryName.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    if (!newCategoryBudget || parseFloat(newCategoryBudget) <= 0) {
      Alert.alert('Error', 'Please enter a valid budget');
      return;
    }

    const newCategory = {
      name: newCategoryName.trim(),
      icon: newCategoryIcon,
      color: newCategoryColor,
      budget: parseFloat(newCategoryBudget),
    };

    addCategory(newCategory);
    Alert.alert('Success', `Category "${newCategoryName}" added successfully`);

    // Reset form
    setNewCategoryName('');
    setNewCategoryIcon('📦');
    setNewCategoryColor('#4A90E2');
    setNewCategoryBudget('');
    setShowAddCategoryModal(false);
  };

  const colorOptions = [
    '#F4A460', '#4A90E2', '#FF6B6B', '#FFD93D', 
    '#50C878', '#9B59B6', '#E74C3C', '#3498DB',
    '#2ECC71', '#F39C12', '#E91E63', '#9C27B0',
  ];

  const iconOptions = [
    '🍔', '🚗', '🎮', '🛍️', '💊', '📚',
    '☕', '🎬', '✈️', '🏠', '💼', '🎵',
    '⚽', '🎨', '📱', '💻', '🍕', '🏋️',
  ];

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
    }
  };

  // Render functions
  const renderCategoryCard = ({ item }) => {
    const percentage = (item.amount / item.total) * 100;
    
    return (
      <View style={[styles.categoryCard, { borderColor: item.color }]}>
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Text style={styles.categoryIcon}>{item.icon}</Text>
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryAmount}>
          {formatAmount(item.amount)} <Text style={styles.categoryTotal}>of {formatAmount(item.total)}</Text>
        </Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: item.color }]} />
        </View>
      </View>
    );
  };

  const renderExpenseForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <Text style={styles.formTitle}>Add Expense</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="0"
          keyboardType="numeric"
          value={expenseAmount}
          onChangeText={setExpenseAmount}
          placeholderTextColor="#CCC"
        />
      </View>

      <TouchableOpacity 
        style={styles.categorySelectButton}
        onPress={() => setShowCategoryModal(true)}
      >
        <View style={styles.categorySelector}>
          <View style={[styles.smallIconContainer, { backgroundColor: expenseCategory.color }]}>
            <Text style={styles.smallIcon}>{expenseCategory.icon}</Text>
          </View>
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryLabel}>{expenseCategory.name}</Text>
            <Text style={styles.allowanceSubtext}>
              {formatAmount(categoryOptions.find(c => c.name === expenseCategory.name)?.budget || 0)} budget
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Note (Optional)</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="Add a note..."
          value={expenseNote}
          onChangeText={setExpenseNote}
          placeholderTextColor="#CCC"
          multiline
        />
      </View>

      <TouchableOpacity style={styles.outcomeButton} onPress={handleAddExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );

  const renderIncomeForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <Text style={styles.formTitle}>Add Income</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="0"
          keyboardType="numeric"
          value={incomeAmount}
          onChangeText={setIncomeAmount}
          placeholderTextColor="#CCC"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Source</Text>
        <View style={styles.sourceButtons}>
          {['Salary', 'Freelance', 'Investment', 'Other'].map((source) => (
            <TouchableOpacity
              key={source}
              style={[
                styles.sourceButton,
                incomeSource === source && styles.sourceButtonActive
              ]}
              onPress={() => setIncomeSource(source)}
            >
              <Text style={[
                styles.sourceButtonText,
                incomeSource === source && styles.sourceButtonTextActive
              ]}>
                {source}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Note (Optional)</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="Add a note..."
          value={incomeNote}
          onChangeText={setIncomeNote}
          placeholderTextColor="#CCC"
          multiline
        />
      </View>

      <TouchableOpacity style={styles.incomeButton} onPress={handleAddIncome}>
        <Text style={styles.buttonText}>Add Income</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAllocateForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <Text style={styles.formTitle}>Allocate Budget</Text>
      </View>

      <View style={styles.allocateInfo}>
        <Text style={styles.allocateLabel}>Available Balance</Text>
        <Text style={styles.allocateAmount}>{formatAmount(unallocatedBalance)}</Text>
      </View>

      <Text style={styles.allocateDescription}>
        Distribute your unallocated balance across different categories to manage your spending better.
      </Text>

      <View style={styles.allocateList}>
        {categoryOptions.slice(0, 4).map((category, index) => (
          <View key={index} style={styles.allocateItem}>
            <View style={styles.allocationLeft}>
              <View style={[styles.smallIconContainer, { backgroundColor: category.color }]}>
                <Text style={styles.smallIcon}>{category.icon}</Text>
              </View>
              <View>
                <Text style={styles.allocationName}>{category.name}</Text>
                <Text style={styles.allocationSubtext}>Current: {formatAmount(category.budget)}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.allocateActionButton}>
              <Ionicons name="add-circle-outline" size={28} color="#D4A574" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.allocateButton}>
        <Text style={styles.buttonText}>Confirm Allocation</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={[
          styles.transactionIcon,
          { backgroundColor: item.type === 'income' ? '#E8F5E9' : '#FFEBEE' }
        ]}>
          <Ionicons 
            name={item.type === 'income' ? 'arrow-down' : 'arrow-up'} 
            size={20} 
            color={item.type === 'income' ? '#4CAF50' : '#F44336'} 
          />
        </View>
        <View>
          <Text style={styles.transactionCategory}>{item.category}</Text>
          <Text style={styles.transactionNote}>{item.note || 'No note'}</Text>
          <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
        </View>
      </View>
      <Text style={[
        styles.transactionAmount,
        { color: item.type === 'income' ? '#4CAF50' : '#F44336' }
      ]}>
        {item.type === 'income' ? '+' : '-'} {formatAmount(item.amount)}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hey, Poca</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceRow}>
          <TouchableOpacity onPress={() => handleEditBalance('todayLimit')}>
            <Text style={styles.balanceAmount}>{formatAmount(todaySpent)}</Text>
            <Text style={styles.balanceSubtitle}>Today's Spending</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEditBalance('unallocatedBalance')}>
            <View style={styles.balanceRight}>
              <Text style={styles.balanceAmount}>{formatAmount(unallocatedBalance)}</Text>
              <Text style={styles.balanceSubtitle}>Unallocated balance</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.limitRow}>
          <Text style={styles.totalLimit}>
            /{formatAmount(todayLimit)} Today's Limit
          </Text>
          <TouchableOpacity onPress={() => handleEditBalance('todayLimit')}>
            <Ionicons name="create-outline" size={18} color="#999" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'outcome' && styles.activeOutcomeTab]}
          onPress={() => setActiveTab(activeTab === 'outcome' ? null : 'outcome')}
        >
          <Text style={[styles.tabText, activeTab === 'outcome' && styles.activeOutcomeTabText]}>
            − Expense
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'income' && styles.activeIncomeTab]}
          onPress={() => setActiveTab(activeTab === 'income' ? null : 'income')}
        >
          <Text style={[styles.tabText, activeTab === 'income' && styles.activeIncomeTabText]}>
            + Income
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'allocate' && styles.activeAllocateTab]}
          onPress={() => setActiveTab(activeTab === 'allocate' ? null : 'allocate')}
        >
          <Text style={[styles.tabText, activeTab === 'allocate' && styles.activeAllocateTabText]}>
            % Allocate
          </Text>
        </TouchableOpacity>
      </View>

      {/* Forms */}
      {activeTab === 'outcome' && renderExpenseForm()}
      {activeTab === 'income' && renderIncomeForm()}
      {activeTab === 'allocate' && renderAllocateForm()}

      {/* Recent Transactions */}
      {transactions.length > 0 && (
        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transactionsList}>
            {transactions.slice(0, 5).map((item) => (
              <View key={item.id}>
                {renderTransactionItem({ item })}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Streak Section */}
      <View style={styles.streakCard}>
        <View style={styles.streakHeader}>
          <Text style={styles.streakTitle}>4-day streak</Text>
          <Text style={styles.streakAvailable}>❄️ 4 available</Text>
        </View>
        <View style={styles.streakDays}>
          {streakDays.map((item, index) => (
            <View key={index} style={styles.streakDay}>
              <Text style={styles.streakDayLabel}>{item.day}</Text>
              <Text style={styles.streakIcon}>{item.icon}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Budget Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          snapToInterval={CARD_WIDTH + CARD_SPACING}
          decelerationRate="fast"
          snapToAlignment="start"
        />
      </View>

      {/* Category Selection Modal */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {categoryOptions.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryOption}
                  onPress={() => {
                    setExpenseCategory(category);
                    setShowCategoryModal(false);
                  }}
                >
                  <View style={styles.categorySelector}>
                    <View style={[styles.smallIconContainer, { backgroundColor: category.color }]}>
                      <Text style={styles.smallIcon}>{category.icon}</Text>
                    </View>
                    <View>
                      <Text style={styles.categoryLabel}>{category.name}</Text>
                      <Text style={styles.allowanceSubtext}>Budget: {formatAmount(category.budget)}</Text>
                    </View>
                  </View>
                  {expenseCategory.name === category.name && (
                    <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                  )}
                </TouchableOpacity>
              ))}
              
              {/* Add New Category Button */}
              <TouchableOpacity
                style={styles.addCategoryOptionButton}
                onPress={() => {
                  setShowCategoryModal(false);
                  setTimeout(() => setShowAddCategoryModal(true), 300);
                }}
              >
                <Ionicons name="add-circle-outline" size={32} color="#4CAF50" />
                <Text style={styles.addCategoryOptionText}>Add New Category</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Add New Category Modal */}
      <Modal
        visible={showAddCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Category</Text>
              <TouchableOpacity onPress={() => setShowAddCategoryModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.newCategoryForm}>
              {/* Category Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Category Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g., Groceries, Bills..."
                  value={newCategoryName}
                  onChangeText={setNewCategoryName}
                  placeholderTextColor="#CCC"
                />
              </View>

              {/* Icon Selection */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Select Icon</Text>
                <View style={styles.iconGrid}>
                  {iconOptions.map((icon, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.iconOption,
                        newCategoryIcon === icon && styles.iconOptionSelected
                      ]}
                      onPress={() => setNewCategoryIcon(icon)}
                    >
                      <Text style={styles.iconOptionText}>{icon}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Color Selection */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Select Color</Text>
                <View style={styles.colorGrid}>
                  {colorOptions.map((color, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.colorOption,
                        { backgroundColor: color },
                        newCategoryColor === color && styles.colorOptionSelected
                      ]}
                      onPress={() => setNewCategoryColor(color)}
                    >
                      {newCategoryColor === color && (
                        <Ionicons name="checkmark" size={20} color="#FFF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Budget */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Monthly Budget</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="0"
                  keyboardType="numeric"
                  value={newCategoryBudget}
                  onChangeText={setNewCategoryBudget}
                  placeholderTextColor="#CCC"
                />
              </View>

              {/* Preview */}
              <View style={styles.categoryPreview}>
                <Text style={styles.previewLabel}>Preview:</Text>
                <View style={styles.previewItem}>
                  <View style={[styles.smallIconContainer, { backgroundColor: newCategoryColor }]}>
                    <Text style={styles.smallIcon}>{newCategoryIcon}</Text>
                  </View>
                  <View>
                    <Text style={styles.categoryLabel}>
                      {newCategoryName || 'Category Name'}
                    </Text>
                    <Text style={styles.allowanceSubtext}>
                      Budget: {newCategoryBudget ? formatAmount(parseFloat(newCategoryBudget)) : '0'}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.addCategoryButton}
                onPress={handleAddNewCategory}
              >
                <Text style={styles.addCategoryButtonText}>Add Category</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Edit Balance Modal */}
      <Modal
        visible={showEditModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModalContent}>
            <Text style={styles.modalTitle}>
              Edit {editField === 'todayLimit' ? "Today's Limit" : 'Unallocated Balance'}
            </Text>
            <TextInput
              style={styles.editInput}
              keyboardType="numeric"
              value={editValue}
              onChangeText={setEditValue}
              placeholder="Enter amount"
              placeholderTextColor="#CCC"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveEdit}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2B2B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  balanceSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  balanceRight: {
    alignItems: 'flex-end',
  },
  limitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLimit: {
    fontSize: 14,
    color: '#999',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#DDD',
    backgroundColor: '#FFFFFF',
  },
  activeOutcomeTab: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E57373',
  },
  activeIncomeTab: {
    backgroundColor: '#FFFFFF',
    borderColor: '#81C784',
  },
  activeAllocateTab: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D4A574',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#999',
  },
  activeOutcomeTabText: {
    color: '#E57373',
  },
  activeIncomeTabText: {
    color: '#81C784',
  },
  activeAllocateTabText: {
    color: '#D4A574',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  formHeader: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  amountInput: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
  },
  noteInput: {
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  categorySelectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 20,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  smallIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallIcon: {
    fontSize: 24,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  allowanceSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  sourceButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sourceButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
  },
  sourceButtonActive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#81C784',
  },
  sourceButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  sourceButtonTextActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  incomeButton: {
    backgroundColor: '#C8E6C9',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  outcomeButton: {
    backgroundColor: '#FFCDD2',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  allocateButton: {
    backgroundColor: '#FFE0B2',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  allocateInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
  },
  allocateLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  allocateAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFB74D',
  },
  allocateDescription: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
    lineHeight: 20,
  },
  allocateList: {
    marginBottom: 20,
  },
  allocateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  allocationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  allocationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  allocationSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  allocateActionButton: {
    padding: 4,
  },
  transactionsSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: '#81C784',
    fontWeight: '600',
  },
  transactionsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  transactionNote: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#CCC',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  streakCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  streakAvailable: {
    fontSize: 14,
    color: '#666',
  },
  streakDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  streakDay: {
    alignItems: 'center',
    gap: 8,
  },
  streakDayLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  streakIcon: {
    fontSize: 28,
  },
  categoriesSection: {
    marginBottom: 30,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: CARD_SPACING,
  },
  categoryCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginRight: CARD_SPACING,
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 30,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  categoryAmount: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryTotal: {
    color: '#999',
    fontWeight: 'normal',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  editModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
  },
  editInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  addCategoryOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 12,
  },
  addCategoryOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  newCategoryForm: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  textInput: {
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  iconOptionSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  iconOptionText: {
    fontSize: 24,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: '#333',
  },
  categoryPreview: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  previewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addCategoryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  addCategoryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
