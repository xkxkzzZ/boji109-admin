// /api/admin/users-with-subs GET

import axios from 'axios';
import { API_BASE_URL } from './config';


export const getUsersWithSubs = async (token) => {
  // /api/admin/users-with-subs
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/users-with-subs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching users with subscriptions:', error);
    return error.response;
  }
}



export const assignSubUser = async (token, parentUserId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/assign-sub-user`, { parentUserId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error assigning subscription to user:', error);
    return error.response;
  }
}


export const deleteSubUser = async (token, id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/delete-sub-user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error deleting subscription user:', error);
    return error.response;
  }
}