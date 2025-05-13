import {
  createLetter,
  getLetterById,
  getLetterRequests,
  updateLetter,
} from '@/services/letterRequestService';
import { PaginationMeta } from '@/types/common';
import { CreateLetterRequestPayload, LetterRequest, UpdateLetterRequestPayload } from '@/types/letterRequest';
import { create } from 'zustand';

interface LetterRequestStore {
  letterRequests: LetterRequest[];
  letterRequest: LetterRequest | null;
  pagination: PaginationMeta;
  loading: boolean;
  fetchLetterRequest: (params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    search?: string;
  }) => Promise<void>;
  fetchLetterById: (id: string) => Promise<void>;
  createLetterRequest: (data: CreateLetterRequestPayload) => Promise<void>
  updateLetterRequest: (id: string, date: UpdateLetterRequestPayload) => Promise<void>
}

export const useLetterRequestStore = create<LetterRequestStore>((set) => ({
  letterRequests: [],
  letterRequest: null,
  pagination: { totalPages: 0, totalItems: 0, currentPage: 1 },
  loading: false,
  fetchLetterRequest: async ({
    page = 1,
    limit = 10,
    sortBy,
    order,
    search,
  } = {}) => {
    set({ loading: true });
    try {
      const response = await getLetterRequests({
        page,
        limit,
        sortBy,
        order,
        search,
      });
      set({
        letterRequests: response.data.letterRequests,
        pagination: response.data.pagination,
      });
    } catch (error) {
      console.error('failed to fetch users: ', error);
    } finally {
      set({ loading: false });
    }
  },
  fetchLetterById: async (id: string) => {
    set({ loading: true });
    try {
      const response = await getLetterById(id);
      set({ letterRequest: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
  createLetterRequest: async (data: CreateLetterRequestPayload) => {
    set({loading: true})
    try {
      const response = await createLetter(data);
      return response
    } catch (error) {
      console.error(error)
    } finally {
      set({loading: false})
    }
  },
  updateLetterRequest: async (id: string, data: UpdateLetterRequestPayload) => {
    set({loading: true})
    try {
      const response = await updateLetter(id, data);
      return response
    } catch (error) {
      console.error(error)
    } finally {
      set({loading: false})
    }
  }
}));
