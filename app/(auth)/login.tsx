import { loginUser } from '@/Api';
import { ShowToastWithGravity } from '@/components/utils/HotToastNotification';
import { useAuthSession } from '@/providers/AuthProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { z } from 'zod';

// Define Zod schema for validation
const loginSchema = z.object({
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
  // rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>;

export default function App() {
  const {signIn} = useAuthSession();
  const { width, height } = useWindowDimensions();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identify: '',
      password: '',
      // rememberMe: false
    }
  });
  const mutation = useMutation({
    mutationFn: loginUser,
    mutationKey: ["login"],
  });



  const onSubmit = (data: LoginFormValues) => {
    mutation
    .mutateAsync(data)
    .then((response) => {
      signIn(response.token);
    })
    .catch((err) => {
      console.log(err);
      if (err) {
        ShowToastWithGravity(err.response.data.message || 'Something went wrong');
      }
    });
  };

  return (
    <View style={[styles.container, { padding: width * 0.05 }]}>
      {/* Top Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/sony.png')} // Replace with your image path
          style={[styles.image, { width: width * 0.4, height: height * 0.2 }]}
          resizeMode="contain"
        />
      </View>

      {/* Login Header */}
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Please Sign in to continue.</Text>

      {/* Input Fields */}
      <View style={[styles.inputContainer, { marginBottom: height * 0.02 }]}>
          {/* Mobile Number Field */}
          <Controller
            control={control}
            name="identify"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.identify && styles.errorInput]}
                placeholder="Email or Mobile Number"
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
      </View>

      {/* Remember Me and Show Password */}
      {/* <View style={styles.rememberContainer}>
        <Controller
          control={control}
          name="rememberMe"
          render={({ field: { onChange, onBlur, value } }) => {
            return (<>
                 <Switch
                  value={value}
                  onValueChange={(value) => onChange(value)}
                  onTintColor="#1E3A8A"
                  thumbColor={value ? '#1E3A8A' : '#D1D5DB'}
                />
                <Text style={styles.rememberText}>Remember me next time</Text>
            </>)
          }}
        
        />
   
      </View> */}

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSubmit(onSubmit)}>
        {mutation.isPending ?
            <ActivityIndicator size="small" color="#fff" animating={mutation.isPending} hidesWhenStopped />:
            <Text style={styles.signInText}>Sign In</Text>
        }
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.signUpText}>Sign Up</Text>
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
    padding: 20,
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
    marginBottom: 20,
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
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  rememberText: {
    marginLeft: 10,
    color: '#6B7280',
  },
  signInButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  signInText: {
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
  signUpText: {
    color: '#1E3A8A',
    fontWeight: 'bold',
  },
});
