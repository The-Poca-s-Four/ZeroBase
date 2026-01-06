import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CustomizeLimitModal from '../modals/CustomizeLimitModal';

export default function StepDailyLimit({ onNext, onBack }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
      </Pressable>
      <Text style={styles.headerTitle}>Set Your Daily Limit</Text>
      <Text style={styles.subTitle}>This helps you stay on track{'\n'}day by day.</Text>

      <View style={styles.card}>
         <View style={styles.content}>
             <Text style={styles.label}>Total variable budget: <Text style={styles.bold}>4.000.000</Text> VND</Text>
             <Text style={styles.label}>Over <Text style={styles.bold}>30</Text> days</Text>
             
             <View style={styles.piggyRow}>
                 <MaterialCommunityIcons name="piggy-bank" size={48} color="#000" />
                 <View style={styles.infoCol}>
                     <Text style={styles.infoText}>Your Safe to Spend: <Text style={styles.bold}>120.000</Text> /day</Text>
                     <Text style={styles.infoText}>You will save at least: <Text style={styles.bold}>400.000</Text>/month</Text>
                 </View>
             </View>
         </View>

         <Pressable style={styles.customizeBtn} onPress={() => setShowModal(true)}>
            <Text style={styles.customizeText}>Customize Safe to Spend</Text>
         </Pressable>

         <Pressable style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>Next →</Text>
         </Pressable>
      </View>

      <CustomizeLimitModal 
         visible={showModal} 
         onClose={() => setShowModal(false)}
         onSubmit={(val) => { console.log('New Limit:', val); }}
         currentLimit={2000000}
      />
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
    paddingTop: 40,
    paddingBottom: 40,
  },
  content: {
      flex: 1,
      justifyContent: 'center',
  },
  label: {
      fontSize: 18,
      color: '#333',
      marginBottom: 12,
  },
  bold: {
      fontWeight: 'bold',
      color: '#000',
  },
  piggyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30,
  },
  infoCol: {
      marginLeft: 16,
  },
  infoText: {
      fontSize: 14,
      color: '#333',
      marginBottom: 6,
  },
  customizeBtn: {
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 30,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 16,
  },
  customizeText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#000',
  },
  nextButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
