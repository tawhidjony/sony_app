import { View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter email and password');
    } else {
      setError(null);
      // Call your login API here
      console.log('Login successful');
    }
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
      {/* <View style={styles.logoContainer}>
        <Image source={require('@/assets/images/sony-logo.png')} style={styles.logo} />
      </View> */}
      <Text style={styles.title}>Registration</Text>
      <View style={styles.inputContainer}>
      <AntDesign name="user" size={20} style={{ color: '#E6E6E6' }} />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
          onBlur={handleBlur}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email-outline" size={20} style={{ color: '#E6E6E6' }} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
          onBlur={handleBlur}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={20} style={{ color: '#E6E6E6' }} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          onBlur={handleBlur}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/login')} >
        <Text style={styles.buttonText}> Login</Text>
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
