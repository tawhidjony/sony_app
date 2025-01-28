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

export const userProfileUpdate = async ({ id, body, token }: any) => {
  const response = await axios.patch(
    BaseUrl + "/user/" + id + "/update",
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

export const paymentInfo = async (token: any) => {
  const response = await axios.get(BaseUrl + `/profile/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const paymentInfoUpdate = async ({ id, body, token }: any) => {
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


export const userPasswordChange = async ({id, token, body}:any) => {
  const response = await axios.patch(
    BaseUrl + "/password/"+ id +"/update",
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}
