import { ImageUrl } from '@/Api/apiClient';
import { eventList } from '@/Api/homeApi';
import Badge from '@/components/Badge';
import { Colors } from '@/constants/Colors';
import { useAuthSession } from '@/providers/AuthProvider';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import moment from 'moment';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const {token} = useAuthSession();
  const [page, setPage] = useState(1);

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['events'],
    queryFn: () => eventList(token?.current, page),
  });


  const [hasMore, setHasMore] = useState(true);

  // Mock API Data Loader
  // const fetchData = async () => {
  //   if (!hasMore) return;

  //   setIsLoading(true);
  //   setTimeout(() => {
  //     const newItems = Array.from({ length: 10 }).map((_, index) => ({
  //       id: `${page}-${index}`,
  //       title: `Mirror, Mirror: Practicing Positive Self-Talk for Improved Self-Esteem`,
  //       category: 'Self-Esteem',
  //       time: '10m',
  //     }));

  //     if (newItems.length > 0) {
  //       setData((prevData) => [...prevData, ...newItems]);
  //       setPage((prevPage) => prevPage + 1);
  //     } else {
  //       setHasMore(false);
  //     }

  //     setIsLoading(false);
  //   }, 1000); // Mock API Delay
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const renderCard = ({ item }:any) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/home/${item.id}`)} >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: ImageUrl + item.banner }} // Placeholder image
          style={styles.image}
        />
        <View style={styles.category}>
        {item.status == 'active' ? (
          <Badge text="Open" backgroundColor="#27ae60" textColor="#fff" size="medium" />
        ) : (
          <Badge text="Close" backgroundColor="#e74c3c" textColor="#fff" size="medium" />
        )}
        </View>
      </View>
      <View>
        <Text style={styles.title}>
          {item.name.length > 70 ? item.name.substring(0, 70) + '...' : item.name.substring(0, 70) }
        </Text>
        <Text style={styles.description}>
          {item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description.substring(0, 100) }
        </Text>
      </View>
      <View style={styles.dateContainer}>
        <Text>Start Date: {moment(item.start_date).format('DD-MM-YYYY')}</Text>
        <Text>End Date: {moment(item.end_date).format('DD-MM-YYYY')}</Text>
      </View>
      <View style={styles.capacityContainer}>
        <View style={styles.capacity}>
          <MaterialIcons name="reduce-capacity" size={16} color="black" />
          <Text>Capacity: </Text>
          <Badge text={item.capacity} backgroundColor={Colors.light.tint} textColor="#fff" size="small" />
        </View>
        <View style={styles.location}>
          <Ionicons name="location-outline" size={16} color="black" />
          <Text > {item.location} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      // fetchData();
    }
  };


  return (
    <FlatList
      data={data?.data}
      renderItem={renderCard}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          colors={['#f1c40f']}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 16,
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  image: {
    height: 150,
    borderRadius: 8,
  },
  category: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  open: {
    backgroundColor: 'green',

    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
    fontSize: 16,
    fontWeight: 'bold',
  },
  close: {
    backgroundColor: 'red',
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    width: '100%',
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 14,
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#777',
  },
  capacityContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  capacity: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    color: '#777',
    gap: 6
  },
  location: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    color: '#777',
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});

