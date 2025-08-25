import { auth, db } from './firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  orderBy
} from 'firebase/firestore';

export const api = {
  // Auth
  getUserData: async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      // If user is a store owner, get their store data
      const userData = userDoc.data();
      if (userData.role === 'store' && userData.storeId) {
        try {
          const storeDoc = await getDoc(doc(db, 'stores', userData.storeId));
          if (storeDoc.exists()) {
            return {
              uid,
              ...userData,
              store: {
                id: storeDoc.id,
                ...storeDoc.data()
              }
            };
          }
        } catch (storeError) {
          console.error('Error fetching store data:', storeError);
        }
      }
      
      return {
        uid,
        ...userData
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  register: async (userData: any) => {
    try {
      // Create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: userData.name
      });

      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        createdAt: new Date().toISOString()
      });

      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  login: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      return {
        user: userCredential.user,
        userData: userDoc.data()
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  // Stores
  getStores: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'stores'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  getStore: async (id: string) => {
    try {
      const docRef = doc(db, 'stores', id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error('Store not found');
      }
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  createStore: async (storeData: any, userId: string) => {
    try {
      // Create a new store document
      const storeRef = await addDoc(collection(db, 'stores'), {
        ...storeData,
        ownerId: userId,
        createdAt: new Date().toISOString(),
        rating: 0,
        waitTime: 0,
        occupancy: 0,
        nextSlot: storeData.availableSlots?.[0] || '3:00 PM'
      });
      
      // Update the user document with the store ID
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { storeId: storeRef.id });
      
      // Get the created store data
      const storeDoc = await getDoc(storeRef);
      
      return {
        id: storeRef.id,
        ...storeDoc.data()
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  updateStore: async (id: string, updates: any) => {
    try {
      const storeRef = doc(db, 'stores', id);
      await updateDoc(storeRef, updates);
      const updatedDoc = await getDoc(storeRef);
      return {
        id: updatedDoc.id,
        ...updatedDoc.data()
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Bookings
  createBooking: async (bookingData: any) => {
    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...bookingData,
        createdAt: new Date().toISOString()
      });
      const docSnap = await getDoc(docRef);
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  getBookings: async (userEmail?: string, storeId?: string) => {
    try {
      let q;
      if (userEmail && storeId) {
        q = query(
          collection(db, 'bookings'), 
          where('userEmail', '==', userEmail),
          where('storeId', '==', storeId)
        );
      } else if (userEmail) {
        q = query(collection(db, 'bookings'), where('userEmail', '==', userEmail));
      } else if (storeId) {
        q = query(collection(db, 'bookings'), where('storeId', '==', storeId));
      } else {
        q = collection(db, 'bookings');
      }
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  updateBooking: async (id: string, updates: any) => {
    try {
      const bookingRef = doc(db, 'bookings', id);
      await updateDoc(bookingRef, updates);
      const updatedDoc = await getDoc(bookingRef);
      return {
        id: updatedDoc.id,
        ...updatedDoc.data()
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
}

