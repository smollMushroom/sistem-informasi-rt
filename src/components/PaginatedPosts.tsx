import React, { useEffect, useState } from 'react';
import { getPost } from '@/services/postService'; // Sesuaikan path
import type { PostResponse, Post } from '@/types/post'; // Sesuaikan path
import Loading from './Loading';

interface PaginatedPostsProps {
  renderItem: (post: Post) => React.ReactNode;
  pageSize?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

const PaginatedPosts: React.FC<PaginatedPostsProps> = ({
  renderItem,
  pageSize = 6,
  sortBy,
  order,
  search,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const response: PostResponse = await getPost({
        page,
        limit: pageSize,
        sortBy,
        order,
        search,
        withContent: false
      });

      const { data } = response;
      const postData = Array.isArray(data.posts) ? data.posts : [data.posts];
      setPosts(postData);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Gagal mengambil data post:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, pageSize, sortBy, order, search]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    // Paksa tampilkan ... walau totalPages kecil
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (totalPages <= 4) {
      if (currentPage <= 2) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage === totalPages) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
      return [...new Set(pages)]; // hilangkan duplikat
    }

    // totalPages lebih dari 4
    const leftBound = Math.max(2, currentPage - 1);
    const rightBound = Math.min(totalPages - 1, currentPage + 1);

    const showLeftDots = leftBound > 2;
    const showRightDots = rightBound < totalPages - 1;

    pages.push(1);

    if (showLeftDots) pages.push('...');
    for (let i = leftBound; i <= rightBound; i++) {
      pages.push(i);
    }
    if (showRightDots) pages.push('...');
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="space-y-4 my-[50px] gap-[50px] flex flex-col justify-center items-center">
      {loading ? (
        <Loading isVisible/>
      ) : (<>
        <div className='flex gap-[20px] justify-center flex-wrap'>
          {posts.map((post, index) => (
            <div key={index}>{renderItem(post)}</div>
          ))}
        </div>
        <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded bg-white disabled:opacity-50 shadow-md"
        >
          First
        </button>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded bg-white disabled:opacity-50 shadow-md"
        >
          Prev
        </button>

        {getVisiblePages().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 border rounded shadow-md ${
                currentPage === page ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-3 py-1 text-gray-500 select-none">
              ...
            </span>
          )
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded bg-white disabled:opacity-50 shadow-md"
        >
          Next
        </button>
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded bg-white disabled:opacity-50 shadow-md"
        >
          Last
        </button>
      </div>
        </>
      )}

      
    </div>
  );
};

export default PaginatedPosts;
