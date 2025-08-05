export type RootStackParamList = {
    Home: undefined;
    StoreDetails: { storeId: string };
    SlotBooking: { storeId: string; selectedSlot: string };
    BookingConfirmation: { bookingId: string };
    CheckIn: undefined;
    Reservations: undefined;
  }