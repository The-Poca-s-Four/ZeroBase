import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Pressable, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddCategoryModal({ visible, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [percentage, setPercentage] = useState('20');
  const [amount, setAmount] = useState('500.000');
  const [isFixed, setIsFixed] = useState(false); // Type toggle
  
  const handleAdd = () => {
    onAdd({
        name,
        percentage,
        amount,
        type: isFixed ? 'fixed' : 'daily',
        icon: 'star', // Default for now
        color: '#E0E0E0'
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
            <View style={styles.dragUrl} />
            <View style={styles.header}>
                <Text style={styles.title}>Category's Name</Text>
                <TextInput 
                    style={styles.nameInput} 
                    placeholder="Enter name"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            
            <View style={styles.row}>
                <View>
                    <Text style={styles.label}>Percentage:</Text>
                    <Text style={styles.amountPreview}>{amount}</Text>
                </View>
                <View style={styles.counter}>
                    <Pressable style={styles.counterBtn} onPress={() => setPercentage(p => Math.max(0, parseInt(p)-5).toString())}>
                        <Ionicons name="remove" size={20} />
                    </Pressable>
                    <Text style={styles.counterVal}>{percentage}%</Text>
                    <Pressable style={styles.counterBtn} onPress={() => setPercentage(p => Math.min(100, parseInt(p)+5).toString())}>
                         <Ionicons name="add" size={20} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Type</Text>
                <Pressable style={styles.typeSelector} onPress={() => setIsFixed(!isFixed)}>
                    <Text style={styles.typeText}>{isFixed ? 'Fixed Payment' : 'Daily Spending'}</Text>
                    <Ionicons name="chevron-forward" size={16} color="#007AFF" />
                </Pressable>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Icon and color</Text>
                <View style={styles.iconPreview}>
                    <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color="#666" />
                </View>
            </View>

            <View style={styles.actions}>
                <Pressable style={styles.cancelBtn} onPress={onClose}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.addBtn} onPress={handleAdd}>
                    <Text style={styles.addText}>Add</Text>
                </Pressable>
            </View>
        </View>
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
  modalCard: {
      backgroundColor: '#FFF',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 40,
  },
  dragUrl: {
      width: 40,
      height: 4,
      backgroundColor: '#E0E0E0',
      borderRadius: 2,
      alignSelf: 'center',
      marginBottom: 20,
  },
  header: {
      marginBottom: 24,
  },
  title: {
      fontSize: 14,
      color: '#999',
      marginBottom: 8,
  },
  nameInput: {
      fontSize: 20,
      fontWeight: '600',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      paddingBottom: 8,
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
  },
  label: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
  },
  amountPreview: {
      fontSize: 14,
      color: '#999',
      marginTop: 4,
  },
  counter: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 8,
  },
  counterBtn: {
      padding: 8,
  },
  counterVal: {
      fontSize: 16,
      fontWeight: '600',
      paddingHorizontal: 8,
  },
  typeSelector: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  typeText: {
      fontSize: 16,
      color: '#999',
      marginRight: 4,
  },
  iconPreview: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#E0E0E0',
      justifyContent: 'center',
      alignItems: 'center',
  },
  actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
  },
  cancelBtn: {
      flex: 1,
      paddingVertical: 16,
      backgroundColor: '#F5F5F5',
      borderRadius: 30,
      alignItems: 'center',
      marginRight: 12,
  },
  cancelText: {
      fontSize: 16,
      color: '#000',
      fontWeight: '500',
  },
  addBtn: {
      flex: 1,
      paddingVertical: 16,
      backgroundColor: '#000',
      borderRadius: 30,
      alignItems: 'center',
      marginLeft: 12,
  },
  addText: {
      fontSize: 16,
      color: '#FFF',
      fontWeight: '600',
  },
});
