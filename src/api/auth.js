import axios from "axios";
import { API_BASE_URL } from "./config";


export const superlogin = async (form) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/super/login`, form);
    return response;
  } catch (error) {
    return error.response;
  }
}
