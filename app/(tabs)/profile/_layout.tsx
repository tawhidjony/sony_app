import { Stack } from 'expo-router'
import React from 'react'

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='editProfile' options={{ title: 'Edit Profile',}} />
    </Stack>
  )
}

export default ProfileLayout