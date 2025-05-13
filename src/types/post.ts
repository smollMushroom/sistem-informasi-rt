export interface CreatePostInput {
  title: string;
  thumbnail: string;
  content: string;
  type: 'news' | 'announcement';
}

export interface UpdatePostInput {
  title?: string;
  thumbnail?: string;
  content?: string;
  type?: 'news' | 'announcement';
}

export interface GetPostQuery {
  page?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
  withThumbnail?: boolean;
  withContent?: boolean;
}

interface Author {
  username: string;
  role: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  type: string;
  slug: string;
  thumbnail: string; // ini adalah base64 image string
  publishedAt: string; // ISO date string
  updatedAt: string; // ISO date string
  authorId: string;
  author: Author;
}

export interface PostResponse {
  status: 'success' | 'fail';
  message: string;
  data: {
    posts: Post[] | Post;
    pagination: {
      totalItems: number;
      currentPage: number;
      totalPages: number;
      pageSize: number;
    };
  };
}
