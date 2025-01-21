import axios from "axios";
import { BaseUrl } from "./apiClient";

export const registerUser = async (user: any) => {
  const response = await axios.post(
    BaseUrl + "/register",
    {
      name: user.username,
      identify: user.identify,
      password: user.password,
      password_confirmation: user.password_confirmation,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const loginUser = async (user: any) => {
  const response = await axios.post(
    BaseUrl + "/login",
    {
      identify: user.identify,
      password: user.password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const logOut = async (token: any) => {
  const response = await axios.get(BaseUrl + "/logout", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
