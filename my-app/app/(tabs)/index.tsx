// @ts-nocheck
import {
    LoginScreen,
    OnboardingScreen,
    SignupScreen,
    SplashScreen,
    WelcomeScreen
} from '@/components/auth';
import BudgetSetupScreen from '@/components/setup/BudgetSetupScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function MainScreen() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [showBudgetSetup, setShowBudgetSetup] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const seen = await AsyncStorage.getItem('hasSeenOnboarding');
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        const setupCompleted = await AsyncStorage.getItem('hasCompletedSetup');
        
        if (loggedIn === 'true') {
          if (setupCompleted !== 'true') {
              // User logged in but hasn't finished setup
              setShowBudgetSetup(true);
              return; 
          }
          router.replace('/(tabs)/home');
          return;
        }
        
        if (seen === 'true') {
          setHasSeenOnboarding(true);
        }
      } catch (e) {
        console.error('Error reading onboarding status:', e);
      }
    };
    checkOnboarding();
  }, []);

  // Splash timer
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        if (hasSeenOnboarding) {
          setCurrentScreen('welcome');
        } else {
          setCurrentScreen('onboarding');
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentScreen, hasSeenOnboarding]);

  
  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      setHasSeenOnboarding(true);
      setCurrentScreen('login'); // User requested to go directly to Login/Signup after Onboarding
    } catch (e) {
      console.error('Error saving onboarding status:', e);
    }
  };

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      
      const setupCompleted = await AsyncStorage.getItem('hasCompletedSetup');
      if (setupCompleted !== 'true') {
          setShowBudgetSetup(true);
      } else {
          router.replace('/(tabs)/home');
      }
    } catch (e) {
      console.error('Error saving login status:', e);
    }
  };

  const handleSetupComplete = () => {
      setShowBudgetSetup(false);
      router.replace('/(tabs)/home');
  };

  const handleNavigateToSignup = () => {
    setCurrentScreen('signup');
  };

  const handleNavigateToLogin = () => {
    setCurrentScreen('login');
  };

  const handleNavigateToWelcome = () => {
    setCurrentScreen('welcome');
  };

  if (currentScreen === 'splash') {
    return <SplashScreen />;
  }

  // If budget setup is needed, show it immediately (overlay or replacement)
  if (showBudgetSetup) {
       return <BudgetSetupScreen visible={true} onComplete={handleSetupComplete} />;
  }

  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onLogin={handleNavigateToLogin} onSignup={handleNavigateToSignup} />;
  }

  if (currentScreen === 'signup') {
    return <SignupScreen onNavigateToLogin={handleNavigateToLogin} onLogin={handleLogin} />;
  }

  if (currentScreen === 'login') {
    return (
        <>
            <LoginScreen onNavigateToSignup={handleNavigateToSignup} onLogin={handleLogin} />
            <BudgetSetupScreen visible={showBudgetSetup} onComplete={handleSetupComplete} />
        </>
    );
  }

  // Also catch other screens if they turn on setup mode (e.g. valid session check)
  if (showBudgetSetup) {
       return <BudgetSetupScreen visible={true} onComplete={handleSetupComplete} />;
  }

  return null;
}
