// @ts-nocheck
import React, { useState, useEffect } from 'react';

import {SignupScreen, LoginScreen,OnboardingScreen,SplashScreen,WelcomeScreen} from '@/components/auth';

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  // Splash screen timer
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  
  if (currentScreen === 'splash') {
    return <SplashScreen />;
  }

  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={() => setCurrentScreen('Welcome')} />;
  }
  if (currentScreen === 'Welcome') {
    return <WelcomeScreen onComplete={() => setCurrentScreen('Welcome')} />;
  }
}
