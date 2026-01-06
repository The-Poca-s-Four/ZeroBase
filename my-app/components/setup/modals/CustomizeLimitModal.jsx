import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomizeLimitModal({ visible, onClose, onSubmit, currentLimit }) {
  const [limit, setLimit] = useState(currentLimit?.toString() || '2000000');
  
  const handleSubmit = () => {
    onSubmit(limit);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
            <View style={styles.dragUrl} />
            
            <View style={styles.row}>
                <Text style={styles.label}>Period</Text>
                <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Month</Text>
                    <Ionicons name="chevron-expand" size={16} color="#666" />
                </View>
            </View>

            <View style={[styles.row, { marginTop: 16 }]}>
                <Text style={styles.label}>Safe to Spend</Text>
                <View style={styles.counter}>
                    <Pressable style={styles.counterBtn}> 
                        <Ionicons name="remove" size={20} />
                    </Pressable>
                    <TextInput 
                        style={styles.limitInput}
                        value={limit}
                        onChangeText={setLimit}
                        keyboardType="numeric"
                    />
                    <Pressable style={styles.counterBtn}>
                         <Ionicons name="add" size={20} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.piggyInfo}>
                <MaterialCommunityIcons name="piggy-bank" size={40} color="#333" />
                <View style={{marginLeft: 12}}>
                    <Text style={styles.piggyText}>You will save at least:</Text>
                    <Text style={styles.piggyAmount}>400.000<Text style={{fontWeight:'normal'}}>/month</Text></Text>
                </View>
            </View>

            <Text style={styles.note}>If you go over, your limit updates automatically.</Text>

            <View style={styles.actions}>
                <Pressable style={styles.cancelBtn} onPress={onClose}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.submitBtn} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Submit</Text>
                </Pressable>
            </View>
        </View>
      </View>
    </Modal>
  );
}

// Need to import MaterialCommunityIcons
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
      marginBottom: 24,
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  label: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
  },
  dropdown: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  dropdownText: {
      fontSize: 16,
      color: '#333',
      marginRight: 4,
  },
  counter: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 8,
  },
  counterBtn: {
      padding: 8,
      paddingHorizontal: 12,
  },
  limitInput: {
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
      minWidth: 80,
      color: '#999'
  },
  piggyInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 30,
  },
  piggyText: {
      fontSize: 14,
      color: '#333',
  },
  piggyAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
  },
  note: {
      fontSize: 12,
      color: '#333',
      fontStyle: 'italic',
      textAlign: 'center',
      marginBottom: 24,
  },
  actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
  submitBtn: {
      flex: 1,
      paddingVertical: 16,
      backgroundColor: '#000',
      borderRadius: 30,
      alignItems: 'center',
      marginLeft: 12,
  },
  submitText: {
      fontSize: 16,
      color: '#FFF',
      fontWeight: '600',
  },
});
