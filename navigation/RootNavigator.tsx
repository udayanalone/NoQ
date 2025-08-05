import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import StoreDetailsScreen from '../screens/StoreDetailsScreen'
import SlotBookingScreen from '../screens/SlotBookingScreen'
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen'
import CheckInScreen from '../screens/CheckInScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import ReservationsScreen from '../screens/ReservationsScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'NoQ - Find Stores',
          headerRight: () => (
            <Ionicons name="search" size={24} color="#fff" style={{ marginRight: 16 }} />
          ),
        }}
      />
      <Stack.Screen
        name="StoreDetails"
        component={StoreDetailsScreen}
        options={{
          title: 'Store Details',
          headerBackTitle: 'Back',
        }}
      />
              <Stack.Screen
          name="SlotBooking"
          component={SlotBookingScreen as any}
          options={{
            title: 'Book Slot',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmationScreen as any}
          options={{
            title: 'Booking Confirmed',
            headerBackTitle: 'Back',
            headerLeft: () => null, // Prevent going back
          }}
        />
    </Stack.Navigator>
  )
}

function ReservationsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Reservations"
        component={ReservationsScreen}
        options={{
          title: 'My Reservations',
        }}
      />
    </Stack.Navigator>
  )
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'ReservationsTab') {
              iconName = focused ? 'calendar' : 'calendar-outline'
            } else if (route.name === 'CheckInTab') {
              iconName = focused ? 'qr-code' : 'qr-code-outline'
            } else if (route.name === 'ProfileTab') {
              iconName = focused ? 'person' : 'person-outline'
            }
            return <Ionicons name={iconName as any} size={size} color={color} />
          },
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            title: 'Home',
            headerShown: false, // Hide header since HomeStack has its own
          }}
        />
        <Tab.Screen
          name="ReservationsTab"
          component={ReservationsStack}
          options={{
            title: 'Reservations',
            headerShown: false, // Hide header since ReservationsStack has its own
          }}
        />
        <Tab.Screen
          name="CheckInTab"
          component={CheckInScreen as any}
          options={{
            title: 'Check-In',
            headerRight: () => (
              <Ionicons name="help-circle" size={24} color="#fff" style={{ marginRight: 16 }} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            headerRight: () => (
              <Ionicons name="settings" size={24} color="#fff" style={{ marginRight: 16 }} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
  