import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/type'
import { useAppContext } from '../context/AppContext'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export function ReservationsScreen() {
  const navigation = useNavigation<NavigationProp>()
  const { bookings } = useAppContext()
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming')

  const handleReservationPress = (reservation: any) => {
    // Navigate to store details
    navigation.navigate('StoreDetails', { storeId: reservation.storeId })
  }

  const handleBookNewSlot = () => {
    // Navigate to home tab to book a new slot
    // Since we're in a tab navigator, we need to navigate to the root and then to home
    navigation.navigate('MainTabs' as any)
  }

  const renderReservationCard = (reservation: any) => (
    <TouchableOpacity 
      key={reservation.id} 
      style={styles.reservationCard}
      onPress={() => handleReservationPress(reservation)}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardLeft}>
          <Text style={styles.storeName}>{reservation.storeName}</Text>
          <Text style={styles.dateTime}>{reservation.date}, {reservation.time}</Text>
        </View>
        <View style={styles.cardRight}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Confirmed</Text>
          </View>
          <View style={styles.cardIcons}>
            <Ionicons name="ticket-outline" size={20} color="#666" />
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NoQ Reservations</Text>
        <Text style={styles.headerSubtitle}>Manage Your Bookings</Text>
      </View>

      {/* Segmented Control */}
      <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Reservations List */}
      <ScrollView style={styles.reservationsList} showsVerticalScrollIndicator={false}>
        {activeTab === 'upcoming' ? (
          bookings.length > 0 ? (
            bookings.map(renderReservationCard)
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color="#ccc" />
              <Text style={styles.emptyText}>No upcoming reservations</Text>
              <Text style={styles.emptySubtext}>Book your first NoQ slot!</Text>
            </View>
          )
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No past reservations</Text>
          </View>
        )}
      </ScrollView>

      {/* Book New Slot Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBookNewSlot}>
        <Ionicons name="add" size={20} color="#fff" style={styles.bookIcon} />
        <Text style={styles.bookButtonText}>Book New NoQ Slot</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingTop: 40,
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
  segmentedControl: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#333',
    fontWeight: '600',
  },
  reservationsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  reservationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 14,
    color: '#666',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  cardIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    marginHorizontal: 16,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookIcon: {
    marginRight: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default ReservationsScreen;