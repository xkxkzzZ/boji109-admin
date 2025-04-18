import axios from "axios";
import { API_BASE_URL } from "./config";


// /api/permissions/grant-category
export const grantCategory = async (token, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/permissions/grant-category`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error granting category permission:", error);
    return error.response;
  }
}

// /api/permissions/check/all-categories
// Query 参数 userId

export const checkAllCategories = async (token, userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/permissions/check/all-categories`, {
      params: { userId },
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error checking all categories:", error);
    return error.response;
  }
}

// DELETE /api/permissions/revoke-category
// Query 参数 userId categoryName

export const revokeCategory = async (token, userId, categoryName) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/permissions/revoke-category`, {
      params: { userId, categoryName },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error revokeCategory:", error);
    return error.response;
  }
}

// /api/permissions/categories/info
// query categoryName 

export const getCategoryInfo = async (token, categoryName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/permissions/categories/info`, {
      params: { categoryName },
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error getting category info:", error);
    return error.response;
  }
}

// post /api/permissions/categories/info
// json data  

export const updateCategoryInfo = async (token, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/permissions/categories/info`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error updating category info:", error);
    return error.response;
  }
}