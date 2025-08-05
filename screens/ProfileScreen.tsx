// screens/ProfileScreen.tsx
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import { user } from '../dummy/data'

export function ProfileScreen() {

  const handleLogout = () => {
    Alert.alert('Logged Out', 'You have been logged out.')
    // Clear context or navigate to login screen in future
  }

  const renderMenuItem = (title: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profile}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.sub}>{user.phone}</Text>
          <Text style={styles.sub}>{user.email}</Text>
        </View>

        <View style={styles.menu}>
          {renderMenuItem('My Bookings', () => Alert.alert('Coming Soon'))}
          {renderMenuItem('Notifications', () => Alert.alert('Coming Soon'))}
          {renderMenuItem('Help & Support', () => Alert.alert('Coming Soon'))}
          {renderMenuItem('Logout', handleLogout)}
        </View>
      </View>
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
  profile: {
    marginBottom: 32,
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  sub: {
    fontSize: 14,
    color: '#666',
  },
  menu: {
    marginTop: 12,
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
  },
})
