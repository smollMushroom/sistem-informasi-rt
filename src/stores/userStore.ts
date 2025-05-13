import { getUsers, whoAmI } from "@/services/userService";
import { PaginationMeta } from "@/types/common";
import { User } from "@/types/user";
import { create } from "zustand";

interface UserStore {
  users: User[];
  user: User | null;
  pagination: PaginationMeta;
  loading: boolean;
  fetchUsers: (params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    search?: string;
    withProfile?: boolean;
  }) => Promise<void>
  fetchUser: (id: string) => Promise<void>
  whoAmI: () => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  user: null,
  pagination: {totalPages: 0, totalItems: 0, currentPage: 1},
  loading: false,
  fetchUsers: async ({page = 1, limit = 10, sortBy, order, search, withProfile} = {}) => {
    set({loading: true});
    try {
      const response = await getUsers({page, limit, sortBy, order, search, withProfile});
      set({
        users: response.data.users,
        pagination: response.data.pagination,
      });
    } catch (error) {
      console.error('failed to fetch users: ', error);
    } finally {
      set({loading: false});
    }
  },
  fetchUser: async (id: string) => {
    set({loading: true});
    try {
      const response = await getUsers({limit: 1, search: id, withProfile: true});
      set({user: response.data.users[0]})
    } catch (error) {
      console.error(error)
    } finally {
      set({loading: false})
    }
  },
  whoAmI: async () => {
    set({loading: true});
    try {
      const response = await whoAmI();
      set({user: response.data.users[0]})
    } catch (error) {
      console.error(error)
    } finally {
      set({loading: false})
    }
  }
}))