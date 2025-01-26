import axios from "axios";
import { BaseUrl } from "./apiClient";

export const userProfile = async (token: any) => {
    const response = await axios.get(BaseUrl + `/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };