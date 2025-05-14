import api from '@/api/axios';
import { FullRegisterInput, GetUserQuery, UpdateUser } from '../types/user';

export const register = async (data: FullRegisterInput) => {
  const res = await api.post('/users/create', data);
  return res.data;
};

export const getUsers = async (query: GetUserQuery) => {
  const getQuery = buildQueryString(query);
  const token = localStorage.getItem('token');
  const res = await api.get(`/users${getQuery}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const checkUserIsUsed = async (email: string, username: string) => {
  const res = await api.post('/users/create/account', {email, username})
  return res.data
} 

export const updateUser = async (id:string, data: UpdateUser) => {
  const token = localStorage.getItem('token');
  const res = await api.put(`/users/update/${id}?withProfile=true`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export const deleteUsers = async (email: string) => {
  const token = localStorage.getItem('token');
  const res = await api.delete(`/users/delete/${email}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const whoAmI = async () => {
  const token = localStorage.getItem('token') || '';
  const res = await api.get(`/users/whoAmI`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

function buildQueryString(params: GetUserQuery): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

export const verifyUser = async (token: string) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await api.get('/users/whoAmI', config);
  
  return res.data;
};
