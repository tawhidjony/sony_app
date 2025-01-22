import axios from "axios";
export const ImageUrl = "https://sony.loca.lt/";
export const BaseUrl = "https://sony.loca.lt/api/v1";
export const ApiClient = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
