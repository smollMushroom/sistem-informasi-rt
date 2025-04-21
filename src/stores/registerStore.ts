import { create } from 'zustand';
import { RegisterAccountInput, RegisterProfileInput } from '../types/user';

interface RegisterState {
  account: RegisterAccountInput | null;
  profile: RegisterProfileInput | null;
  setAccount: (data: RegisterAccountInput) => void;
  setProfile: (data: RegisterProfileInput) => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  account: null,
  profile: null,
  setAccount: (data) => set({ account: data }),
  setProfile: (data) => set({ profile: data }),
  reset: () => set({ account: null, profile: null }),
}));
