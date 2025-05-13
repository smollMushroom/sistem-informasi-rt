import api from '@/api/axios';
import { CreatePostInput, GetPostQuery, UpdatePostInput } from '@/types/post';

export const createPost = async (data: CreatePostInput) => {
  const token = localStorage.getItem('token');
  const res = await api.post('/posts', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const updatePost = async (data: UpdatePostInput, id: string) => {
  const token = localStorage.getItem('token');
  const res = await api.put(`/posts/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data
};

export const deletePost = async (id: string) => {
  const token = localStorage.getItem('token');
  const res = await api.delete(`/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data
}

export const getPost = async (query: GetPostQuery) => {
  const getQuery = buildQueryString(query);
  const token = localStorage.getItem('token');
  const res = await api.get(`/posts${getQuery}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

function buildQueryString(params: GetPostQuery): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}
