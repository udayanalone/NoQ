// context/AppContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react'

interface AppContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  booking: any;
  setBooking: React.Dispatch<React.SetStateAction<any>>;
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [booking, setBooking] = useState<any>(null)

  return (
    <AppContext.Provider value={{ user, setUser, booking, setBooking }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
