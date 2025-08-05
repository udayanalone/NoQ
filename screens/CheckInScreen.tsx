import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
// import { BarCodeScanner } from 'expo-barcode-scanner'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/type'
import { Ionicons } from '@expo/vector-icons'

type Props = NativeStackScreenProps<RootStackParamList, 'CheckIn'>

export function CheckInScreen({ navigation }: Props) {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null)
  const [scanned, setScanned] = useState(false)
  const [isCheckedIn, setIsCheckedIn] = useState(false)

  useEffect(() => {
    const requestPermission = async () => {
      // const { status } = await BarCodeScanner.requestPermissionsAsync()
      // setHasPermission(status === 'granted')
      setHasPermission(true) // Temporarily set to true for testing
    }
    requestPermission()
  }, [])

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true)

    // For demo: Accept any QR with "NoQ"
    if (data.includes('NoQ') || data.length > 0) {
      setIsCheckedIn(true)
      Alert.alert('Check-In Successful ✅', `Booking ID: ${data}`)
    } else {
      Alert.alert('Invalid QR Code ❌')
    }
  }

  const handleViewBooking = () => {
    // Navigate to booking details or home
    navigation.navigate('Home')
  }

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </SafeAreaView>
    )
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>No access to camera. Enable permissions in settings.</Text>
      </SafeAreaView>
    )
  }

  if (isCheckedIn) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Check-in Confirmation */}
        <View style={styles.confirmationSection}>
          <View style={styles.confirmationIcon}>
            <Ionicons name="checkmark" size={40} color="#fff" />
          </View>
          <Text style={styles.confirmationText}>Checked In to{'\n'}Tech Haven Electronics</Text>
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
          <Text style={styles.buttonText}>View My Booking</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scannerSection}>
        <Text style={styles.title}>Scan Your Booking QR</Text>
        <View style={styles.scanner}>
          <Text style={styles.scannerText}>📱 Camera Scanner Placeholder</Text>
          <Text style={styles.scannerSubtext}>Barcode scanner temporarily disabled</Text>
        </View>
        {scanned && (
          <TouchableOpacity style={styles.scanAgainButton} onPress={() => setScanned(false)}>
            <Text style={styles.scanAgainText}>Scan Again</Text>
          </TouchableOpacity>
        )}
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
  scannerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: '600',
    color: '#333',
  },
  scanner: {
    height: 300,
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#eee',
    borderStyle: 'dashed',
  },
  scannerText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: '#666',
  },
  scannerSubtext: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
  scanAgainButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#20B2AA',
    borderRadius: 8,
  },
  scanAgainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default CheckInScreen;