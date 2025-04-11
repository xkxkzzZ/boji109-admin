import axios from "axios";
import { API_BASE_URL } from "./config";

export const getPdfPreview = async (token, id) => {
  console.log("fetch pdf id :", id);
  try {
    const response = await fetch(`${API_BASE_URL}/pdf/preview/${id}`,{
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response);
    return response;
  }  catch (error) {
    console.error("Error fetching PDF preview:", error);
    return error.response;
  }
}


// /api/item/info/{id}
// 获取单个条目的全部信息

export const getItemInfo = async (token, id) => {
  try {
    console.log("fetch item id :", id);
    console.log(" token: " ,token);

    const response = axios.post(`${API_BASE_URL}/item/info/${id}`,null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response);
    return response;
  }catch (error) {
    console.error("Error fetching item info:", error);
    return error.response;
  }
}