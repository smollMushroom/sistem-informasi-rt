export interface RegisterAccountInput {
  email: string;
  username: string;
  password: string;
}

export interface RegisterProfileInput {
  fullName: string;
  address: string;
  birthDate: string;
  meritalStatus: string;
  occupation: string;
  phoneNumber: string;
  nationalId: string;
}

export interface RegisterAccountErrors {
  email?: string | null;
  username?: string | null;
  password?: string | null;
}

export interface RegisterProfileErrors {
  fullName?: string | null;
  address?: string | null;
  birthDate?: string | null;
  meritalStatus?: string | null;
  occupation?: string | null;
  phoneNumber?: string | null;
  nationalId?: string | null;
}

export interface FullRegisterInput extends RegisterAccountInput {
  profile: RegisterProfileInput;
}