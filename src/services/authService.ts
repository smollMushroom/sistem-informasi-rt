import api from "@/api/axios";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload): Promise<string> => {
  const res = await api.post('/auth/login', payload);
  return res.data.token
}