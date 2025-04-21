import api from "@/api/axios";
import { FullRegisterInput } from "../types/user";

export const register = async (data: FullRegisterInput) => {
  const res = await api.post('/users/create', data);
  return res.data;
}