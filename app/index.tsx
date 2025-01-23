import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    (async ():Promise<void> => {
      const token = await AsyncStorage.getItem('@token');
      setTimeout(() => {
        if(!token) {
          <Redirect href="/login" />
        }else {
          <Redirect href="/(tabs)/home" />
        }
      },300);
    })()
  })
}
