import axios from "axios";
import { config } from "./config";

export const api = axios.create({
  baseURL: config.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});
