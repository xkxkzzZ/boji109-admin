import axios from "axios";
import { API_BASE_URL } from "./config";
import { id } from "element-plus/es/locales.mjs";


// 新建户名
export const createHousehold = async (data, token) => {
  try {
    console.log(data);
    console.log(token);
    const response = await axios.post(`${API_BASE_URL}/item/household/create`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    console.log(response);
    return response;
  }
  catch (error) {
    console.log(error.response);
    return error.response;
  }
}

// 请求全部户名信息
export const getAllHouseholds = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/item/household/all`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

// 根据户名获得对应条目的list
export const getHouseholdItems = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/item/household/${name}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

// 更新户名信息
export const updateHousehold = async (id, data, token) => {
  try {
    console.log(id);
    console.log(data);
    const response = await axios.put(`${API_BASE_URL}/item/household/update/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    console.log(response);
    return response;
  }
  catch (error) {
    console.log(error.response);
    return error.response;
  }
}

// 删除户名
export const deleteHousehold = async (id, token) => {
  try {
    console.log(id);
    const response = await axios.delete(`${API_BASE_URL}/item/household/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    console.log(response);
    return response;
  }
  catch (error) {
    console.log(error.response);
    return error.response;
  }
}