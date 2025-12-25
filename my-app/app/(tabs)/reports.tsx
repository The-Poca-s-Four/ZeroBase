import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

type MainTab = 'reports' | 'category';
type CategoryTab = 'daily' | 'fixed' | 'future' | 'saving';

interface Category {
  id: string;
  name: string;
  type: string;
  amount: number;
  color: string;
  icon: string;
}

export default function ReportsScreen() {
  const [selectedMonth, setSelectedMonth] = useState('12/2025');
  const [mainTab, setMainTab] = useState<MainTab>('reports');
  const [categoryTab, setCategoryTab] = useState<CategoryTab>('fixed');

  const months = ['12/2025', '12/2025', '12/2025', '12/2025', '12/2025'];
  
  const chartData = [
    { month: 'Jan', income: 2000000, expense: 1500000 },
    { month: 'Feb', income: 2500000, expense: 2000000 },
    { month: 'Mar', income: 3000000, expense: 2500000 },
    { month: 'Apr', income: 1800000, expense: 1600000 },
    { month: 'May', income: 2800000, expense: 2200000 },
    { month: 'Jan', income: 2500000, expense: 2000000 },
  ];

  const maxValue = 3500000;

  const incomeCategories = [
    { name: 'Salary', value: 2000000, color: '#6B9080', percentage: 50 },
    { name: 'Freelance', value: 1000000, color: '#B08968', percentage: 25 },
    { name: 'Investment', value: 600000, color: '#A997DF', percentage: 15 },
    { name: 'Other', value: 400000, color: '#E8B4B8', percentage: 10 },
  ];

  const expenseCategories = [
    { name: 'Food', value: 1200000, color: '#6B9080', percentage: 30 },
    { name: 'Transport', value: 800000, color: '#B08968', percentage: 20 },
    { name: 'Shopping', value: 1200000, color: '#A997DF', percentage: 30 },
    { name: 'Bills', value: 800000, color: '#E8B4B8', percentage: 20 },
  ];

  const dailySpendingCategories: Category[] = [
    { id: '1', name: 'Food & Drinks', type: 'Daily Spending', amount: 1000000, color: '#B08968', icon: '🍽️' },
    { id: '2', name: 'Transportation', type: 'Daily Spending', amount: 200000, color: '#A64D79', icon: '🚗' },
    { id: '3', name: 'School Supplies', type: 'Daily Spending', amount: 300000, color: '#8B7FBD', icon: '📚' },
    { id: '4', name: 'Entertainment', type: 'Daily Spending', amount: 200000, color: '#5B8A9E', icon: '🎮' },
    { id: '5', name: 'Skincare', type: 'Daily Spending', amount: 300000, color: '#6B9080', icon: '💄' },
  ];

  const formatAmount = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const renderBarChart = () => {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>INCOME & EXPENSE</Text>
        <View style={styles.chart}>
          {chartData.map((data, index) => {
            const incomeHeight = (data.income / maxValue) * 150;
            const expenseHeight = (data.expense / maxValue) * 150;
            return (
              <View key={index} style={styles.barGroup}>
                <View style={styles.barContainer}>
                  <View style={[styles.barIncome, { height: incomeHeight }]} />
                  <View style={[styles.barExpense, { height: expenseHeight }]} />
                </View>
                <Text style={styles.barLabel}>{data.month}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderPieChart = (title: string, amount: number, categories: any[]) => {
    return (
      <View style={styles.pieChartCard}>
        <View style={styles.pieChartHeader}>
          <View>
            <Text style={styles.pieAmount}>{formatAmount(amount)}</Text>
            <Text style={styles.pieTitle}>{title}</Text>
          </View>
          <Text style={styles.chevronRight}>›</Text>
        </View>
        <View style={styles.pieChartContainer}>
          <View style={styles.pieChart}>
            {categories.map((cat, index) => {
              const rotation = categories.slice(0, index).reduce((sum, c) => sum + (c.percentage * 3.6), 0);
              return (
                <View 
                  key={index}
                  style={[
                    styles.pieSlice,
                    { 
                      backgroundColor: cat.color,
                      transform: [{ rotate: `${rotation}deg` }]
                    }
                  ]}
                />
              );
            })}
            <View style={styles.pieCenter} />
          </View>
        </View>
      </View>
    );
  };

  const renderCategorySettings = () => {
    return (
      <View style={styles.categorySettingsContainer}>
        {/* Category Tabs */}
        <View style={styles.categoryTabsContainer}>
          <TouchableOpacity 
            style={styles.categoryTab}
            onPress={() => setCategoryTab('daily')}
          >
            <Text style={styles.categoryTabText}>Daily Spending</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.categoryTab, styles.categoryTabActive]}
            onPress={() => setCategoryTab('fixed')}
          >
            <Text style={[styles.categoryTabText, styles.categoryTabTextActive]}>Fixed payment</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.categoryTab}
            onPress={() => setCategoryTab('future')}
          >
            <Text style={styles.categoryTabText}>Future budget</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.categoryTab}
            onPress={() => setCategoryTab('saving')}
          >
            <Text style={styles.categoryTabText}>Saving goals</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Spending Content */}
        <View style={styles.dailySpendingCard}>
          <View style={styles.dailySpendingHeader}>
            <View>
              <Text style={styles.dailySpendingTitle}>Daily Spending</Text>
              <Text style={styles.dailySpendingSubtitle}>For things you pay for all the time</Text>
            </View>
            <View style={styles.pieChartSmall}>
              {dailySpendingCategories.map((cat, index) => {
                const total = dailySpendingCategories.reduce((sum, c) => sum + c.amount, 0);
                const percentage = (cat.amount / total) * 100;
                const rotation = dailySpendingCategories.slice(0, index).reduce((sum, c) => {
                  return sum + ((c.amount / total) * 360);
                }, 0);
                return (
                  <View 
                    key={index}
                    style={[
                      styles.pieSliceSmall,
                      { 
                        backgroundColor: cat.color,
                        transform: [{ rotate: `${rotation}deg` }]
                      }
                    ]}
                  />
                );
              })}
              <View style={styles.pieCenterSmall} />
            </View>
          </View>

          {/* Percentage Control */}
          <View style={styles.percentageControl}>
            <TouchableOpacity style={styles.percentageButton}>
              <Text style={styles.percentageButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.percentageText}>25%</Text>
            <TouchableOpacity style={styles.percentageButton}>
              <Text style={styles.percentageButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Categories List */}
          {dailySpendingCategories.map((category) => (
            <View key={category.id} style={styles.categoryItem}>
              <View style={styles.categoryLeft}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                </View>
                <View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryType}>{category.type}</Text>
                </View>
              </View>
              <Text style={styles.categoryAmount}>{formatAmount(category.amount)}</Text>
            </View>
          ))}

          {/* Add Category Button */}
          <TouchableOpacity style={styles.addCategoryButton}>
            <Text style={styles.addCategoryText}>Add category</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Main Tabs */}
      <View style={styles.mainTabsContainer}>
        <TouchableOpacity 
          style={[styles.mainTab, mainTab === 'reports' && styles.mainTabActive]}
          onPress={() => setMainTab('reports')}
        >
          <Text style={[styles.mainTabText, mainTab === 'reports' && styles.mainTabTextActive]}>
            Reports
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.mainTab, mainTab === 'category' && styles.mainTabActive]}
          onPress={() => setMainTab('category')}
        >
          <Text style={[styles.mainTabText, mainTab === 'category' && styles.mainTabTextActive]}>
            Category setting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainTab}>
          <Text style={styles.mainTabText}>Income setting</Text>
        </TouchableOpacity>
      </View>

      {mainTab === 'reports' ? (
        <>
          {/* Month Selector */}
          <View style={styles.monthSelector}>
            {months.map((month, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.monthButton, month === selectedMonth && styles.monthButtonActive]}
                onPress={() => setSelectedMonth(month)}
              >
                <Text style={[styles.monthText, month === selectedMonth && styles.monthTextActive]}>
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryLeft}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Expense</Text>
                <Text style={styles.summaryExpense}>1.240.000</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Income</Text>
                <Text style={styles.summaryIncome}>1.240.000</Text>
              </View>
              <Text style={styles.dateText}>November 25</Text>
            </View>
            <TouchableOpacity style={styles.budgetButton}>
              <Text style={styles.budgetIcon}>🏛️</Text>
              <Text style={styles.budgetText}>BUDGET{'\n'}SETTING</Text>
            </TouchableOpacity>
          </View>

          {/* Bar Chart */}
          {renderBarChart()}

          {/* Pie Charts */}
          <View style={styles.pieChartsRow}>
            {renderPieChart('INCOME', 4000000, incomeCategories)}
            {renderPieChart('EXPENSE', 4000000, expenseCategories)}
          </View>

          {/* Get Premier Button */}
          <View style={styles.premierContainer}>
            <TouchableOpacity style={styles.premierButton}>
              <Text style={styles.premierText}>Get Premier</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        renderCategorySettings()
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  mainTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#2B2B2B',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  mainTab: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  mainTabActive: {
    borderBottomColor: '#FFFFFF',
  },
  mainTabText: {
    color: '#999999',
    fontSize: 14,
    fontWeight: '500',
  },
  mainTabTextActive: {
    color: '#FFFFFF',
  },
  monthSelector: {
    flexDirection: 'row',
    backgroundColor: '#2B2B2B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'space-around',
  },
  monthButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  monthButtonActive: {
    backgroundColor: '#404040',
    borderRadius: 4,
  },
  monthText: {
    color: '#999999',
    fontSize: 13,
  },
  monthTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryLeft: {
    flex: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingRight: 20,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
  },
  summaryExpense: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  summaryIncome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
    marginTop: 8,
  },
  budgetButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D4A574',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  budgetIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  budgetText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D4A574',
    textAlign: 'center',
    lineHeight: 14,
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 180,
    paddingBottom: 20,
  },
  barGroup: {
    alignItems: 'center',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginBottom: 8,
  },
  barIncome: {
    width: 16,
    backgroundColor: '#6B9080',
    borderRadius: 4,
    minHeight: 20,
  },
  barExpense: {
    width: 16,
    backgroundColor: '#E8B4B8',
    borderRadius: 4,
    minHeight: 20,
  },
  barLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  pieChartsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  pieChartCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pieChartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pieAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  pieTitle: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
  },
  chevronRight: {
    fontSize: 24,
    color: '#CCCCCC',
  },
  pieChartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieChart: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    position: 'relative',
  },
  pieSlice: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  pieCenter: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    top: 25,
    left: 25,
  },
  premierContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#D3D3D3',
    marginTop: 20,
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
  categorySettingsContainer: {
    flex: 1,
  },
  categoryTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  categoryTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  categoryTabActive: {
    backgroundColor: '#FFE4D6',
  },
  categoryTabText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  categoryTabTextActive: {
    color: '#D4744A',
  },
  dailySpendingCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dailySpendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  dailySpendingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  dailySpendingSubtitle: {
    fontSize: 13,
    color: '#999999',
  },
  pieChartSmall: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    position: 'relative',
  },
  pieSliceSmall: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  pieCenterSmall: {
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFFFFF',
    top: 17.5,
    left: 17.5,
  },
  percentageControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    marginBottom: 30,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  percentageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  percentageText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  categoryType: {
    fontSize: 13,
    color: '#999999',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D4744A',
  },
  addCategoryButton: {
    backgroundColor: '#FFE4D6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  addCategoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D4744A',
  },
});
