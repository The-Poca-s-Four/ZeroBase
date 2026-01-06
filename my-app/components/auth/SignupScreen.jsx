import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    ActivityIndicator
} from 'react-native';
import { signup } from '@/services/api';
// Remove direct AsyncStorage use if possible, or keep if context needs it? Context handles it now.
import { useAppContext } from '@/contexts/AppContext';

export default function SignupScreen({ onNavigateToLogin, onLogin }) {
  const { login: contextLogin } = useAppContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    let newErrors = { name: '', email: '', password: '', confirmPassword: '' };

    if (!name) {
        newErrors.name = 'Name is required';
        isValid = false;
    }

    if (!email) {
        newErrors.email = 'Email is required';
        isValid = false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }
    }

    if (!password) {
        newErrors.password = 'Password is required';
        isValid = false;
    } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
        isValid = false;
    }

    if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      setIsLoading(true);
      const response = await signup({ 
        username: email, // Using email as username for now
        password,
        email,
        name 
      });

      if (response.success) {
        // Auto-login after signup using context to set user and clear cache
        await contextLogin(response.user);

        if (onLogin) {
            onLogin();
        } else {
             // Fallback if onLogin is not passed (though it should be)
             Alert.alert('Success', 'Account created successfully! Please login.', [
                { text: 'OK', onPress: onNavigateToLogin }
             ]);
        }
      }
    } catch (error) {
      console.error("Signup failed:", error);
      if (error.response && error.response.status === 409) {
          Alert.alert("Error", "Account already exists");
      } else {
          Alert.alert("Error", "Failed to create account. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
        <Text style={styles.title}>Create your{'\n'}account!</Text>
      </View>

      {/* Form */}
      <ScrollView 
        style={styles.formScrollView}
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <View style={[styles.inputWrapper, { borderBottomColor: errors.name ? '#FF6B6B' : '#CCCCCC' }]}>
              <TextInput
                style={styles.input}
                placeholder="The Poca's Four"
                placeholderTextColor="#999"
                value={name}
                onChangeText={(text) => { setName(text); setErrors({...errors, name: ''}); }}
              />
              <Pressable style={styles.inputIcon}>
                <Ionicons name="create-outline" size={20} color="#666" />
              </Pressable>
            </View>
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={[styles.inputWrapper, { borderBottomColor: errors.email ? '#FF6B6B' : '#CCCCCC' }]}>
              <TextInput
                style={styles.input}
                placeholder="sample@gmail.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={(text) => { setEmail(text); setErrors({...errors, email: ''}); }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Pressable style={styles.inputIcon}>
                <Ionicons name="create-outline" size={20} color="#666" />
              </Pressable>
            </View>
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={[styles.inputWrapper, { borderBottomColor: errors.password ? '#FF6B6B' : '#CCCCCC' }]}>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={password}
                onChangeText={(text) => { setPassword(text); setErrors({...errors, password: ''}); }}
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
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm password</Text>
            <View style={[styles.inputWrapper, { borderBottomColor: errors.confirmPassword ? '#FF6B6B' : '#CCCCCC' }]}>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={(text) => { setConfirmPassword(text); setErrors({...errors, confirmPassword: ''}); }}
                secureTextEntry={!showConfirmPassword}
              />
              <Pressable
                style={styles.inputIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#666" 
                />
              </Pressable>
            </View>
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
          </View>

          <Pressable style={styles.signUpButton} onPress={handleSignup} disabled={isLoading}>
            {isLoading ? (
                <ActivityIndicator color="#FFF" />
            ) : (
                <Text style={styles.signUpButtonText}>Sign up</Text>
            )}
          </Pressable>

          <View style={styles.signupFooter}>
            <Text style={styles.alreadyHaveAccount}>Already have Account? </Text>
            <Pressable onPress={onNavigateToLogin}>
              <Text style={styles.signInLink}>Sign in</Text>
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
    backgroundColor: '#2B2B2B',
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
    paddingBottom: 30,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 50,
  },
  formScrollView: {
    flex: 1,
  },
  formContainer: {
    flexGrow: 1,
  },
  formCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
    minHeight: '100%',
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
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#666666',
    paddingVertical: 8,
    paddingRight: 8,
  },
  inputIcon: {
    padding: 4,
  },
  signUpButton: {
    backgroundColor: '#2B2B2B',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signupFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  alreadyHaveAccount: {
    fontSize: 14,
    color: '#999999',
  },
  signInLink: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '700',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 4,
  },
});
