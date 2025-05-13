export interface RegisterAccountInput {
  email: string;
  username: string;
  password: string;
  role: 'warga' | 'admin' | 'ketua';
}

export interface RegisterProfileInput {
  fullName: string;
  address: string;
  birthDate: string;
  birthPlace: string;
  meritalStatus: string;
  occupation: string;
  phoneNumber: string;
  nationalId: string;
  gender: 'male' | 'female';
  nationality: string;
  religion: 'Islam' | 'Kristen' | 'Katolik' | 'Hindu' | 'Buddha' | 'Konghucu';
}

export interface UpdateUser {
  email?: string;
  username?: string;
  password?: string;
  // role?: 'warga' | 'admin' | 'ketua';
  profile?: {
    fullName?: string;
    address?: string;
    birthDate?: string;
    meritalStatus?: string;
    occupation?: string;
    phoneNumber?: string;
    nationalId?: string;
    gender?: 'male' | 'female';
    nationality?: string;
    sign?: string;
    religion?: 'Islam' | 'Kristen' | 'Katolik' | 'Hindu' | 'Buddha' | 'Konghucu';
  };
}

export interface GetUserQuery {
  page?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
  withProfile?: boolean;
}

export interface RegisterAccountErrors {
  email?: string | null;
  username?: string | null;
  password?: string | null;
  role?: 'warga' | 'admin' | 'ketua';
}

export interface RegisterProfileErrors {
  fullName?: string | null;
  address?: string | null;
  birthDate?: string | null;
  birthPlace?: string | null;
  meritalStatus?: string | null;
  occupation?: string | null;
  phoneNumber?: string | null;
  nationalId?: string | null;
  gender?: string | null;
  nationality?: string | null;
  religion?: string | null;
}

export interface ProfileDetailErrors {
  email?: string | null;
  username?: string | null;
  role?: string | null;
  fullName?: string | null;
  address?: string | null;
  birthDate?: string | null;
  birthPlace?: string | null;
  meritalStatus?: string | null;
  occupation?: string | null;
  phoneNumber?: string | null;
  nationalId?: string | null;
  gender?: string | null;
  nationality?: string | null;
  religion?: string | null;
}

export interface FullRegisterInput extends RegisterAccountInput {
  profile: RegisterProfileInput;
}

export interface Profile {
  id: string;
  fullName: string;
  address: string;
  birthDate: string;
  birthPlace: string;
  phoneNumber: string;
  nationalId: string;
  meritalStatus: string;
  occupation: string;
  gender: 'male' | 'female';
  nationality: string;
  religion: 'Islam' | 'Kristen' | 'Katolik' | 'Hindu' | 'Buddha' | 'Konghucu';
  createdAt: string;
  sign?: string;
  updatedAt: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'warga' | 'admin' | 'ketua';
  createdAt: string;
  updatedAt: string;
  profile: Profile;
}
