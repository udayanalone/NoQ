import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity } from "react-native";
// import { mockStores } from "../dummy/data";
import { api } from "../lib/api";
import { StoreCard } from "../components/StoreCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/type";
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [searchQuery, setSearchQuery] = useState('');
    const [stores, setStores] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        api.getStores()
            .then((data) => { if (mounted) setStores(data); })
            .catch((e) => { if (mounted) setError(e.message); })
            .finally(() => { if (mounted) setLoading(false); });
        return () => { mounted = false };
    }, []);

    const filteredStores = stores.filter(store =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleStorePress = (storeId: string) => {
        navigation.navigate('StoreDetails', { storeId });
    };

    const handleSearchPress = () => {
        // Focus on search input or show search options
        console.log('Search pressed');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>NoQ</Text>
                <Text style={styles.headerSubtitle}>Find Stores Near You</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search NoQ stores..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#999"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color="#999" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Store List */}
            {error ? (
                <View style={styles.emptyState}>
                    <Ionicons name="warning" size={48} color="#f90" />
                    <Text style={styles.emptyText}>Failed to load stores</Text>
                    <Text style={styles.emptySubtext}>{error}</Text>
                </View>
            ) : (
            <FlatList
                data={filteredStores}
                style={styles.storeList}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={() => {
                    setLoading(true);
                    api.getStores().then(setStores).catch((e)=>setError(e.message)).finally(()=>setLoading(false));
                }}
                renderItem={({item}) => (
                    <StoreCard
                        name={item.name}
                        waitTime={item.waitTime}
                        address={item.address}
                        onPress={() => handleStorePress(item._id)}
                    />
                )}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="search-outline" size={48} color="#ccc" />
                        <Text style={styles.emptyText}>No stores found</Text>
                        <Text style={styles.emptySubtext}>Try adjusting your search</Text>
                    </View>
                }
            />)}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 20,
        paddingTop: 40,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    storeList: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginTop: 12,
        fontWeight: '600',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 4,
    },
});

export default HomeScreen;