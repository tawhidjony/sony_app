import axios from "axios";
export const ImageUrl = "https://5052-103-61-240-174.ngrok-free.app/";
export const BaseUrl = "https://5052-103-61-240-174.ngrok-free.app/api/v1";
export const ApiClient = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
