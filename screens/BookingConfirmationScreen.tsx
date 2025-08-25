import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/type'
import { Ionicons } from '@expo/vector-icons'

type Props = NativeStackScreenProps<RootStackParamList, 'BookingConfirmation'>

export function BookingConfirmationScreen({ route, navigation }: Props) {
  const { bookingId } = route.params

  const getCurrentDate = () => {
    const today = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    } as const;
    return today.toLocaleDateString('en-US', options);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share booking');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Confirmation Icon and Text */}
      <View style={styles.confirmationSection}>
        <View style={styles.confirmationIcon}>
          <Ionicons name="checkmark" size={40} color="#fff" />
        </View>
        <Text style={styles.confirmationText}>Booking Confirmed!</Text>
      </View>

      {/* Booking Details Card */}
      <View style={styles.bookingCard}>
        <Text style={styles.storeName}>Tech Haven Electronics</Text>
        <Text style={styles.bookingDate}>{getCurrentDate()}</Text>
        <Text style={styles.timeSlot}>3:00 PM - 3:30 PM</Text>
        <Text style={styles.groupSize}>Group Size: 1 Adult</Text>
        
        <View style={styles.bookingIdSection}>
          <View style={styles.bookingIdContainer}>
            <Text style={styles.bookingIdLabel}>Your Booking ID</Text>
            <Text style={styles.bookingIdValue}>{bookingId}</Text>
            <Text style={styles.bookingIdInstructions}>Show this ID at the store to check in</Text>
          </View>
          <Ionicons name="chevron-down" size={24} color="#20B2AA" style={styles.scrollIcon} />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Share Booking</Text>
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
  confirmationSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
  confirmationIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#20B2AA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  confirmationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bookingCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  bookingDate: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  timeSlot: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#20B2AA',
    marginBottom: 8,
  },
  groupSize: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  bookingIdSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookingIdContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#20B2AA',
    marginVertical: 10,
  },
  bookingIdLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  bookingIdValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
    letterSpacing: 1,
  },
  bookingIdInstructions: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  scrollIcon: {
    marginLeft: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#20B2AA',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default BookingConfirmationScreen;
