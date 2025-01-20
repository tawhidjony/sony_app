import { registerUser } from '@/Api';
import { useAuthSession } from '@/providers/AuthProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { z } from 'zod';

// Define Zod schema for validation
const registerSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .min(3, { message: 'Username must be at least 3 characters' }),
  identify: z
    .string({
      required_error: 'This field is required',
      invalid_type_error: 'Mobile Number or Email must be a string',
    })
    .refine((value) => {
      const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return phoneRegex.test(value) || emailRegex.test(value);
    }, { message: 'Enter a valid phone number or email' }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(6, { message: 'Password must be at least 6 characters' }),
  password_confirmation: z.string({
      required_error: 'Confirm Password is required',
      invalid_type_error: 'Confirm Password must be a string',
    })
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Passwords do not match',
  path: ['password_confirmation'], // Specify which field will show the error
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const { width, height } = useWindowDimensions(); 
  const {signUp} = useAuthSession();
  const mutation = useMutation({
    mutationFn: registerUser,
    mutationKey: ["signUp"],
  })
  
  const { control, handleSubmit, formState: { errors }} = useForm<RegisterFormValues>({
    mode: 'all',
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
      mutation.mutateAsync(data)
      .then((response) => {
        console.log(response);
        signUp(response.token);
        router.replace('/(tabs)');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
      <View  style={[styles.container, { padding: width * 0.05 }]}>
      {/* Top Image */}
      <View style={[styles.imageContainer, { marginBottom: height * 0.02 }]}>
        <Image
          source={require('@/assets/images/sony.png')} // Replace with your image path
          style={[styles.image, { width: width * 0.4, height: height * 0.2 }]}
          resizeMode="contain"
        />
      </View>

      {/* Register Header */}
      <Text style={[styles.title, { fontSize: width * 0.07 }]}>Register</Text>
      <Text style={[styles.subtitle, { fontSize: width * 0.045 }]}>
        Please register to login.
      </Text>

      {/* Input Fields */}
      <View style={[styles.inputContainer, { marginBottom: height * 0.02 }]}>
        {/* Username Field */}
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.username && styles.errorInput]}
              placeholder="Username"
              placeholderTextColor="#8A8A8A"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

        {/* Mobile Number Field */}
        <Controller
          control={control}
          name="identify"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.identify && styles.errorInput]}
              placeholder="Mobile Number"
              placeholderTextColor="#8A8A8A"
              keyboardType="default"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.identify && <Text style={styles.errorText}>{errors.identify.message}</Text>}

        {/* Password Field */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.password && styles.errorInput]}
              placeholder="Password"
              placeholderTextColor="#8A8A8A"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        {/* Confirm Password Field */}
        <Controller
          control={control}
          name="password_confirmation"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.password_confirmation && styles.errorInput]}
              placeholder="Confirm Password"
              placeholderTextColor="#8A8A8A"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password_confirmation && <Text style={styles.errorText}>{errors.password_confirmation.message}</Text>}
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity 
        style={[styles.signUpButton, { paddingVertical: height * 0.02 }]} 
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')} >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },
  errorInput: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: '#6B7280',
  },
  signInText: {
    color: '#1E3A8A',
    fontWeight: 'bold',
  },
});
