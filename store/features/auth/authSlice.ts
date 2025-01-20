import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
};

interface AuthState {
  user: User | null;
  loading: boolean;
}

const loadUserFromStorage = async (): Promise<User | null> => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Failed to load user info", error);
    return null;
  }
};

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      AsyncStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutAction: (state) => {
      state.user = null;
      state.loading = false;
      AsyncStorage.removeItem("userInfo");
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { loginAction, logoutAction, setUser, setLoading } =
  authSlice.actions;

export default authSlice.reducer;

// Thunk to load user from AsyncStorage when the app starts
export const loadUser = () => async (dispatch: any) => {
  const user = await loadUserFromStorage();
  if (user) {
    dispatch(setUser(user));
  } else {
    dispatch(setLoading(false));
  }
};
