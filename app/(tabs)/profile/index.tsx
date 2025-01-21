import { logOut } from '@/Api';
import { profile } from '@/Api/homeApi';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthSession } from '@/providers/AuthProvider';
import { AntDesign, Entypo, FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileScreen = () => {
    const colorScheme = useColorScheme();
    const { token, signOut } = useAuthSession();

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['profile'],
        queryFn: () => profile(token?.current)
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
    return (
            <ScrollView style={styles.container}>
                <View style={[styles.header, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
                    <Image source={{ uri: data?.user_details?.visa_image }} style={styles.avatar} />
                    <Text style={styles.username}>{data?.name}</Text>
                </View>
                
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Ionicons name="person-outline" size={20} color="#777" />
                        <Text style={styles.infoText}>{data?.user_details?.name}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="call-outline" size={20} color="#777" />
                        <Text style={styles.infoText}>{data?.user_details?.phone}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Entypo name="address" size={24} color="black" />
                        <Text style={styles.infoText}>{data?.user_details?.address}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <FontAwesome6 name="cc-visa" size={20} color="black" />
                        <Text style={styles.infoText}>{data?.user_details?.visa_expiry_date}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <FontAwesome name="bank" size={20} color="black" />
                        <Text style={styles.infoText}>{data?.user_details?.bank_name}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <AntDesign name="creditcard" size={20} color="black" />
                        <Text style={styles.infoText}>{data?.user_details?.bank_account_number}</Text>
                    </View>
                    <Text style={{fontSize:26}} >Visa Image:</Text>
                </View>
                <View style={styles.visaImageContainer}>
                    <View style={styles.visaImageCard}>
                        <Image source={{ uri: data?.user_details?.visa_image }} style={styles.visaImage} />
                    </View>
                </View>

                <View>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => router.push('/(tabs)/profile/editProfile')}>
                        <Text style={styles.buttonText}>Edit profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={LogOutAction}>
                        <Text style={styles.buttonText}>LogOut</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        header: {
            backgroundColor: Colors.light.tint,
            padding: 20,
            alignItems: 'center',
            height: 200,
            borderBottomRightRadius: 60,
            borderBottomLeftRadius: 60,
        },
        avatar: {
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 10,
        },
        username: {
            color: '#fff',
            fontSize: 22,
        },
        info: {
            paddingHorizontal: 20,
            marginTop:20
        },
        infoItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
        },
        infoText: {
            marginLeft: 10,
            fontSize: 16,
        },
        visaImageContainer:{
            backgroundColor: '#fff',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
            marginBottom: 16,
            padding: 5,
            margin:16
        },
        visaImageCard:{
    
        },
        visaImage:{
            height: 150,
            width: '100%',
            borderRadius: 5,
            
        },
        button: {
            backgroundColor: Colors.light.tint,
            padding: 15,
            alignItems: 'center',
            margin: 20,
            borderRadius: 10,
        },
        buttonText: {
            color: '#fff',
            fontSize: 18,
        },
    });

export default ProfileScreen;
