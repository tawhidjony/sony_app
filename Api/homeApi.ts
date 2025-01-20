import axios from "axios";
import { BaseUrl } from "./apiClient";

export const eventList = async (token: any, page = 1) => {
  const response = await axios.get(BaseUrl + `/events?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
