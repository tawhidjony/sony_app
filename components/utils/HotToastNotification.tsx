import { ToastAndroid } from "react-native";

export const ShowToastWithGravity = (message: string) => {
  ToastAndroid?.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
};