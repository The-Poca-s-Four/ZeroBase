import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TransactionType = 'income' | 'expense';
type FilterType = 'all' | 'expense' | 'income';

interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: TransactionType;
  date: string;
}

export default function HistoryScreen() {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sample data - replace with actual data from your state management
  const transactions: Transaction[] = [
    { id: '1', title: 'Buy cake', category: 'Food', amount: 500000, type: 'expense', date: '2025-11-25' },
    { id: '2', title: 'Buy cake', category: 'Food', amount: 500000, type: 'expense', date: '2025-11-25' },
    { id: '3', title: 'Buy cake', category: 'Food', amount: 500000, type: 'expense', date: '2025-11-25' },
    { id: '4', title: 'Buy cake', category: 'Food', amount: 500000, type: 'expense', date: '2025-11-25' },
    { id: '5', title: 'Buy cake', category: 'Food', amount: 500000, type: 'expense', date: '2025-11-25' },
    { id: '6', title: 'Buy cake', category: 'Food', amount: 500000, type: 'expense', date: '2025-11-25' },
    { id: '7', title: 'Buy cake', category: 'Food', amount: 500000, type: 'expense', date: '2025-11-25' },
  ];

  const totalIncome = 1240000;
  const totalExpense = 1240000;
  const unallocatedBalance = 1240000;

  const filteredTransactions = transactions.filter(transaction => {
    if (filterType === 'all') return true;
    return transaction.type === filterType;
  });

  const formatAmount = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.monthTitle}>November 2025</Text>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Expense</Text>
            <Text style={styles.summaryExpense}>{formatAmount(totalExpense)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={styles.summaryIncome}>{formatAmount(totalIncome)}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.balanceSection}>
          <Text style={styles.balanceAmount}>{formatAmount(unallocatedBalance)}</Text>
          <Text style={styles.balanceLabel}>Unallocated Balance</Text>
          <Text style={styles.dateLabel}>November 25</Text>
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'all' && styles.filterButtonActive]}
          onPress={() => setFilterType('all')}
        >
          <Text style={[styles.filterText, filterType === 'all' && styles.filterTextActive]}>All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'expense' && styles.filterButtonActiveExpense]}
          onPress={() => setFilterType('expense')}
        >
          <Text style={[styles.filterText, filterType === 'expense' && styles.filterTextActiveExpense]}>Expense</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'income' && styles.filterButtonActive]}
          onPress={() => setFilterType('income')}
        >
          <Text style={[styles.filterText, filterType === 'income' && styles.filterTextActive]}>Income</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>All category</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      <View style={styles.transactionList}>
        {filteredTransactions.map((transaction) => (
          <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>{transaction.title}</Text>
              <Text style={styles.transactionCategory}>{transaction.category}</Text>
            </View>
            <View style={styles.transactionRight}>
              <Text style={[
                styles.transactionAmount,
                transaction.type === 'expense' ? styles.expenseAmount : styles.incomeAmount
              ]}>
                {formatAmount(transaction.amount)}
              </Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Get Premier Button */}
      <View style={styles.premierContainer}>
        <TouchableOpacity style={styles.premierButton}>
          <Text style={styles.premierText}>Get Premier</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  monthTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 4,
  },
  summaryExpense: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  summaryIncome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 12,
  },
  balanceSection: {
    alignItems: 'flex-end',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  balanceLabel: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  filterButtonActive: {
    backgroundColor: '#E8E8E8',
    borderColor: '#E8E8E8',
  },
  filterButtonActiveExpense: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF6B6B',
  },
  filterText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#000000',
  },
  filterTextActiveExpense: {
    color: '#FF6B6B',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D4A574',
    backgroundColor: '#FFFFFF',
    gap: 4,
  },
  categoryText: {
    fontSize: 14,
    color: '#D4A574',
    fontWeight: '500',
  },
  dropdownIcon: {
    fontSize: 10,
    color: '#D4A574',
  },
  transactionList: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 14,
    color: '#999999',
  },
  transactionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  expenseAmount: {
    color: '#FF6B6B',
  },
  incomeAmount: {
    color: '#4CAF50',
  },
  chevron: {
    fontSize: 20,
    color: '#CCCCCC',
  },
  premierContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#D3D3D3',
  },
  premierButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  premierText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});
