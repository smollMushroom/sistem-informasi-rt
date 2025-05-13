import { Profile } from "./user";

interface PartialUser {
  id: string;
  role: 'warga' | 'admin' | 'ketua';
  email: string;
  username: string;
  profile: Profile
}

export type LetterStatus = 'pending' | 'process' | 'approved' | 'rejected' | 'canceled';

export interface LetterRequest {
  id: string;
  userId: string;
  letterType: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'canceled';
  reason: string;
  submissionDate: Date;
  processedDate: Date | null;
  pickupDate: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: PartialUser;
}

export interface GetLetterRequestsQuery {
  page?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export interface CreateLetterRequestPayload {
  letterType: string;
  reason: string;
}

export interface ResponseCreateLetterRequest {
  message: string;
  status: string;
  data: LetterRequest;
}

export interface UpdateLetterRequestPayload {
  letterType?: string;
  reason?: string;
  status?: 'pending' | 'process' | 'approved' | 'rejected' | 'canceled';
  processedDate?: Date;
  pickupDate?: Date;
}
