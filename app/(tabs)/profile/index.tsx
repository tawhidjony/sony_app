import { logOut } from '@/Api';
import { ImageUrl } from '@/Api/apiClient';
import { userProfile } from '@/Api/user';
import { ShowToastWithGravity } from '@/components/utils/HotToastNotification';
import { useAuthSession } from '@/providers/AuthProvider';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileScreen = () => {
  const { token, signOut } = useAuthSession();

  const { data: profileInfo, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userProfile(token?.current),
    enabled: !!token?.current,
  });

  const mutation = useMutation({
    mutationFn: logOut,
    mutationKey: ["logOut"],
  });

  const LogOutAction = () => {
    mutation
      .mutateAsync(token?.current)
      .then((response) => {
        signOut();
        ShowToastWithGravity(response?.message);
      })
      .catch((err) => {
        if (err) {
          ShowToastWithGravity(err?.response?.data?.message);
        }
      });
  };

  const listJson = [
    {
      title: 'Edit Profile',
      subtitle: 'Change profile picture, number, E-mail',
      icon: 'edit',
      onPress: () => router.push('/(tabs)/profile/editProfile')
    },
    {
      title: 'Add Payment Information',
      subtitle: 'Securely add payment method',
      icon: 'credit-card',
      onPress: () => router.push('/(tabs)/profile/paymentInfo')
    },
    {
      title: 'Change Password',
      subtitle: 'Update and strengthen account security',
      icon: 'lock',
      onPress: () => router.push('/(tabs)/profile/passwordChange')
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
      chevronIcon: false,
      color: '#ef4444',
      onPress: LogOutAction,
    }
  ];

  if (isLoading) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{backgroundColor:"#fff", padding:20, flex:1, justifyContent:"center", alignItems:"center", marginBottom:16, borderRadius:16}}>
            <View style={[styles.containerImg, { width: 100, height: 100, backgroundColor: '#e5e7eb' }]} />
            <View style={{flex:1, justifyContent:"center", alignItems:"center", paddingVertical:10, gap: 8}}>
              <View style={{width: 150, height: 20, backgroundColor: '#e5e7eb', borderRadius: 4}} />
              <View style={{width: 200, height: 16, backgroundColor: '#e5e7eb', borderRadius: 4}} />
            </View>
          </View>

          <View style={styles.section}>
            {[1,2,3,4,5,6].map((item) => (
              <View key={item} style={[styles.optionRow, {opacity: 0.7}]}>
                <View style={styles.optionLeft}>
                  <View style={[styles.iconContainer, {backgroundColor: '#e5e7eb'}]} />
                  <View>
                    <View style={{width: 120, height: 16, backgroundColor: '#e5e7eb', borderRadius: 4, marginBottom: 4}} />
                    <View style={{width: 180, height: 12, backgroundColor: '#e5e7eb', borderRadius: 4}} />
                  </View>
                </View>
                <View style={{width: 20, height: 20, backgroundColor: '#e5e7eb', borderRadius: 10}} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
       <View style={{backgroundColor:"#fff", padding:20, flex:1, justifyContent:"center", alignItems:"center", marginBottom:16, borderRadius:16}}>
        <View style={[styles.containerImg, { width: 100, height: 100 }]}>
            <Image
              source={profileInfo?.user?.avatar ? { uri: ImageUrl + profileInfo.user.avatar } : require('@/assets/images/sony.png')}
              style={[styles.image, { width: 100, height: 100 }]}
            />
            <View style={styles.editButton} >
              <Ionicons name="person-outline" size={24} color="black" />
            </View>
          </View>
          <View style={{flex:1, justifyContent:"center", alignItems:"center", paddingVertical:10}} >
            <Text style={[styles.profileName, {fontSize:20}]} >{profileInfo?.user?.name}</Text>
            <Text style={styles.profileName} >{profileInfo?.user?.email || profileInfo?.user?.phone}</Text>
          </View>
       </View>

        <View style={styles.section} pointerEvents='box-none'>
          {listJson.map((item:any) => (
            <TouchableOpacity style={styles.optionRow} onPress={item.onPress} key={item.title}>
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name={item.icon} size={20} color={item.color || '#000'} />
                </View>
                <View>
                  <Text style={styles.optionTitle}>{item.title}</Text>
                  <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <View>{item.chevronIcon === false ? null : <Ionicons name="chevron-forward-outline" size={20} color="#b0b0b0" />}</View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerImg: {
    position: 'relative',
  },
  image: {
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ede9fe',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
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
