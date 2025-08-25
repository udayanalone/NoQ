import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, TextInput } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/type'
import { Ionicons } from '@expo/vector-icons'

type Props = NativeStackScreenProps<RootStackParamList, 'CheckIn'>

export function CheckInScreen({ navigation }: Props) {
  const [bookingId, setBookingId] = useState('')
  const [isCheckedIn, setIsCheckedIn] = useState(false)

  const handleCheckIn = () => {
    if (bookingId.trim().length > 0) {
      setIsCheckedIn(true)
      Alert.alert('NoQ Check-In Successful ✅', `Booking ID: ${bookingId}`)
    } else {
      Alert.alert('Invalid Booking ID ❌', 'Please enter a valid booking ID')
    }
  }

  const handleViewBooking = () => {
    // Navigate to booking details or home
    navigation.navigate('MainTabs' as any)
  }



  if (isCheckedIn) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Check-in Confirmation */}
        <View style={styles.confirmationSection}>
          <View style={styles.confirmationIcon}>
            <Ionicons name="checkmark" size={40} color="#fff" />
          </View>
          <Text style={styles.confirmationText}>Checked In to{'\n'}NoQ Store</Text>
        </View>

        {/* Booking Details Card */}
        <View style={styles.bookingCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time:</Text>
            <Text style={styles.detailValue}>3:00 PM</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Group Size:</Text>
            <Text style={styles.detailValue}>1 person</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.viewBookingButton} onPress={handleViewBooking}>
          <Text style={styles.buttonText}>View My NoQ Booking</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NoQ Check-In</Text>
        <Text style={styles.headerSubtitle}>Enter Your Booking ID</Text>
      </View>

      <View style={styles.formSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Booking ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your booking ID"
            value={bookingId}
            onChangeText={setBookingId}
            autoCapitalize="none"
          />
        </View>
        
        <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn}>
          <Text style={styles.buttonText}>Check In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingTop: 40,
    marginHorizontal: -20,
    marginTop: -20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingTop: 50,
  },
  confirmationSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  confirmationIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#20B2AA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  confirmationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 30,
  },
  bookingCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    padding: 24,
    marginBottom: 40,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  viewBookingButton: {
    backgroundColor: '#20B2AA',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formSection: {
    flex: 1,
    paddingTop: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  checkInButton: {
    marginTop: 20,
    paddingVertical: 16,
    backgroundColor: '#20B2AA',
    borderRadius: 8,
    alignItems: 'center',
  },
})

// CheckInScreen is already exported as a named export