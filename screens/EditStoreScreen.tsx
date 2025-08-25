import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/type';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
import Constants from 'expo-constants';
import { api } from '../lib/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type EditStoreScreenRouteProp = RouteProp<RootStackParamList, 'EditStore'>;

const apiUrl = (Constants.expoConfig?.extra as any)?.apiUrl || (Constants.manifest as any)?.extra?.apiUrl;

export function EditStoreScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EditStoreScreenRouteProp>();
  const { user, setUser } = useAppContext();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Store fields
  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  // Opening hours
  const [openingHours, setOpeningHours] = useState<Array<{day: string, hours: string}>>([]);
  
  // Available slots
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [availableSlotsText, setAvailableSlotsText] = useState('');

  useEffect(() => {
    // If storeId is 'new', we're creating a new store
    // Otherwise, fetch existing store details
    if (route.params?.storeId && route.params.storeId !== 'new' && user?.storeId) {
      fetchStoreDetails();
    } else {
      // Set default opening hours for new store
      setOpeningHours([
        { day: 'Monday', hours: '9:00 AM - 8:00 PM' },
        { day: 'Tuesday', hours: '9:00 AM - 8:00 PM' },
        { day: 'Wednesday', hours: '9:00 AM - 8:00 PM' },
        { day: 'Thursday', hours: '9:00 AM - 9:00 PM' },
        { day: 'Friday', hours: '9:00 AM - 9:00 PM' },
        { day: 'Saturday', hours: '10:00 AM - 7:00 PM' },
        { day: 'Sunday', hours: '11:00 AM - 6:00 PM' }
      ]);
      setIsLoading(false);
    }
  }, [route.params?.storeId, user?.storeId]);

  const fetchStoreDetails = async () => {
    if (!user?.storeId) return;
    
    setIsLoading(true);
    try {
      const storeData = await api.getStore(user.storeId);
      
      // Set store data with proper type checking
      const store = storeData as { id: string; name?: string; category?: string; address?: string; phone?: string; email?: string; openingHours?: Array<{day: string, hours: string}>; availableSlots?: string[] };
      
      setStoreName(store.name || '');
      setCategory(store.category || '');
      setAddress(store.address || '');
      setPhone(store.phone || '');
      setEmail(store.email || '');
      
      // Set opening hours
      if (store.openingHours && store.openingHours.length > 0) {
        setOpeningHours(store.openingHours);
      } else {
        // Default opening hours if none exist
        setOpeningHours([
          { day: 'Monday', hours: '9:00 AM - 8:00 PM' },
          { day: 'Tuesday', hours: '9:00 AM - 8:00 PM' },
          { day: 'Wednesday', hours: '9:00 AM - 8:00 PM' },
          { day: 'Thursday', hours: '9:00 AM - 9:00 PM' },
          { day: 'Friday', hours: '9:00 AM - 9:00 PM' },
          { day: 'Saturday', hours: '10:00 AM - 7:00 PM' },
          { day: 'Sunday', hours: '11:00 AM - 6:00 PM' }
        ]);
      }
      
      // Set available slots
      if (store.availableSlots && store.availableSlots.length > 0) {
        setAvailableSlots(store.availableSlots);
        setAvailableSlotsText(store.availableSlots.join(', '));
      }
    } catch (error) {
      console.error('Error fetching store details:', error);
      Alert.alert('Error', 'Failed to load store details');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOpeningHour = (day: string, hours: string) => {
    setOpeningHours(prev => 
      prev.map(item => item.day === day ? { ...item, hours } : item)
    );
  };

  const handleSaveChanges = async () => {
    if (!user?.uid) {
      Alert.alert('Error', 'Authentication error. Please log in again.');
      return;
    }
    
    // Validate inputs
    if (!storeName || !category || !address) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    setIsSaving(true);

    try {
      // Parse available slots from text
      const slots = availableSlotsText.split(',').map(slot => slot.trim()).filter(slot => slot);

      const storeData = {
        name: storeName,
        category,
        address,
        phone,
        email,
        openingHours,
        availableSlots: slots
      };

      let updatedStore;
      
      // Check if we're creating a new store or updating an existing one
      if (route.params?.storeId === 'new') {
        // Create new store
        updatedStore = await api.createStore(storeData, user.uid);
        Alert.alert('Success', 'Store created successfully');
      } else if (user.storeId) {
        // Update existing store
        updatedStore = await api.updateStore(user.storeId, storeData);
        Alert.alert('Success', 'Store information updated successfully');
      } else {
        throw new Error('Store ID not found');
      }

      // Update user context with new store data
      if (typeof setUser === 'function') {
        setUser({
          ...user,
          storeId: updatedStore.id,
          store: updatedStore
        });
      }

      navigation.navigate('StoreOwnerDashboard');
    } catch (error: any) {
      Alert.alert(route.params?.storeId === 'new' ? 'Creation Failed' : 'Update Failed', error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading store information...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{route.params?.storeId === 'new' ? 'Create Store' : 'Edit Store Information'}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.form}>
          {/* Basic Store Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Store Name*</Text>
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
              <Text style={styles.inputLabel}>Category*</Text>
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
              <Text style={styles.inputLabel}>Address*</Text>
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

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
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
                  placeholder="Enter email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>

          {/* Opening Hours */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Opening Hours</Text>
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
          </View>

          {/* Available Slots */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Booking Slots</Text>
            <Text style={styles.helperText}>Enter comma-separated time slots (e.g. 10:00 AM, 11:00 AM)</Text>
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <Ionicons name="calendar-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={availableSlotsText}
                  onChangeText={setAvailableSlotsText}
                  placeholder="Enter available time slots"
                  multiline
                />
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSaveChanges}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>{route.params?.storeId === 'new' ? 'Create Store' : 'Save Changes'}</Text>
            )}
          </TouchableOpacity>
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
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditStoreScreen;