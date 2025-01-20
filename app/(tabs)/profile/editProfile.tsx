import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileScreen = () => {
    const colorScheme = useColorScheme();
    return (
            <ScrollView style={styles.container}>
            <View style={styles.info}>
                <View style={styles.infoItem}>
                <Ionicons name="person-outline" size={20} color="#777" />
                <Text style={styles.infoText}>Anna Avetisyan</Text>
                </View>
                <View style={styles.infoItem}>
                <Ionicons name="calendar-outline" size={20} color="#777" />
                <Text style={styles.infoText}>Birthday</Text>
                </View>
                <View style={styles.infoItem}>
                <Ionicons name="call-outline" size={20} color="#777" />
                <Text style={styles.infoText}>818 123 4567</Text>
                </View>
                <View style={styles.infoItem}>
                <Ionicons name="logo-instagram" size={20} color="#777" />
                <Text style={styles.infoText}>Instagram account</Text>
                </View>
                <View style={styles.infoItem}>
                <Ionicons name="mail-outline" size={20} color="#777" />
                <Text style={styles.infoText}>info@aplusdesign.co</Text>
                </View>
                <View style={styles.infoItem}>
                <Ionicons name="eye-outline" size={20} color="#777" />
                <Text style={styles.infoText}>Password</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit profile</Text>
            </TouchableOpacity>
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
        padding: 20,
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
