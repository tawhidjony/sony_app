import axios from "axios";
export const ImageUrl = "https://speedoz.sahafallvhander.com/";
export const BaseUrl = "https://speedoz.sahafallvhander.com/api/v1";
export const ApiClient = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
