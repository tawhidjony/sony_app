import { ImageUrl } from '@/Api/apiClient';
import { bookingList } from '@/Api/homeApi';
import Badge from '@/components/Badge';
import { useAuthSession } from '@/providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
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
  View
} from 'react-native';

export default function BookingScreen() {
  const {token} = useAuthSession();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['BookingList'],
    queryFn: () => bookingList(token?.current, page),
  });

  const StatusBadge = ({status}:any) => {
    switch (status) {
      case 'confirmed':
        return <Badge text={status} backgroundColor="#27ae60" textColor="#fff" size="small" />;
      case 'pending':
        return <Badge text={status} backgroundColor="#8bc34a" textColor="#fff" size="small" />;
      case 'cancelled':
        return <Badge text={status} backgroundColor="#e74c3c" textColor="#fff" size="small" />;
      case 'completed':
        return <Badge text={status} backgroundColor="#2196f3" textColor="#fff" size="small" />;
      default:
        return null;
    }
  }

  const renderCard = ({ item }:any) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => router.push(`/home/${item.id}`)} >

          <View style={styles.cardContentBody} >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: ImageUrl + item?.event?.banner }} // Placeholder image
                style={styles.image}
              />
            </View>
            <View style={styles.cardContent} >
              <View>
                <Text style={styles.title}>
                  {item?.event?.name.length > 30 ? item?.event?.name.substring(0, 30) + '...' : item?.event?.name }
                </Text>
                <Text style={styles.description}>
                  {item?.event?.description.length > 80 ? item?.event?.description.substring(0, 80) + '...' : item?.event?.description }
                </Text>
              </View> 
            </View>
          </View>

          <View style={styles.cardContentFooter}>
            <View style={styles.capacityContainer}>
              <View style={styles.capacity}>
                <Text>Date: {moment(item?.created_at).format('DD MMM YYYY')}</Text>
                <StatusBadge status={item?.status} />
              </View>
              <View style={styles.location}>
                <Ionicons name="location-outline" size={16} color="black" />
                <Text > {item?.event?.location} </Text>
              </View>
            </View> 
          </View>
        </TouchableOpacity>
    );
  }

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

  return (<>
    <FlatList
      data={data?.data?.data}
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
    {data?.data.length == 0 && (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>No Data Found</Text>
      </View>
    )}
  </>);
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 16,
  },
  cardContentBody:{
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f3',
    padding: 5
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
    flexBasis: '30%',
  },
  image: {
    height: 70,
    borderRadius: 8,
  },
  cardContent:{
    flexBasis: '70%',
    paddingHorizontal: 8
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
  },
  cardContentFooter:{
    padding: 5
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
    gap: 6,
    
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

