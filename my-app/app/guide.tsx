import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function GuideScreen() {
  return (
    <>
      <Stack.Screen options={{ 
        title: 'User Guide',
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </Pressable>
          ),
      }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        <View style={styles.section}>
          <Text style={styles.header}>Welcome to ZeroBase</Text>
          <Text style={styles.text}>
            ZeroBase is not just another expense tracker. It is built on the <Text style={styles.bold}>Zero-Based Budgeting</Text> philosophy.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="bulb-outline" size={24} color="#FFD93D" />
            <Text style={styles.cardTitle}>Core Philosophy</Text>
          </View>
          <Text style={styles.text}>
            Rule: <Text style={styles.highlight}>Income - Expense = 0</Text>
          </Text>
          <Text style={styles.text}>
            Every dollar you earn must be assigned a job. It should be either spent on expenses or allocated to a category (Savings, Rent, Food, etc.).
          </Text>
          <Text style={[styles.text, { marginTop: 10 }]}>
            <Text style={styles.bold}>Unallocated:</Text> Money that has no job yet. Your goal is to get this number to 0 by allocating funds.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Safe-to-Spend:</Text> Money you have explicitly allocated to spending categories. This is the only money you should touch!
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Key Features</Text>
          
          <View style={styles.featureItem}>
            <View style={styles.iconBox}>
              <Ionicons name="add" size={24} color="#FFF" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Quick Add</Text>
              <Text style={styles.text}>
                Tap the big "+" button to quickly record a transaction. 
                Use this for Income (Salary) or Expense (Lunch, Coffee).
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
             <View style={[styles.iconBox, { backgroundColor: '#4A90E2' }]}>
              <Ionicons name="wallet-outline" size={24} color="#FFF" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Allocation</Text>
              <Text style={styles.text}>
                Go to the "Budget" tab to distribute your income. Assign your Unallocated funds to specific envelopes like Food, Rent, or Savings.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
             <View style={[styles.iconBox, { backgroundColor: '#6C5CE7' }]}>
              <Ionicons name="stats-chart-outline" size={24} color="#FFF" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Safe-to-Spend</Text>
              <Text style={styles.text}>
                Check the Dashboard card. It tells you exactly how much allocated money is left. If it says $50, don't spend $51!
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
           <Text style={styles.subHeader}>Tips for Success</Text>
           <Text style={styles.bulletPoint}>• Log expenses immediately.</Text>
           <Text style={styles.bulletPoint}>• Allocate income as soon as you get paid.</Text>
           <Text style={styles.bulletPoint}>• If "Unallocated" is positive, you have money to save!</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#CCC',
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  highlight: {
    color: '#FFD93D',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD93D',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD93D',
    marginLeft: 10,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#CCC',
    lineHeight: 28,
    marginLeft: 10,
  },
});
