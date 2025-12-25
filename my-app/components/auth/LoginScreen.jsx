import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function LoginScreen({ onNavigateToSignup, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    // Since there's no database yet, just login directly
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <Pressable style={styles.menuIcon}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Welcome{'\n'}back!</Text>
      </View>

      {/* Form */}
      <ScrollView 
        style={styles.formScrollView}
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Sign in</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="sample@gmail.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Pressable style={styles.inputIcon}>
                <Ionicons name="create-outline" size={20} color="#666" />
              </Pressable>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable
                style={styles.inputIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#666" 
                />
              </Pressable>
            </View>
            <Pressable style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </Pressable>
          </View>

          <Pressable style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Sign in</Text>
          </Pressable>

          <View style={styles.signupFooter}>
            <Text style={styles.dontHaveAccount}>Don't have account? </Text>
            <Pressable onPress={onNavigateToSignup}>
              <Text style={styles.signUpLink}>Sign up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLeft: {
    width: 24,
  },
  menuIcon: {
    padding: 8,
  },
  titleSection: {
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 56,
  },
  formScrollView: {
    flex: 1,
  },
  formContainer: {
    flexGrow: 1,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 60,
    minHeight: '100%',
  },
  formTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: '#000000',
  },
  inputIcon: {
    padding: 8,
    marginLeft: 8,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#666666',
  },
  signInButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  signupFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  dontHaveAccount: {
    fontSize: 16,
    color: '#666666',
  },
  signUpLink: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
});

