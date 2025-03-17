import axios from "axios";
const API_BASE_URL = "http://192.168.2.106:8000";


export const superlogin = async (form) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/superlogin`, form);
    return response;
  } catch (error) {
    return error.response;
  }
}
