import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface SafeToSpendCardProps {
  safeToSpend: number;
  unallocated: number;
  currency?: string;
  onAddTransaction?: () => void;
}

export default function SafeToSpendCard({ 
  safeToSpend, 
  unallocated, 
  currency = 'VND',
  onAddTransaction 
}: SafeToSpendCardProps) {
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <LinearGradient
      colors={['#1e3c72', '#2a5298']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.label}>Safe to Spend</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/guide')} testID="info-button">
           <Ionicons name="information-circle-outline" size={22} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
      </View>

      <Text style={styles.amount}>
        {formatAmount(safeToSpend)} <Text style={styles.currency}>{currency}</Text>
      </Text>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <View>
          <Text style={styles.subLabel}>Unallocated Funds</Text>
          <Text style={styles.subAmount}>{formatAmount(unallocated)}</Text>
        </View>
        
        {onAddTransaction && (
          <TouchableOpacity style={styles.addButton} onPress={onAddTransaction} testID="add-button">
            <Ionicons name="add" size={24} color="#2a5298" />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#2a5298',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  iconButton: {
    padding: 4,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 20,
  },
  currency: {
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.6)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginBottom: 4,
  },
  subAmount: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});
