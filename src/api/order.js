import axios from "axios";
import { API_BASE_URL } from "./config";



// /api/orders/all

export const getAllOrders = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;

  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
}