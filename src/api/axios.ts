import axios from "axios";

const api = axios.create({
  baseURL: 'https://z0rsc2bq-3000.asse.devtunnels.ms/v1'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
})

export default api