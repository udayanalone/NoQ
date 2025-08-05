import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { storeInfo } from '../dummy/data'
import { useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

type Props = NativeStackScreenProps<any, 'StoreDetails'>;

const StoreDetailsScreen = ({ navigation }: Props) => {
    const route = useRoute<any>();
    const storeId = route.params?.storeId;
    const store = storeInfo.find(s => s.id === storeId) || storeInfo[0];

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Ionicons
                    key={i}
                    name={i <= rating ? "star" : "star-outline"}
                    size={16}
                    color={i <= rating ? "#FFD700" : "#ccc"}
                />
            );
        }
        return stars;
    };

    const openingHours = [
        { day: 'Monday', hours: '9:00 AM - 8:00 PM' },
        { day: 'Tuesday', hours: '9:00 AM - 8:00 PM' },
        { day: 'Wednesday', hours: '9:00 AM - 8:00 PM' },
        { day: 'Thursday', hours: '9:00 AM - 9:00 PM' },
        { day: 'Friday', hours: '9:00 AM - 9:00 PM' },
        { day: 'Saturday', hours: '10:00 AM - 7:00 PM' },
        { day: 'Sunday', hours: '11:00 AM - 6:00 PM' },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Store Image Section */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop' }}
                    style={styles.storeImage}
                    resizeMode="cover"
                />
                <View style={styles.imageOverlay}>
                    <Text style={styles.storeName}>{store.name}</Text>
                    <Text style={styles.storeRating}>{store.rating}/5</Text>
                </View>
            </View>

            {/* Rating Section */}
            <View style={styles.ratingSection}>
                <View style={styles.starsContainer}>
                    {renderStars(store.rating)}
                </View>
                <Text style={styles.ratingText}>{store.rating}/5</Text>
            </View>

            {/* Key Metrics Section */}
            <View style={styles.metricsSection}>
                <View style={styles.metricCard}>
                    <View style={styles.metricHeader}>
                        <Ionicons name="time" size={20} color="#007AFF" />
                        <Text style={styles.metricTitle}>Wait Time</Text>
                    </View>
                    <View style={styles.metricValue}>
                        <Text style={styles.metricNumber}>{store.waitTime} min</Text>
                        <Text style={styles.metricSubtext}>Current wait</Text>
                    </View>
                </View>

                <View style={styles.metricCard}>
                    <View style={styles.metricHeader}>
                        <Ionicons name="people" size={20} color="#4CAF50" />
                        <Text style={styles.metricTitle}>Occupancy</Text>
                    </View>
                    <View style={styles.metricValue}>
                        <Text style={styles.metricNumber}>{store.occupancy}</Text>
                        <Text style={styles.metricSubtext}>Live status</Text>
                    </View>
                </View>

                <View style={styles.metricCard}>
                    <View style={styles.metricHeader}>
                        <Ionicons name="calendar" size={20} color="#FF9800" />
                        <Text style={styles.metricTitle}>Next Free Slot</Text>
                    </View>
                    <View style={styles.metricValue}>
                        <Text style={styles.metricNumber}>Today, {store.nextSlot}</Text>
                        <Text style={styles.metricSubtext}>Book now to reserve</Text>
                    </View>
                </View>
            </View>

            {/* Crowd Heatmap Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Crowd Heatmap</Text>
                <View style={styles.heatmapContainer}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=300&fit=crop' }}
                        style={styles.heatmapImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.heatmapDescription}>
                        Current crowd levels are moderate, expect a short wait time.
                    </Text>
                    <View style={styles.legendContainer}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
                            <Text style={styles.legendText}>Low</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#FF9800' }]} />
                            <Text style={styles.legendText}>Medium</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
                            <Text style={styles.legendText}>High</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Opening Hours Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Opening Hours</Text>
                <View style={styles.hoursContainer}>
                    {openingHours.map((item, index) => (
                        <View key={index} style={styles.hourRow}>
                            <Text style={styles.dayText}>{item.day}</Text>
                            <Text style={[
                                styles.hourText,
                                item.day === 'Friday' && styles.highlightedText
                            ]}>
                                {item.hours}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Book Slot Button */}
            <TouchableOpacity
                style={styles.bookButton}
                onPress={() => navigation.navigate('SlotBooking', { storeId: store.id, selectedSlot: store.nextSlot })}
            >
                <Ionicons name="calendar" size={20} color="#fff" style={styles.bookIcon} />
                <Text style={styles.bookButtonText}>Book This Slot</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    imageContainer: {
        position: 'relative',
        height: 200,
    },
    storeImage: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    storeName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    storeRating: {
        color: '#fff',
        fontSize: 14,
    },
    ratingSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    starsContainer: {
        flexDirection: 'row',
        marginRight: 8,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    metricsSection: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    metricCard: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    metricHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    metricTitle: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    metricValue: {
        alignItems: 'center',
    },
    metricNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },
    metricSubtext: {
        fontSize: 10,
        color: '#999',
    },
    section: {
        backgroundColor: '#fff',
        marginTop: 12,
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    heatmapContainer: {
        alignItems: 'center',
    },
    heatmapImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 12,
    },
    heatmapDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 20,
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 6,
    },
    legendText: {
        fontSize: 12,
        color: '#666',
    },
    hoursContainer: {
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 16,
    },
    hourRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dayText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    hourText: {
        fontSize: 14,
        color: '#666',
    },
    highlightedText: {
        color: '#007AFF',
        fontWeight: '600',
    },
    bookButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        marginHorizontal: 16,
        marginVertical: 20,
        paddingVertical: 16,
        borderRadius: 8,
    },
    bookIcon: {
        marginRight: 8,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default StoreDetailsScreen;