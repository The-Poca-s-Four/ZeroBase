import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface QuickAddModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (data: { amount: number; type: 'income' | 'expense'; note: string; category: string }) => void;
}

export default function QuickAddModal({ visible, onClose, onAdd }: QuickAddModalProps) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  // Format: 5000000 -> 5.000.000
  const formatNumber = (numString: string) => {
    const cleaned = numString.replaceAll(/\D/g, '');
    if (!cleaned) return '';
    return new Intl.NumberFormat('vi-VN').format(parseInt(cleaned, 10));
  };

  const handleAmountChange = (text: string) => {
    // Remove existing dots to get raw number
    const rawValue = text.replace(/\./g, '');
    if (rawValue === '' || /^\d+$/.test(rawValue)) {
        setAmount(formatNumber(text));
    }
  };

  const handleAdd = () => {
    if (!amount) {
        Alert.alert("Missing Amount", "Please enter an amount.");
        return;
    }
    
    // Check if amount is valid number
    const amountNum = parseFloat(amount.replace(/\./g, '')); 
    if (isNaN(amountNum) || amountNum <= 0) {
        Alert.alert("Invalid Amount", "Please enter a valid positive number.");
        return;
    }

    onAdd({
      amount: amountNum,
      type,
      note,
      category: type === 'income' ? 'Salary' : 'General' // Default for quick add
    });
    setAmount('');
    setNote('');
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
            <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Quick Add</Text>
                <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Type Switcher */}
            <View style={styles.typeContainer}>
                <TouchableOpacity 
                style={[styles.typeButton, type === 'expense' && styles.activeExpense]} 
                onPress={() => setType('expense')}
                >
                <Text style={[styles.typeText, type === 'expense' && styles.activeTypeText]}>Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.typeButton, type === 'income' && styles.activeIncome]} 
                onPress={() => setType('income')}
                >
                <Text style={[styles.typeText, type === 'income' && styles.activeTypeText]}>Income</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.currencySymbol}>đ</Text>
                <TextInput
                style={styles.amountInput}
                placeholder="0"
                keyboardType="numeric"
                value={amount}
                onChangeText={handleAmountChange}
                autoFocus
                />
            </View>

            <TextInput
                style={styles.noteInput}
                placeholder="What is this for?"
                value={note}
                onChangeText={setNote}
                placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleAdd}>
                <Text style={styles.submitText}>Add Transaction</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    width: '100%',
  },
  container: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  typeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginBottom: 24,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeExpense: {
    backgroundColor: '#FFEBEE',
  },
  activeIncome: {
    backgroundColor: '#E8F5E9',
  },
  typeText: {
    fontWeight: '600',
    color: '#666',
  },
  activeTypeText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    minWidth: 100,
  },
  noteInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: '#000',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
