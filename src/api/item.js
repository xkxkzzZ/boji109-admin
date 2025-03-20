import axios from "axios";
import { API_BASE_URL } from "./config";

// 上传
export const uploadItem = async (form, token) => {
  try {
    console.log(form);
    console.log(token);
    const response = await axios.post(`${API_BASE_URL}/item/upload`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

// 根据数组请求条目
export const getItemByIds = async (ids) => {
  console.log("getItemByIds ids", ids);
  try {
    const response = await axios.post(`${API_BASE_URL}/item/batch-preview`, {ids:ids});
    console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
}

// 修改条目
export const updateItem = async (id, data, token) => {
  try {
    console.log(data);
    console.log(token);
    const response = await axios.put(`${API_BASE_URL}/item/update/${id}`, data, {
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

// 获得筛选后的列表
export const getFilteredList = async (filter) => {
  try {
    console.log(filter);
    const response = await axios.get(`${API_BASE_URL}/item/filter`,{
      params: filter // 这里直接传入 filter 对象
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}