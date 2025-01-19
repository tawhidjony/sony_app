import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const AuthLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="login"  />
    <Stack.Screen name="register"  />
  </Stack>
)

export default AuthLayout

const styles = StyleSheet.create({})