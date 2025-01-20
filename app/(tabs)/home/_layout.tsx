import React from 'react'
import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Event Booking' }} />
      <Stack.Screen name='[id]' options={{ title: 'Event Details' }} />
    </Stack>
  )
}

export default HomeLayout