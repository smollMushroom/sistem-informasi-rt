import api from "@/api/axios";
import { CreateLetterRequestPayload, GetLetterRequestsQuery, UpdateLetterRequestPayload } from "@/types/letterRequest";

export const getLetterRequests = async (query: GetLetterRequestsQuery) => {
  const getQuery = buildQueryString(query);
  const token = localStorage.getItem('token');
  const res = await api.get(`/letter${getQuery}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export const getLetterById = async (id:string) => {
  const token = localStorage.getItem('token');
  const res = await api.get(`/letter/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return res.data;
}

export const createLetter = async (data: CreateLetterRequestPayload) => {
  const token = localStorage.getItem('token');
  const res = await api.post(`/letter`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return res.data;
}

export const updateLetter = async (id: string, data: UpdateLetterRequestPayload) => {
  const token = localStorage.getItem('token');
  const res = await api.put(`/letter/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return res.data;
}

export const deleteLetter = async (id: string) => {
  const token = localStorage.getItem('token');
  const res = await api.delete(`/letter/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log({res});
  
  return res.data;
}

function buildQueryString(params: GetLetterRequestsQuery): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}
