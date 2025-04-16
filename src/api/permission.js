import axios from "axios";
import { API_BASE_URL } from "./config";


// /api/permissions/grant-category
export const grantCategory = async (data, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/permissions/grant-category`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}