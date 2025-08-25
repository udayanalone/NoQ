export type RootStackParamList = {
    MainTabs: undefined;
    Home: undefined;
    StoreDetails: { storeId: string };
    SlotBooking: { storeId: string; selectedSlot: string };
    BookingConfirmation: { bookingId: string };
    CheckIn: undefined;
    Reservations: undefined;
    Profile: undefined;
    Login: undefined;
    SignUp: { userType: 'user' | 'store_owner' };
    StoreOwnerDashboard: undefined;
    EditStore: { storeId: string };
    ManageBookings: { storeId: string };
  };