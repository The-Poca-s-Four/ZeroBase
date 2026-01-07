import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AddCategoryModal from '../modals/AddCategoryModal';

export default function Step3Categories({ title, subTitle, type, initialCategories, headerRight, onNext, onBack }) {
  const [categories, setCategories] = useState(initialCategories.map(c => ({...c, amount: c.defaultAmount || '0'})));
  const [showAddModal, setShowAddModal] = useState(false);

  // Helper functions
  const formatNumber = (numString) => {
    const cleaned = numString.replaceAll(/\D/g, '');
    if (!cleaned) return '';
    return new Intl.NumberFormat('vi-VN').format(Number.parseInt(cleaned, 10));
  };
  
  const parseNumber = (numString) => {
      return Number.parseInt((numString || '0').toString().replaceAll('.', ''), 10);
  }

  const updateAmount = (index, text) => {
      const newCats = [...categories];
      newCats[index].amount = formatNumber(text);
      setCategories(newCats);
  };
  const getTotal = () => {
       return categories.reduce((sum, c) => sum + parseNumber(c.amount), 0);
  };

  const handleNext = () => {
      onNext(categories.map(c => ({
          name: c.name,
          icon: c.icon,
          amount: parseNumber(c.amount)
      })));
  };

  const handleAddCategory = (newCat) => {
      setCategories([...categories, {
          name: newCat.name,
          amount: newCat.percentage ? '0' : newCat.amount, // Logic simplified
          // percentages are weird here, assuming amount for now based on UI
          icon: newCat.icon,
          color: newCat.color
      }]);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
      </Pressable>
      <AddCategoryModal 
         visible={showAddModal} 
         onClose={() => setShowAddModal(false)}
         onAdd={handleAddCategory}
      />
      <Text style={styles.headerTitle}>Let’s plan your budget</Text>
      <Text style={styles.subTitle}>Every dong gets a job,{'\n'}so nothing goes to waste.</Text>

      <View style={styles.card}>
         <View style={styles.cardHeader}>
             <View>
                <Text style={styles.cardHeaderTitle}>{title}</Text>
                <Text style={styles.cardHeaderSub}>{subTitle}</Text>
             </View>
             {/* Header Right usually displays percentage or total */}
             {headerRight && (
                 <View style={styles.headerRightTag}>
                      {headerRight}
                 </View>
             )}
         </View>
         
         <ScrollView showsVerticalScrollIndicator={false}>
            {categories.map((cat, index) => (
                <View key={index} style={styles.categoryRow}>
                    <View style={[styles.iconBox, { backgroundColor: cat.color || '#E8F5E9' }]}>
                        {/* Simplification: Just use an icon based on name mapping or passed prop */}
                         <MaterialCommunityIcons name={cat.icon || 'star'} size={24} color="#FFF" />
                    </View>
                    
                    <View style={styles.catInfo}>
                        <Text style={styles.catName}>{cat.name}</Text>
                        <Text style={styles.catType}>{type === 'fixed' ? 'Fixed Payments' : 'Daily Spending'}</Text>
                    </View>

                    <Text style={[
                        styles.amountText, 
                        { color: type === 'fixed' ? '#D81B60' : cat.amountColor || '#FBC02D' }
                    ]}>
                        {cat.amount ? cat.amount : '0'}
                    </Text>
                </View>
            ))}

            <Pressable style={styles.addCategoryBtn} onPress={() => setShowAddModal(true)}>
                <Text style={styles.addCategoryText}>+ Add category</Text>
            </Pressable>

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
    backgroundColor: '#1C1C1E',
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
    fontSize: 28,
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
  cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 20,
  },
  cardHeaderTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
      maxWidth: 200,
  },
  cardHeaderSub: {
      fontSize: 12,
      color: '#888',
      marginTop: 4,
  },
  headerRightTag: {
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center'
  },
  categoryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
  },
  iconBox: {
      width: 48,
      height: 48,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#C8E6C9', // Default
  },
  catInfo: {
      flex: 1,
      marginLeft: 12,
  },
  catName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
  },
  catType: {
      fontSize: 12,
      color: '#999',
  },
  amountText: {
      fontSize: 16,
      fontWeight: '600',
  },
  addCategoryBtn: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 30,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 16,
      marginTop: 10,
  },
  addCategoryText: {
      fontSize: 16,
      fontWeight: '500',
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
