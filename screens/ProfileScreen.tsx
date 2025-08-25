// screens/ProfileScreen.tsx
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Modal, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useAppContext } from '../context/AppContext'

export function ProfileScreen() {
  const navigation = useNavigation()
  const { user, logout } = useAppContext()
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login' as never);
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  }

  const handleMyBookings = () => {
    navigation.navigate('MainTabs' as never)
    setTimeout(() => {
      
      Alert.alert('My Bookings', 'Tap the Reservations tab below to view your NoQ bookings.')
    }, 300)
  }

  const handleHelpSupport = () => {
    Alert.alert('NoQ Help & Support', 'Contact support at support@noq.com')
  }

  const renderMenuItem = (title: string, icon: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <View style={styles.menuItemContent}>
        <Ionicons name={icon as any} size={20} color="#666" style={styles.menuIcon} />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#ccc" />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>NoQ Profile</Text>
          <Text style={styles.headerSubtitle}>Manage Your Account</Text>
        </View>

        <View style={styles.profile}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color="#007AFF" />
          </View>
          <Text style={styles.name}>{user?.name || 'User'}</Text>
          <Text style={styles.sub}>{user?.phone || 'No phone number'}</Text>
          <Text style={styles.sub}>{user?.email || 'No email'}</Text>
          <View style={styles.membershipBadge}>
            <Text style={styles.membershipText}>NoQ Member</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {renderMenuItem('My NoQ Bookings', 'calendar', handleMyBookings)}
          {renderMenuItem('Settings', 'settings', () => setSettingsVisible(true))}
          {renderMenuItem('Help & Support', 'help-circle', handleHelpSupport)}
          {renderMenuItem('Logout', 'log-out', handleLogout)}
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Your NoQ Activity</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Total Bookings</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Favorite Stores</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Settings Modal */}
      <Modal
        visible={settingsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSettingsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>NoQ Settings</Text>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Enable Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                thumbColor={notificationsEnabled ? '#007AFF' : '#ccc'}
                trackColor={{ true: '#b3d7ff', false: '#eee' }}
              />
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSettingsVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingTop: 40,
    marginHorizontal: -24,
    marginTop: -24,
    marginBottom: 32,
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
  profile: {
    marginBottom: 32,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  sub: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  membershipBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8,
  },
  membershipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  menu: {
    marginTop: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  statsContainer: {
    marginTop: 32,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 8,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007AFF',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default ProfileScreen;
