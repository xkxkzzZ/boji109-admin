import axios from "axios";
const API_BASE_URL = "http://192.168.2.106:8000";


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
    return error.response;
  }
}
