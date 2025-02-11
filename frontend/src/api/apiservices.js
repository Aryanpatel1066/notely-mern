// src/apiService.js
import axios from 'axios';

const apiService = axios.create({
  baseURL: 'https://notely-mernb.onrender.com/todoApp/api/v1', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiService.defaults.headers.common['Authorization'];
  }
};

export default apiService;
