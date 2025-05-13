import { create } from 'zustand';
import { getPost } from '@/services/postService';
import type { Post } from '@/types/post';
import type { PaginationMeta } from '@/types/common';

interface PostStore {
  posts: Post[];
  pagination: PaginationMeta;
  loading: boolean;
  fetchPosts: (params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    search?: string;
    withContent?: boolean;
    withThumbnail?: boolean;
  }) => Promise<void>;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  pagination: { totalPages: 0, totalItems: 0, currentPage: 1 },
  loading: false,
  fetchPosts: async ({ page = 1, limit = 10, sortBy, order, search, withThumbnail, withContent } = {}) => {
    set({ loading: true });
    try {
      const response = await getPost({ page, limit, sortBy, order, search, withThumbnail, withContent });
      set({
        posts: response.data.posts,
        pagination: response.data.pagination,
      });
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
