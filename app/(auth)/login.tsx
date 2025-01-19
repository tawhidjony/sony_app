import { View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';

export default function Login() {

  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    mode: 'all',
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleLogin = (data: any) => {
    console.log(data.email, data.password);
  };

  const { width, height } = Dimensions.get('window');

  const handleBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { width, height }]}
    >
      <LinearGradient
        colors={['#0a7ea4', '#0a7ea4']}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <Text style={styles.title}>Login</Text>
      <View>
        <Controller
          control={control}
          rules={{ required: 'Email is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="email-outline" size={20} style={{ color: '#E6E6E6' }} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                onBlur={onBlur}
              />
            </View>
          )}
          name="email"
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      </View>


      <View>
        <Controller 
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-outline" size={20} style={{ color: '#E6E6E6' }} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              onBlur={onBlur}
            />
          </View>
          )}
          name="password"
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      </View>


      <TouchableOpacity style={styles.button} onPress={handleSubmit(handleLogin)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/register')} >
        <Text style={styles.buttonText}> Sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#DBD3D3',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    marginBottom: 16,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#333',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
