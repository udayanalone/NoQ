import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import StoreDetailsScreen from '../screens/StoreDetailsScreen'
import SlotBookingScreen from '../screens/SlotBookingScreen'
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen'
import { CheckInScreen } from '../screens/CheckInScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { ReservationsScreen } from '../screens/ReservationsScreen'
import { LoginScreen } from '../screens/LoginScreen'
import { SignUpScreen } from '../screens/SignUpScreen'
import { StoreOwnerDashboardScreen } from '../screens/StoreOwnerDashboardScreen'
import { EditStoreScreen } from '../screens/EditStoreScreen'
import { ManageBookingsScreen } from '../screens/ManageBookingsScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'ReservationsTab') {
            iconName = focused ? 'calendar' : 'calendar-outline'
          } else if (route.name === 'CheckInTab') {
            iconName = focused ? 'enter' : 'enter-outline'
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
        component={HomeScreen}
        options={{
          title: 'NoQ - Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ReservationsTab"
        component={ReservationsScreen}
        options={{
          title: 'NoQ - Reservations',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CheckInTab"
        component={CheckInScreen as any}
        options={{
          title: 'NoQ - Check-In',
          headerRight: () => (
            <Ionicons name="help-circle" size={24} color="#fff" style={{ marginRight: 16 }} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'NoQ - Profile',
          headerRight: () => (
            <Ionicons name="settings" size={24} color="#fff" style={{ marginRight: 16 }} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
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
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoreOwnerDashboard"
          component={StoreOwnerDashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditStore"
          component={EditStoreScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageBookings"
          component={ManageBookingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoreDetails"
          component={StoreDetailsScreen}
          options={{
            title: 'NoQ - Store Details',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="SlotBooking"
          component={SlotBookingScreen as any}
          options={{
            title: 'NoQ - Book Slot',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmationScreen as any}
          options={{
            title: 'NoQ - Booking Confirmed',
            headerBackTitle: 'Back',
            headerLeft: () => null, // Prevent going back
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
  