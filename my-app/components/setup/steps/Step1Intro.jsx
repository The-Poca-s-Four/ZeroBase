import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// For simplicity, we'll code the "Let's plan your budget" intro screen.
// The "4 types" screen could be a second slide in this step or a separate component.
// Based on image flow, let's make Step1Intro actually a 2-slide intro.

export default function Step1Intro({ onNext }) {
  // Just the greeting screen now
  return (
    <View style={styles.containerDark}>
      <Text style={styles.bigTitle}>Let’s plan your budget</Text>
      <Text style={styles.subTitle}>Every dong gets a job,{'\n'}so nothing goes to waste.</Text>
      
      <View style={styles.spacer} />
      
      <Pressable style={styles.nextButtonWhite} onPress={onNext}>
        <Text style={styles.nextButtonTextDark}>Next →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerDark: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    padding: 24,
  },
  bigTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    marginTop: 60,
  },
  subTitle: {
    fontSize: 18,
    color: '#CCC',
    lineHeight: 28,
  },
  spacer: {
      flex: 1,
  },
  nextButtonWhite: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 40,
  },
  nextButtonTextDark: {
     color: '#000',
     fontSize: 16,
     fontWeight: '600',
  },
});
