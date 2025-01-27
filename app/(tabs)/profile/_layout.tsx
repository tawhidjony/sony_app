import { Stack } from 'expo-router'
import React from 'react'

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='editProfile' options={{ title: 'Edit Profile', }} />
      <Stack.Screen name='paymentInfo' options={{ title: 'Payment Information', }} />
      <Stack.Screen name='passwordChange' options={{ title: 'Password Change', }} />
    </Stack>
  )
}

export default ProfileLayout