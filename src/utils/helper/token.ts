import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '@/stores/authStore';

let expiryTimer: ReturnType<typeof setTimeout> | null = null;

export function scheduleTokenExpiry(token: string) {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const expiryTime = decoded.exp * 1000;
    const now = Date.now();
    const delay = expiryTime - now;

    if (expiryTimer) clearTimeout(expiryTimer);

    if (delay <= 0) {
      useAuthStore.getState().logout();
    } else {
      expiryTimer = setTimeout(() => {
        console.log("Token expired. Logging out...");
        useAuthStore.getState().logout('Sesi kamu sudah berakhir. silahkan login kembali');
      }, delay);
    }
  } catch (err) {
    console.error("Invalid token. Logging out.", err);
    useAuthStore.getState().logout("Token tidak valid. Silakan login kembali.");
  }
}

export function clearTokenExpiryTimer() {
  if (expiryTimer) {
    clearTimeout(expiryTimer);
    expiryTimer = null;
  }
}