import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { StatusBar, View } from "react-native";

import { Colors } from "@/constants/Colors";
import AuthProvider from '@/providers/AuthProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout(): React.ReactNode {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Move useReactQueryDevTools inside useEffect to ensure consistent hook calls
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} pointerEvents="box-none">
        <QueryClientProvider client={queryClient}>
          <StatusBar backgroundColor={Colors.light.background} barStyle="dark-content" />
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </QueryClientProvider>
    </View>
  );
}


