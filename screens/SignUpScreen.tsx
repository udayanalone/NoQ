import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/type';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SignUpScreenRouteProp = RouteProp<RootStackParamList, 'SignUp'>;

export function SignUpScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SignUpScreenRouteProp>();
  const { setUser } = useAppContext();
  
  const userType = route.params?.userType || 'user';
  const isStoreOwner = userType === 'store_owner';

  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Store owner specific fields
  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  
  // Opening hours (default values)
  const [openingHours, setOpeningHours] = useState([
    { day: 'Monday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 9:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 9:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 7:00 PM' },
    { day: 'Sunday', hours: '11:00 AM - 6:00 PM' }
  ]);
  
  // Available slots
  const [availableSlots, setAvailableSlots] = useState(['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']);
  
  const [isLoading, setIsLoading] = useState(false);

  const updateOpeningHour = (day: string, hours: string) => {
    setOpeningHours(prev => 
      prev.map(item => item.day === day ? { ...item, hours } : item)
    );
  };

  const context = useAppContext();
  
  const handleSignUp = async () => {
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (isStoreOwner && (!storeName || !category || !address)) {
      Alert.alert('Error', 'Please fill in all store information');
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        name,
        email,
        phone,
        password,
        role: isStoreOwner ? 'store' as const : 'user' as const,
        ...(isStoreOwner && {
          storeName,
          category,
          address,
          openingHours,
          availableSlots
        })
      };

      await context.register(userData);

      // Navigate based on user role
      if (isStoreOwner) {
        navigation.navigate('StoreOwnerDashboard');
      } else {
        navigation.navigate('MainTabs');
      }

      Alert.alert('Success', 'Account created successfully!');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>NoQ</Text>
            <Text style={styles.headerSubtitle}>
              {isStoreOwner ? 'Register Your Store' : 'Create Your Account'}
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.formTitle}>
              {isStoreOwner ? 'Store Owner Sign Up' : 'Customer Sign Up'}
            </Text>

            {/* Personal Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your full name"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Create a password"
                    secureTextEntry
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm your password"
                    secureTextEntry
                  />
                </View>
              </View>
            </View>

            {/* Store Information (only for store owners) */}
            {isStoreOwner && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Store Information</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Store Name</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="business-outline" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={storeName}
                      onChangeText={setStoreName}
                      placeholder="Enter store name"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Category</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="pricetag-outline" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={category}
                      onChangeText={setCategory}
                      placeholder="e.g. Restaurant, Retail, Healthcare"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Address</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="location-outline" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={address}
                      onChangeText={setAddress}
                      placeholder="Enter store address"
                    />
                  </View>
                </View>

                {/* Opening Hours */}
                <Text style={styles.subSectionTitle}>Opening Hours</Text>
                {openingHours.map((item, index) => (
                  <View key={index} style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>{item.day}</Text>
                    <View style={styles.inputContainer}>
                      <Ionicons name="time-outline" size={20} color="#999" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        value={item.hours}
                        onChangeText={(text) => updateOpeningHour(item.day, text)}
                        placeholder="e.g. 9:00 AM - 5:00 PM"
                      />
                    </View>
                  </View>
                ))}

                {/* Available Slots */}
                <Text style={styles.subSectionTitle}>Available Booking Slots</Text>
                <Text style={styles.helperText}>Enter comma-separated time slots (e.g. 10:00 AM, 11:00 AM)</Text>
                <View style={styles.inputGroup}>
                  <View style={styles.inputContainer}>
                    <Ionicons name="calendar-outline" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={availableSlots.join(', ')}
                      onChangeText={(text) => setAvailableSlots(text.split(',').map(slot => slot.trim()))}
                      placeholder="Enter available time slots"
                      multiline
                    />
                  </View>
                </View>
              </View>
            )}

            <TouchableOpacity 
              style={styles.signupButton} 
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signupButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;