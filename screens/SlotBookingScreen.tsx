import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from "../navigation/type";
import { storeInfo } from '../dummy/data';
import { user } from '../dummy/data';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'SlotBooking'>

export function SlotBookingScreen({ route, navigation }: Props) {
    const { storeId, selectedSlot } = route.params;
    const store = storeInfo.find(s => s.id === storeId) || storeInfo[0];

    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [people, setPeople] = useState('1');
    const [notes, setNotes] = useState('');

    const handleBooking = () => {
        if (!name || !phone || !people) {
            Alert.alert('Please fill all required fields');
            return;
        }

        const bookingId = `${storeId}-${Date.now()}`;
        navigation.navigate('BookingConfirmation', { bookingId });
    };

    const getCurrentDate = () => {
        const today = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        } as const;
        return today.toLocaleDateString('en-US', options);
    };

    const getTimeRange = (slot: string) => {
        const time = slot;
        const [hours, minutes] = time.split(':');
        const startTime = new Date();
        startTime.setHours(parseInt(hours), parseInt(minutes), 0);
        
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + 30);
        
        const formatTime = (date: Date) => {
            return date.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
        };
        
        return `${formatTime(startTime)} - ${formatTime(endTime)}`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Selected Slot Section */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Selected Slot</Text>
                    
                    <View style={styles.storeInfo}>
                        <Text style={styles.storeLabel}>Store Name</Text>
                        <Text style={styles.storeName}>{store.name}</Text>
                    </View>
                    
                    <View style={styles.slotInfo}>
                        <View style={styles.infoRow}>
                            <Ionicons name="calendar" size={20} color="#007AFF" style={styles.infoIcon} />
                            <Text style={styles.infoText}>{getCurrentDate()}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="time" size={20} color="#007AFF" style={styles.infoIcon} />
                            <Text style={styles.infoText}>{getTimeRange(selectedSlot)}</Text>
                        </View>
                    </View>
                </View>

                {/* Booking Details Section */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Booking Details</Text>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your full name"
                        />
                    </View>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Enter your phone number"
                            keyboardType="phone-pad"
                        />
                    </View>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Number of People</Text>
                        <TextInput
                            style={styles.input}
                            value={people}
                            onChangeText={setPeople}
                            placeholder="Enter number of people"
                            keyboardType="number-pad"
                        />
                    </View>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Optional Notes</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={notes}
                            onChangeText={setNotes}
                            placeholder="Any special requests or needs?"
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>
                </View>

                {/* Confirm Booking Button */}
                <TouchableOpacity style={styles.confirmButton} onPress={handleBooking}>
                    <Text style={styles.confirmButtonText}>Confirm Booking</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    storeInfo: {
        marginBottom: 16,
    },
    storeLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    storeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    slotInfo: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoIcon: {
        marginRight: 12,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    confirmButton: {
        backgroundColor: '#007AFF',
        marginHorizontal: 16,
        marginVertical: 20,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SlotBookingScreen;
