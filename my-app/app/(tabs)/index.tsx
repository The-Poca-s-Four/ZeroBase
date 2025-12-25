// @ts-nocheck
import {
    LoginScreen,
    OnboardingScreen,
    SignupScreen,
    SplashScreen,
    WelcomeScreen
} from '@/components/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function MainScreen() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const seen = await AsyncStorage.getItem('hasSeenOnboarding');
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        
        if (loggedIn === 'true') {
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
      setCurrentScreen('welcome');
    } catch (e) {
      console.error('Error saving onboarding status:', e);
    }
  };

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      router.replace('/(tabs)/home');
    } catch (e) {
      console.error('Error saving login status:', e);
    }
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

  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onLogin={handleNavigateToLogin} onSignup={handleNavigateToSignup} />;
  }

  if (currentScreen === 'signup') {
    return <SignupScreen onNavigateToLogin={handleNavigateToLogin} />;
  }

  if (currentScreen === 'login') {
    return <LoginScreen onNavigateToSignup={handleNavigateToSignup} onLogin={handleLogin} />;
  }

  return null;
}
