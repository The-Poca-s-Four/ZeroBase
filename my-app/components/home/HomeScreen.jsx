import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;
const CARD_SPACING = 15;

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('outcome');
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showOutcomeForm, setShowOutcomeForm] = useState(false);
  const [showAllocateForm, setShowAllocateForm] = useState(false);

  // Sample data
  const categories = [
    {
      id: '1',
      name: 'Transportation',
      icon: '🚗',
      amount: 1000000,
      total: 4000000,
      color: '#4A90E2',
    },
    {
      id: '2',
      name: 'Food',
      icon: '🍔',
      amount: 1000000,
      total: 4000000,
      color: '#50C878',
    },
    {
      id: '3',
      name: 'Entertainment',
      icon: '🎮',
      amount: 500000,
      total: 2000000,
      color: '#FF6B6B',
    },
    {
      id: '4',
      name: 'Shopping',
      icon: '🛍️',
      amount: 800000,
      total: 3000000,
      color: '#FFD93D',
    },
  ];

  const allocationData = [
    {
      id: '1',
      name: 'Food',
      currentAmount: 500000,
      percentage: 20,
      icon: '🍔',
      color: '#F4A460',
    },
    {
      id: '2',
      name: 'Skincare',
      currentAmount: 1000000,
      percentage: 40,
      icon: '💄',
      color: '#DA70D6',
    },
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

  const renderCategoryCard = ({ item }) => {
    const percentage = (item.amount / item.total) * 100;
    
    return (
      <View style={[styles.categoryCard, { borderColor: item.color }]}>
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Text style={styles.categoryIcon}>{item.icon}</Text>
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryAmount}>
          {item.amount.toLocaleString()} paid <Text style={styles.categoryTotal}>of {item.total.toLocaleString()}</Text>
        </Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: item.color }]} />
        </View>
      </View>
    );
  };

  const renderIncomeForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.formRow}>
        <Text style={styles.formLabel}>Amount</Text>
        <Text style={styles.formValue}>40 000 000</Text>
      </View>
      <View style={styles.underline} />
      
      <View style={styles.formRow}>
        <View>
          <Text style={styles.formLabel}>Allowance</Text>
          <Text style={styles.allowanceSubtext}>500.000 this month</Text>
        </View>
        <Text style={styles.formValue}>June 2024</Text>
      </View>

      <View style={styles.noteSection}>
        <Text style={styles.noteLabel}>Note</Text>
      </View>

      <TouchableOpacity style={styles.incomeButton}>
        <Text style={styles.buttonText}>Income</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOutcomeForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.formRow}>
        <Text style={styles.formLabel}>Amount</Text>
        <Text style={styles.formValue}>40 000 000</Text>
      </View>
      <View style={styles.underline} />
      
      <View style={styles.formRow}>
        <View style={styles.categorySelector}>
          <View style={[styles.smallIconContainer, { backgroundColor: '#F4A460' }]}>
            <Text style={styles.smallIcon}>🍔</Text>
          </View>
          <View>
            <Text style={styles.categoryLabel}>Food</Text>
            <Text style={styles.allowanceSubtext}>600,000</Text>
          </View>
        </View>
        <Text style={styles.formValue}>June 2024</Text>
      </View>

      <View style={styles.noteSection}>
        <Text style={styles.noteLabel}>Note</Text>
      </View>

      <TouchableOpacity style={styles.outcomeButton}>
        <Text style={styles.buttonText}>Outcome</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAllocateForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.allocateHeader}>
        <Text style={styles.allocateLabel}>Unallocated balance</Text>
        <Text style={styles.allocateAmount}>1 240 000</Text>
      </View>

      {allocationData.map((item) => (
        <View key={item.id} style={styles.allocationItem}>
          <View style={styles.allocationLeft}>
            <View style={[styles.smallIconContainer, { backgroundColor: item.color }]}>
              <Text style={styles.smallIcon}>{item.icon}</Text>
            </View>
            <View>
              <Text style={styles.allocationName}>{item.name}</Text>
              <Text style={styles.allocationSubtext}>
                {item.currentAmount.toLocaleString()} + 120 000
              </Text>
            </View>
          </View>
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>{item.percentage}%</Text>
            <Ionicons name="chevron-up" size={16} color="#666" />
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.allocateButton}>
        <Text style={styles.buttonText}>Allocated</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hey, Poca</Text>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceRow}>
          <View>
            <Text style={styles.balanceAmount}>240.000</Text>
            <Text style={styles.balanceSubtitle}>Today&apos;s Limit</Text>
          </View>
          <View style={styles.balanceRight}>
            <Text style={styles.balanceAmount}>1.240.000</Text>
            <Text style={styles.balanceSubtitle}>Unallocated balance</Text>
          </View>
        </View>
        <Text style={styles.totalLimit}>/400.000</Text>
      </View>

      {/* Action Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'outcome' && styles.activeOutcomeTab]}
          onPress={() => {
            setActiveTab('outcome');
            setShowOutcomeForm(true);
            setShowIncomeForm(false);
            setShowAllocateForm(false);
          }}
        >
          <Text style={[styles.tabText, activeTab === 'outcome' && styles.activeTabText]}>
            − Outcome
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'income' && styles.activeIncomeTab]}
          onPress={() => {
            setActiveTab('income');
            setShowIncomeForm(true);
            setShowOutcomeForm(false);
            setShowAllocateForm(false);
          }}
        >
          <Text style={[styles.tabText, activeTab === 'income' && styles.activeTabText]}>
            + Income
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'allocate' && styles.activeAllocateTab]}
          onPress={() => {
            setActiveTab('allocate');
            setShowAllocateForm(true);
            setShowIncomeForm(false);
            setShowOutcomeForm(false);
          }}
        >
          <Text style={[styles.tabText, activeTab === 'allocate' && styles.activeTabText]}>
            % Allocate
          </Text>
        </TouchableOpacity>
      </View>

      {/* Form Section */}
      {showIncomeForm && renderIncomeForm()}
      {showOutcomeForm && renderOutcomeForm()}
      {showAllocateForm && renderAllocateForm()}

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

      {/* Categories Horizontal Scroll */}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2B2B',
  },
  header: {
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
    marginBottom: 5,
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
  totalLimit: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E57373',
  },
  activeOutcomeTab: {
    backgroundColor: '#FFEBEE',
    borderColor: '#E57373',
  },
  activeIncomeTab: {
    backgroundColor: '#E8F5E9',
    borderColor: '#81C784',
  },
  activeAllocateTab: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FFB74D',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#333',
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
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  formLabel: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  formValue: {
    fontSize: 20,
    color: '#333',
    fontWeight: '500',
  },
  underline: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 15,
  },
  allowanceSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
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
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  noteSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  noteLabel: {
    fontSize: 14,
    color: '#CCC',
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
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  allocateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  allocateLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  allocateAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFB74D',
  },
  allocationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
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
    marginTop: 4,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
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
  categoriesList: {
    paddingHorizontal: 20,
    paddingBottom: 30,
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
});
