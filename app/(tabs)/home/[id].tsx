import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSearchParams } from 'expo-router/build/hooks'

const EventDetailsScreen = () => {
    const params = useSearchParams();
    const id = params.get('id');
    return (
        <View>
        <Text>EventDetailsScreen {id}</Text>
        </View>
    )
}

export default EventDetailsScreen

const styles = StyleSheet.create({})