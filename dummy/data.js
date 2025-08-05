export const mockStores = [
    { 
        id: '1', 
        name: 'Tech Haven Electronics', 
        category: 'Electronics & Technology', 
        waitTime: 15,
        address: '123 Tech Plaza, Innovation District',
        rating: 4.8,
        distance: '0.5 km'
    },
    { 
        id: '2', 
        name: 'Fresh Market Grocery', 
        category: 'Food & Groceries', 
        waitTime: 25,
        address: '456 Fresh Lane, Downtown',
        rating: 4.5,
        distance: '1.2 km'
    },
    { 
        id: '3', 
        name: 'Wellness Medical Center', 
        category: 'Healthcare', 
        waitTime: 35,
        address: '789 Health Avenue, Medical District',
        rating: 4.7,
        distance: '0.8 km'
    },
    { 
        id: '4', 
        name: 'Style Studio Salon', 
        category: 'Beauty & Wellness', 
        waitTime: 40,
        address: '101 Beauty Boulevard, Fashion Quarter',
        rating: 4.4,
        distance: '1.5 km'
    },
    { 
        id: '5', 
        name: 'QuickFix Auto Service', 
        category: 'Automotive', 
        waitTime: 20,
        address: '222 Auto Drive, Industrial Zone',
        rating: 4.6,
        distance: '2.1 km'
    },
    { 
        id: '6', 
        name: 'Cafe Delight', 
        category: 'Food & Beverage', 
        waitTime: 12,
        address: '333 Coffee Street, Downtown',
        rating: 4.3,
        distance: '0.3 km'
    },
    { 
        id: '7', 
        name: 'Pet Care Plus', 
        category: 'Pet Services', 
        waitTime: 18,
        address: '444 Pet Lane, Animal District',
        rating: 4.9,
        distance: '1.8 km'
    },
    { 
        id: '8', 
        name: 'Fitness First Gym', 
        category: 'Fitness & Wellness', 
        waitTime: 8,
        address: '555 Fitness Road, Sports Complex',
        rating: 4.2,
        distance: '0.9 km'
    }
]

export const storeInfo = [
    {
        id: '1',
        name: 'Tech Haven Electronics',
        category: 'Electronics & Technology',
        rating: 4.8,
        distance: '0.5 km',
        waitTime: 15,
        occupancy: '70%',
        nextSlot: '3:00 PM',
        availableSlots: ['3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'],
        address: '123 Tech Plaza, Innovation District',
        description: 'Premium electronics store with latest gadgets and tech support',
        phone: '+1 (555) 123-4567',
        email: 'info@techhaven.com',
        website: 'www.techhaven.com'
    },
    {
        id: '2',
        name: 'Fresh Market Grocery',
        category: 'Food & Groceries',
        rating: 4.5,
        distance: '1.2 km',
        waitTime: 25,
        occupancy: '85%',
        nextSlot: '2:30 PM',
        availableSlots: ['2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'],
        address: '456 Fresh Lane, Downtown',
        description: 'Organic and fresh produce with local farm partnerships',
        phone: '+1 (555) 234-5678',
        email: 'hello@freshmarket.com',
        website: 'www.freshmarket.com'
    },
    {
        id: '3',
        name: 'Wellness Medical Center',
        category: 'Healthcare',
        rating: 4.7,
        distance: '0.8 km',
        waitTime: 35,
        occupancy: '60%',
        nextSlot: '4:15 PM',
        availableSlots: ['4:15 PM', '4:45 PM', '5:15 PM', '5:45 PM'],
        address: '789 Health Avenue, Medical District',
        description: 'Comprehensive healthcare services with modern facilities',
        phone: '+1 (555) 345-6789',
        email: 'appointments@wellness.com',
        website: 'www.wellness.com'
    },
    {
        id: '4',
        name: 'Style Studio Salon',
        category: 'Beauty & Wellness',
        rating: 4.4,
        distance: '1.5 km',
        waitTime: 40,
        occupancy: '45%',
        nextSlot: '5:00 PM',
        availableSlots: ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'],
        address: '101 Beauty Boulevard, Fashion Quarter',
        description: 'Luxury salon with expert stylists and premium services',
        phone: '+1 (555) 456-7890',
        email: 'book@stylestudio.com',
        website: 'www.stylestudio.com'
    },
    {
        id: '5',
        name: 'QuickFix Auto Service',
        category: 'Automotive',
        rating: 4.6,
        distance: '2.1 km',
        waitTime: 20,
        occupancy: '30%',
        nextSlot: '1:30 PM',
        availableSlots: ['1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
        address: '222 Auto Drive, Industrial Zone',
        description: 'Fast and reliable auto repair with certified mechanics',
        phone: '+1 (555) 567-8901',
        email: 'service@quickfix.com',
        website: 'www.quickfix.com'
    },
    {
        id: '6',
        name: 'Cafe Delight',
        category: 'Food & Beverage',
        rating: 4.3,
        distance: '0.3 km',
        waitTime: 12,
        occupancy: '90%',
        nextSlot: '2:45 PM',
        availableSlots: ['2:45 PM', '3:15 PM', '3:45 PM', '4:15 PM'],
        address: '333 Coffee Street, Downtown',
        description: 'Artisanal coffee and gourmet sandwiches in cozy atmosphere',
        phone: '+1 (555) 678-9012',
        email: 'hello@cafedelight.com',
        website: 'www.cafedelight.com'
    },
    {
        id: '7',
        name: 'Pet Care Plus',
        category: 'Pet Services',
        rating: 4.9,
        distance: '1.8 km',
        waitTime: 18,
        occupancy: '55%',
        nextSlot: '3:45 PM',
        availableSlots: ['3:45 PM', '4:15 PM', '4:45 PM', '5:15 PM'],
        address: '444 Pet Lane, Animal District',
        description: 'Comprehensive pet care with grooming and veterinary services',
        phone: '+1 (555) 789-0123',
        email: 'care@petcareplus.com',
        website: 'www.petcareplus.com'
    },
    {
        id: '8',
        name: 'Fitness First Gym',
        category: 'Fitness & Wellness',
        rating: 4.2,
        distance: '0.9 km',
        waitTime: 8,
        occupancy: '75%',
        nextSlot: '4:30 PM',
        availableSlots: ['4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'],
        address: '555 Fitness Road, Sports Complex',
        description: 'State-of-the-art fitness facility with personal training',
        phone: '+1 (555) 890-1234',
        email: 'membership@fitnessfirst.com',
        website: 'www.fitnessfirst.com'
    }
]
  
export const user = {
    name: 'Udayan Alone',
    phone: '+91 98765 43210',
    email: 'udayan@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    membershipLevel: 'Premium',
    totalBookings: 12,
    favoriteStores: ['Tech Haven Electronics', 'Cafe Delight', 'Pet Care Plus']
}