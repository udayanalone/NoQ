// context/AppContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { api } from '../lib/api';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface Booking {
  id: string;
  storeId: string;
  storeName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface UserData {
  uid: string;
  email: string;
  name: string;
  phone: string;
  role: 'user' | 'store';
  storeId?: string;
  store?: any;
  token?: string;
}

interface AppContextType {
  user: UserData | null;
  loading: boolean;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => Promise<void>;
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>;
  getBookingsByStore: (storeId: string) => Booking[];
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<UserData, 'uid'> & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: UserData | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await api.getUserData(firebaseUser.uid) as UserData;
          if (userDoc) {
            setUser(userDoc);
            const bookingsList = await api.getBookings(userDoc.email);
            setBookings(bookingsList as Booking[]);
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
        setBookings([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user: firebaseUser } = await api.login(email, password);
      const userData = await api.getUserData(firebaseUser.uid);
      setUser(userData as UserData);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      await api.register(userData);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setBookings([]);
    } catch (error) {
      throw error;
    }
  };

  const addBooking = async (booking: Omit<Booking, 'id'>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const newBooking = await api.createBooking({
        ...booking,
        userEmail: user.email
      });
      setBookings(prev => [...prev, newBooking as Booking]);
    } catch (error) {
      throw error;
    }
  };

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    try {
      const updatedBooking = await api.updateBooking(id, updates);
      setBookings(prev => prev.map(booking => 
        booking.id === id ? { ...booking, ...updatedBooking } as Booking : booking
      ));
    } catch (error) {
      throw error;
    }
  };

  const getBookingsByStore = (storeId: string) => {
    return bookings.filter(booking => booking.storeId === storeId);
  };

  if (loading) {
    return null; // Or a loading component
  }

  const value: AppContextType = {
    user,
    loading,
    bookings,
    addBooking,
    updateBooking,
    getBookingsByStore,
    login,
    register,
    logout,
    setUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
