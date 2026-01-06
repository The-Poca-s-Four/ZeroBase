import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { router } from 'expo-router';
import Step1Intro from './steps/Step1Intro';
import Step2Income from './steps/Step2Income';
import StepTypesIntro from './steps/StepTypesIntro';
import Step3Categories from './steps/Step3Categories';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StepOverview from './steps/StepOverview';
import StepDailyLimit from './steps/StepDailyLimit';

export default function BudgetSetupScreen({ visible, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [setupData, setSetupData] = useState({});

  if (!visible) return null;

  const handleBack = () => {
    if (currentStep > 1) {
        setCurrentStep(prev => prev - 1);
    }
  };

  const handleNextStep1 = () => {
    setCurrentStep(2); // Intro -> Income
  };

  const handleNextStep2 = (data) => {
    setSetupData(prev => ({ ...prev, ...data }));
    setCurrentStep(3); // Income -> Types Intro
  };

  const handleNextStepTypes = () => {
      setCurrentStep(4); // Types Intro -> Daily Spending
  };

  const handleNextStep3 = (data) => {
    setSetupData(prev => ({ ...prev, dailySpending: data }));
    setCurrentStep(5); // Go to Fixed Payments
  };

  const handleNextStep4 = (data) => {
      setSetupData(prev => ({ ...prev, fixedPayments: data }));
      setCurrentStep(6); // Go to Savings Goals
  };

  const handleNextStep5 = (data) => {
      setSetupData(prev => ({ ...prev, savingsGoals: data }));
      setCurrentStep(7); // Go to Future Budget
  };

  const handleNextStep6 = (data) => {
      setSetupData(prev => ({ ...prev, futureBudget: data }));
      setCurrentStep(8); // Go to Overview
  };

  const handleNextStep7 = () => {
      setCurrentStep(9); // Go to Daily Limit
  };

  const handleNextStep8 = async () => { // Final step
      const finalData = { ...setupData };
      console.log("Budget Setup Data:", finalData);
      
      // Save completion status
      try {
          await AsyncStorage.setItem('hasCompletedSetup', 'true');
      } catch (e) {
          console.error("Failed to save setup status", e);
      }

      if (onComplete) onComplete();
      else router.replace('/(tabs)/home');
  };

  // Step 4 Data (Daily Spending)
  const step3Cats = [
      { name: 'Food & Drinks', icon: 'food', color: '#BCAAA4', defaultAmount: '1.000.000', amountColor: '#FBC02D' },
      { name: 'Transportation', icon: 'car', color: '#EF9A9A', defaultAmount: '200.000', amountColor: '#EC407A' },
      { name: 'School Supplies', icon: 'school', color: '#9575CD', defaultAmount: '300.000', amountColor: '#AB47BC' },
      { name: 'Entertainment', icon: 'gamepad-variant', color: '#90CAF9', defaultAmount: '200.000', amountColor: '#42A5F5' },
      { name: 'Skincare', icon: 'face-woman-shimmer', color: '#A5D6A7', defaultAmount: '300.000', amountColor: '#66BB6A' },
  ];

  // Step 5 Data (Fixed Payments)
  const step4Cats = [
      { name: 'Rent / Dorm Fee', icon: 'home', color: '#BCAAA4', defaultAmount: '2.500.000' },
      { name: 'Phone Plan', icon: 'cellphone', color: '#EF9A9A', defaultAmount: '100.000' },
      { name: 'Wi-Fi / Internet', icon: 'wifi', color: '#9575CD', defaultAmount: '100.000' },
      { name: 'Subscriptions', icon: 'youtube-subscription', color: '#90CAF9', defaultAmount: '200.000' },
  ];

  // Step 6 Data (Savings)
  const step5Cats = [
      { name: 'Travel Fund', icon: 'airplane', color: '#BCAAA4', defaultAmount: '500.000' },
      { name: 'New Laptop', icon: 'laptop', color: '#EF9A9A', defaultAmount: '5.000.000' },
      { name: 'Debt', icon: 'cash-multiple', color: '#9575CD', defaultAmount: '20.000.000' },
  ];

  // Step 7 Data (Future)
  const step6Cats = [
      { name: 'Semester Books', icon: 'book-open-variant', color: '#BCAAA4', defaultAmount: '500.000' },
      { name: 'Health Checkup', icon: 'doctor', color: '#EF9A9A', defaultAmount: '5.000.000' },
      { name: 'Exam Fees', icon: 'clipboard-list-outline', color: '#9575CD', defaultAmount: '20.000.000' },
      { name: 'Gifts', icon: 'gift-outline', color: '#90CAF9', defaultAmount: '500.000' },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
       <View style={styles.container}>
          {currentStep === 1 && <Step1Intro onNext={handleNextStep1} />}
          {currentStep === 2 && <Step2Income onNext={handleNextStep2} onBack={handleBack} initialData={setupData} />}
          {currentStep === 3 && <StepTypesIntro onNext={handleNextStepTypes} onBack={handleBack} />}
          
          {currentStep === 4 && (
              <Step3Categories 
                 title="Let’s choose a category together!"
                 subTitle="These are just helpful suggestions for students. Feel free to change!"
                 initialCategories={step3Cats}
                 type="daily"
                 headerRight={<Text style={{fontWeight:'bold'}}>25%</Text>}
                 onNext={handleNextStep3}
                 onBack={handleBack}
              />
          )}
          {currentStep === 5 && (
              <Step3Categories 
                 title="Fixed Payments"
                 subTitle="They’re the “must-pay” items."
                 initialCategories={step4Cats}
                 type="fixed"
                 headerRight={<Text style={{fontWeight:'bold'}}>30%</Text>}
                 onNext={handleNextStep4}
                 onBack={handleBack}
              />
          )}
          {currentStep === 6 && (
              <Step3Categories 
                 title="Savings Goals"
                 subTitle="Money you want to grow over time"
                 initialCategories={step5Cats}
                 type="savings"
                 headerRight={<Text style={{fontWeight:'bold'}}>25%</Text>}
                 onNext={handleNextStep5}
                 onBack={handleBack}
              />
          )}
          {currentStep === 7 && (
              <Step3Categories 
                 title="Future Budget"
                 subTitle="Helps you stay prepared"
                 initialCategories={step6Cats}
                 type="future"
                 headerRight={<Text style={{fontWeight:'bold'}}>25%</Text>}
                 onNext={handleNextStep6}
                 onBack={handleBack}
              />
          )}
          {currentStep === 8 && (
              <StepOverview onNext={handleNextStep7} onBack={handleBack} data={setupData} />
          )}
          {currentStep === 9 && (
              <StepDailyLimit onNext={handleNextStep8} onBack={handleBack} />
          )}
       </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
