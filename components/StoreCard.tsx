// components/StoreCard.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface StoreCardProps {
  name: string;
  waitTime: number;
  address?: string;
  onPress: () => void;
}

export function StoreCard({ name, waitTime, address = '123 Main Street, Cityville', onPress }: StoreCardProps) {
  const getWaitTimeColor = (time: number) => {
    if (time <= 15) return '#4CAF50'; // Green for short wait
    if (time <= 30) return '#FF9800'; // Orange for medium wait
    return '#F44336'; // Red for long wait
  };

  const getWaitTimeText = (time: number) => {
    if (time <= 15) return `${time} min wait`;
    if (time <= 30) return `${time} min wait`;
    return `${time} min wait`;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{name}</Text>
          <Text style={styles.storeAddress}>{address}</Text>
        </View>
        <View style={[styles.waitTimeBadge, { backgroundColor: getWaitTimeColor(waitTime) }]}>
          <Text style={styles.waitTimeText}>{getWaitTimeText(waitTime)}</Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.bookButton} onPress={onPress}>
          <Text style={styles.bookButtonText}>Book Slot</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  storeInfo: {
    flex: 1,
    marginRight: 12,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  storeAddress: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  waitTimeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  waitTimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  bookButton: {
    backgroundColor: '#20B2AA',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
})
