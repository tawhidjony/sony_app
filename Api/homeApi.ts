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

export const eventDetail = async (token: any, id: any) => {
  const response = await axios.get(BaseUrl + `/events/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const eventBooking = async ({ body, token }: any) => {
  const response = await axios.post(BaseUrl + "/booking", body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const bookingList = async (token: any, page = 1) => {
  const response = await axios.get(BaseUrl + `/booking?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const profile = async (token: any) => {
  const response = await axios.get(BaseUrl + `/profile/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const profileUpdate = async ({ id, body, token }: any) => {
  const response = await axios.patch(
    BaseUrl + "/profile/" + id + "/update",
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
