import axios from "axios";
export const ImageUrl = "https://40ad-103-192-157-228.ngrok-free.app/";
export const BaseUrl = "https://40ad-103-192-157-228.ngrok-free.app/api/v1";
export const ApiClient = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
