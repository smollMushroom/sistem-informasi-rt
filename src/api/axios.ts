import axios from "axios";

const api = axios.create({
  baseURL: 'https://sistem-informasi-rt-api-production.up.railway.app/v1'
  // baseURL: 'http://localhost:3000/v1'
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
})

export default api