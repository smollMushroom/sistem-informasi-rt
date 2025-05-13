import { clearTokenExpiryTimer, scheduleTokenExpiry } from "@/utils/helper/token";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  logoutReason: string | null;
  setToken: (token:string) => void;
  logout: (reason?: string) => void
  clearLogoutReason: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  
  logoutReason: null,
  
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({token})
    scheduleTokenExpiry(token);
  },
  
  logout: (reason) => {
    localStorage.removeItem('token');
    clearTokenExpiryTimer()
    set({token: null, logoutReason: reason})
  },

  clearLogoutReason: () => {
    set({logoutReason: null})
  }
}))