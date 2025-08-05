import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface Reservation {
  id: string
  storeName: string
  date: string
  time: string
  status: 'confirmed' | 'pending' | 'cancelled'
}

const mockReservations: Reservation[] = [
  {
    id: '1',
    storeName: 'Tech Haven Electronics',
    date: 'Today',
    time: '10:30 AM',
    status: 'confirmed'
  },
  {
    id: '2',
    storeName: 'Cafe Delight',
    date: 'Tomorrow',
    time: '02:00 PM',
    status: 'confirmed'
  },
  {
    id: '3',
    storeName: 'Pet Care Plus',
    date: 'Apr 25',
    time: '04:00 PM',
    status: 'confirmed'
  }
]

export function ReservationsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming')

  const renderReservationCard = (reservation: Reservation) => (
    <TouchableOpacity key={reservation.id} style={styles.reservationCard}>
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
            <Ionicons name="qr-code" size={20} color="#666" />
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
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
          mockReservations.map(renderReservationCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No past reservations</Text>
          </View>
        )}
      </ScrollView>

      {/* Book New Slot Button */}
      <TouchableOpacity style={styles.bookButton}>
        <Ionicons name="add" size={20} color="#fff" style={styles.bookIcon} />
        <Text style={styles.bookButtonText}>Book New Slot</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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