import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Step2Income({ onNext, onBack, initialData }) {
  const [walletBalance, setWalletBalance] = useState(initialData?.walletBalance || '');
  const [incomeSources, setIncomeSources] = useState(initialData?.incomeSources || [
    { id: 'part_time', label: 'Part time job', selected: false, amount: '' },
    { id: 'allowance', label: 'Allowance', selected: true, amount: '2.000.000' },
    { id: 'freelance', label: 'Freelance', selected: false, amount: '' },
    { id: 'scholarship', label: 'Scholarship', selected: false, amount: '' },
    { id: 'other', label: 'Other', selected: false, amount: '' },
  ]);

  const toggleSource = (id) => {
    setIncomeSources(prev => prev.map(source => 
      source.id === id ? { ...source, selected: !source.selected } : source
    ));
  };

  const updateSourceAmount = (id, text) => {
     setIncomeSources(prev => prev.map(source => 
      source.id === id ? { ...source, amount: formatNumber(text) } : source
    ));
  };

  const formatNumber = (numString) => {
    const cleaned = numString.replace(/\D/g, '');
    if (!cleaned) return '';
    return new Intl.NumberFormat('vi-VN').format(Number.parseInt(cleaned, 10));
  };
  
  const parseNumber = (numString) => {
      return Number.parseInt((numString || '0').toString().replaceAll('.', ''), 10);
  }

  const getTotalIncome = () => {
      return incomeSources
        .filter(s => s.selected)
        .reduce((sum, s) => sum + parseNumber(s.amount), 0);
  };

  const handleNext = () => {
    onNext({
        walletBalance: parseNumber(walletBalance),
        incomeSources: incomeSources.filter(s => s.selected).map(s => ({
            name: s.label,
            amount: parseNumber(s.amount)
        }))
    });
  };

  return (
    <View style={styles.container}>
       <Pressable style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
       </Pressable>
      <Text style={styles.headerTitle}>Let's start with{'\n'}your income</Text>
      <Text style={styles.subTitle}>We'll use this to build your{'\n'}personalized budget</Text>

      <View style={styles.card}>
         <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>What's in your wallet right now?</Text>
            <Text style={styles.sectionSub}>This includes cash, bank, or any savings you already have.</Text>
            
            <View style={styles.inputContainer}>
                <Text style={styles.prefix}>ex: </Text>
                <TextInput 
                    style={styles.mainInput}
                    placeholder="8.000.000"
                    placeholderTextColor="#999"
                    value={walletBalance}
                    onChangeText={(t) => setWalletBalance(formatNumber(t))}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.divider} />

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>What are your income sources?</Text>
            
            {incomeSources.map(source => (
                <View key={source.id} style={styles.sourceRow}>
                    <Pressable onPress={() => toggleSource(source.id)} style={styles.checkboxWrapper}>
                         <Ionicons 
                            name={source.selected ? "checkmark-circle" : "ellipse-outline"} 
                            size={24} 
                            color={source.selected ? "#000" : "#999"} 
                         />
                         <Text style={styles.sourceLabel}>{source.label}</Text>
                    </Pressable>
                    
                    {source.selected && (
                        <View style={styles.amountInputWrapper}>
                            <TextInput 
                                style={styles.sourceInput}
                                value={source.amount}
                                onChangeText={(t) => updateSourceAmount(source.id, t)}
                                keyboardType="numeric"
                                placeholder="0"
                            />
                            <Pressable onPress={() => toggleSource(source.id)}>
                                <Ionicons name="close-circle" size={20} color="#ccc" />
                            </Pressable>
                        </View>
                    )}
                </View>
            ))}

            <View style={styles.totalRow}>
                 <Text style={styles.totalLabel}>Total Monthly Income:</Text>
                 <Text style={styles.totalAmount}>{formatNumber(getTotalIncome().toString())} <Text style={{fontSize: 14, fontWeight: 'normal'}}>VND</Text></Text>
            </View>

            <Pressable style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next →</Text>
            </Pressable>
         </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E', // Dark background
    paddingTop: 60,
  },
  backButton: {
      position: 'absolute',
      top: 50,
      left: 20,
      zIndex: 10,
      padding: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    color: '#CCC',
    paddingHorizontal: 24,
    marginBottom: 30,
    lineHeight: 24,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 13,
    color: '#888',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  prefix: {
    fontSize: 20,
    color: '#666',
  },
  mainInput: {
    flex: 1,
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    height: 40,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#3498db', // Active blue color for underline
    paddingBottom: 2,
    minWidth: 100,
    justifyContent: 'flex-end', 
  },
  sourceInput: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    textAlign: 'right',
    marginRight: 8,
    minWidth: 80,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  totalLabel: {
    fontSize: 16,
    color: '#333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  nextButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 40,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
