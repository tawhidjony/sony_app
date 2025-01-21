import { Stack } from 'expo-router'
import React from 'react'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Event Booking' }} />
      <Stack.Screen name='[id]' options={{ headerShown: false }} />
    </Stack>
  )
}

export default HomeLayout