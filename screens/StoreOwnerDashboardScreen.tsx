import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/type';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
import Constants from 'expo-constants';
import { api } from '../lib/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const apiUrl = (Constants.expoConfig?.extra as any)?.apiUrl || (Constants.manifest as any)?.extra?.apiUrl;

export function StoreOwnerDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user, setUser } = useAppContext();
  
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState<Array<{ userName: string; date: string; time: string; people: number; status: 'confirmed' | 'pending' | 'cancelled'; notes?: string }>>([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    todayBookings: 0,
    currentOccupancy: Math.floor(Math.random() * 100) // Mock data
  });

  useEffect(() => {
    if (user?.storeId) {
      fetchStoreBookings();
    }
  }, [user?.storeId]);

  const fetchStoreBookings = async () => {
    if (!user?.storeId) return;
    
    setIsLoading(true);
    try {
      // Use the api module instead of direct fetch
      const bookingsData = await api.getBookings(undefined, user.storeId);
      
      setBookings(bookingsData);
      
      // Calculate stats
      const today = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      const todayBookings = bookingsData.filter((booking: any) => booking.date === today);
      const pendingBookings = bookingsData.filter((booking: any) => booking.status === 'pending');
      
      setStats({
        totalBookings: bookingsData.length,
        pendingBookings: pendingBookings.length,
        todayBookings: todayBookings.length,
        currentOccupancy: Math.floor(Math.random() * 100) // Mock data
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      Alert.alert('Error', 'Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear user data
    setUser(null);
    // Navigate to login
    navigation.navigate('Login');
  };

  const handleEditStore = () => {
    navigation.navigate('EditStore', { storeId: user?.storeId || 'new' });
  };

  const handleManageBookings = () => {
    navigation.navigate('ManageBookings', { storeId: user?.storeId });
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading user information...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  // If user doesn't have a store, show create store UI
  if (!user.store || !user.storeId) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Store Dashboard</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.createStoreContainer}>
          <Ionicons name="business-outline" size={60} color="#007AFF" />
          <Text style={styles.createStoreTitle}>Create Your Store</Text>
          <Text style={styles.createStoreText}>
            You don't have a store yet. Create one to start managing your bookings and customers.
          </Text>
          <TouchableOpacity 
            style={styles.createStoreButton} 
            onPress={() => navigation.navigate('EditStore', { storeId: 'new' })}
          >
            <Ionicons name="add-circle" size={20} color="#fff" />
            <Text style={styles.createStoreButtonText}>Create Store</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Store Dashboard</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Store Info Card */}
        <View style={styles.storeCard}>
          <View style={styles.storeHeader}>
            <Ionicons name="business" size={24} color="#007AFF" />
            <Text style={styles.storeName}>{user.store.name}</Text>
          </View>
          <Text style={styles.storeCategory}>{user.store.category}</Text>
          <Text style={styles.storeAddress}>{user.store.address}</Text>
          
          <TouchableOpacity style={styles.editButton} onPress={handleEditStore}>
            <Ionicons name="create-outline" size={18} color="#007AFF" />
            <Text style={styles.editButtonText}>Edit Store Information</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.totalBookings}</Text>
              <Text style={styles.statLabel}>Total Bookings</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.todayBookings}</Text>
              <Text style={styles.statLabel}>Today's Bookings</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.pendingBookings}</Text>
              <Text style={styles.statLabel}>Pending Bookings</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.currentOccupancy}%</Text>
              <Text style={styles.statLabel}>Current Occupancy</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleManageBookings}>
              <Ionicons name="calendar" size={24} color="#007AFF" />
              <Text style={styles.actionButtonText}>Manage Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleEditStore}>
              <Ionicons name="time" size={24} color="#007AFF" />
              <Text style={styles.actionButtonText}>Update Hours</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Bookings */}
        <View style={styles.bookingsContainer}>
          <Text style={styles.sectionTitle}>Recent Bookings</Text>
          
          {isLoading ? (
            <ActivityIndicator size="small" color="#007AFF" style={styles.loadingIndicator} />
          ) : bookings.length > 0 ? (
            bookings.slice(0, 5).map((booking, index) => (
              <View key={index} style={styles.bookingItem}>
                <View style={styles.bookingHeader}>
                  <Text style={styles.bookingName}>{booking.userName}</Text>
                  <View style={[styles.statusBadge, 
                    booking.status === 'confirmed' ? styles.confirmedBadge : 
                    booking.status === 'pending' ? styles.pendingBadge : styles.cancelledBadge
                  ]}>
                    <Text style={styles.statusText}>{booking.status}</Text>
                  </View>
                </View>
                <Text style={styles.bookingDetails}>
                  {booking.date} at {booking.time} • {booking.people} {booking.people === 1 ? 'person' : 'people'}
                </Text>
                {booking.notes && <Text style={styles.bookingNotes}>Note: {booking.notes}</Text>}
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No bookings found</Text>
          )}
          
          {bookings.length > 5 && (
            <TouchableOpacity style={styles.viewAllButton} onPress={handleManageBookings}>
              <Text style={styles.viewAllText}>View All Bookings</Text>
            </TouchableOpacity>
          )}
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
  createStoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  createStoreTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  createStoreText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  createStoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createStoreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff3b30',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    marginLeft: 4,
    fontWeight: '500',
  },
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  storeCategory: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  storeAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#f0f8ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#007AFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  statsContainer: {
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  actionsContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  bookingsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingIndicator: {
    marginVertical: 16,
  },
  bookingItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  bookingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  confirmedBadge: {
    backgroundColor: '#e8f5e9',
  },
  pendingBadge: {
    backgroundColor: '#fff8e1',
  },
  cancelledBadge: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bookingDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  bookingNotes: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    padding: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  viewAllButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default StoreOwnerDashboardScreen;