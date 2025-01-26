import { logOut } from '@/Api';
import { ImageUrl } from '@/Api/apiClient';
import { profile } from '@/Api/homeApi';
import { useAuthSession } from '@/providers/AuthProvider';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { Fragment } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileScreen = () => {

    const { token, signOut } = useAuthSession();

    const {data:profileInfo, isLoading, isError, error, refetch} = useQuery({
        queryKey: ['profile'],
        queryFn: () => profile(token?.current),
        enabled: !!token?.current,
    })

    const mutation = useMutation({
        mutationFn: logOut,
        mutationKey: ["logOut"],
      });

    const LogOutAction = () => {
        mutation
        .mutateAsync(token?.current)
        .then((response) => {
            console.log("response", response);
            signOut();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const GoToPaymentInfo = () => {
      
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const listJson:any = [
        {
            title: 'Edit Profile',
            subtitle: 'Change profile picture, number, E-mail',
            icon: 'edit',
            onPress: () =>  router.push('/(tabs)/profile/editProfile')
        },
        {
            title: 'Add Payment Information',
            subtitle: 'Securely add payment method',
            icon: 'credit-card',
            onPress: () =>  router.push('/(tabs)/profile/paymentInfo')
        },
        {
            title: 'Change Password',
            subtitle: 'Update and strengthen account security',
            icon: 'lock'
        },
        {
            title: 'Terms of Use',
            subtitle: 'Protect your account now',
            icon: 'policy'
        },
        {
            title: 'FAQ',
            subtitle: 'Securely add payment method',
            icon: 'help-outline',
        },
        {
            title: 'Log Out',
            subtitle: 'Securely log out of Account',
            icon: 'logout',
            color: '#ef4444',
            onPress: LogOutAction,
        }
    ]

  return (
    <ScrollView>
        <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.profileCard}>
            <Image
                source={{
                    uri: ImageUrl + profileInfo?.data?.avatar, // Replace with your image URL
                }}
                style={styles.profileImage}
            />
            <View>
            <Text style={styles.profileName}>{profileInfo?.data?.name}</Text>
            <Text style={styles.profileEmail}>{profileInfo?.data?.email ? profileInfo?.data?.email : profileInfo?.data?.phone}</Text>
            </View>
        </View>

        {/* General Section */}
        <View style={styles.section}>
            <Fragment>
                {listJson?.map((item:any) => (
                    <TouchableOpacity style={styles.optionRow} onPress={item?.onPress} key={item?.title} >
                        <View style={styles.optionLeft}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name={item?.icon} size={20} color={item.color} />
                        </View>
                        <View>
                            <Text style={styles.optionTitle}>{item?.title}</Text>
                            <Text style={styles.optionSubtitle}>{item?.subtitle}</Text>
                        </View>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={20} color="#b0b0b0" />
                    </TouchableOpacity>
                ))}
            </Fragment>
        </View>    
        </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  profileEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,

  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#ede9fe',
    padding: 10,
    borderRadius: 20,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default ProfileScreen;
