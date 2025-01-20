import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { createContext, MutableRefObject, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';

const AuthContext = createContext<{
  signIn: (arg0: string) => void;
  signUp: (arg0: any) => void;
  signOut: () => void
  token: MutableRefObject<string | null> | null;
  isLoading: boolean
}>({
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
  token: null,
  isLoading: true
});

// This hook can be used to access the user info.
export function useAuthSession() {
  return useContext(AuthContext);
}

export default function AuthProvider  ({children}:{children: ReactNode}): ReactNode {
  const tokenRef = useRef<string|null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async ():Promise<void> => {
      const token = await AsyncStorage.getItem('@token');
      tokenRef.current = token || '';
      setIsLoading(false);
    })()
  }, []);

  const signIn = useCallback(async (token: string) => {
    await AsyncStorage.setItem('@token', token);
    tokenRef.current = token;
    router.replace('/(tabs)/home')
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.setItem('@token', '');
    tokenRef.current = null;
    router.replace('/login');
  }, []);

  const signUp = useCallback(async (token: string) => {
    await AsyncStorage.setItem('@token', token);
    tokenRef.current = null;
    router.replace('/(tabs)/home')
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        token: tokenRef,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};