/* eslint-disable @typescript-eslint/no-explicit-any */
import ConfirmActionModal from '@/components/ConfirmActionModal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import DashboardLayout from '@/components/DashboardLayout';
import NotificationModal from '@/components/NotificationModal';
import PaginatedTable from '@/components/PaginatedTable';
import { deletePost } from '@/services/postService';
import { usePostStore } from '@/stores/postStore';
import dateTimeFormatter from '@/utils/formatters/dateTimeFormatter';
import { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { TiEdit } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

const PostDashboard = () => {
  const { fetchPosts, loading, pagination, posts } = usePostStore();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPostForUpdate, setSelectedPostForUpdate] = useState<any>(null);

  const [showNotifModal, setShowNotifModal] = useState(false);
  const [notifData, setNotifData] = useState({
    type: 'success' as 'success' | 'error' | 'info',
    title: '',
    message: '',
  });

  useEffect(() => {
    fetchPosts({ page: currentPage, sortBy: 'updatedAt', order: 'desc', withContent: false, withThumbnail: false });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // simpan page yang dipilih
  };

  const handleView = (row: any) => {
    const slug = row.slug;
    navigate(`/post/${slug}`);
  };

  const handleEdit = (row: any) => {
    navigate(`/post/update/${row.slug}`, { state: { post: row } });
  };

  const handleUpdateConfirm = (row: any) => {
    setSelectedPostForUpdate(row);
    setShowUpdateModal(true);
  };
  
  const confirmUpdate = () => {
    if (selectedPostForUpdate) {
      handleEdit(selectedPostForUpdate); // panggil fungsi edit
    }
    setShowUpdateModal(false);
    setSelectedPostForUpdate(null);
  };
  
  const cancelUpdate = () => {
    setShowUpdateModal(false);
    setSelectedPostForUpdate(null);
  };

  const handleDelete = (row: any) => {
    setSelectedPost(row);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedPost) return;

    try {
      await deletePost(selectedPost.id);
  
      setNotifData({
        type: 'success',
        title: 'Berhasil Dihapus',
        message: `Postingan "${selectedPost.title}" berhasil dihapus.`,
      });
      
    } catch (error: any) {
      setNotifData({
        type: 'error',
        title: 'Gagal Menghapus',
        message: error?.message || 'Terjadi kesalahan saat menghapus.',
      });
    } finally {
      setShowNotifModal(true);
      setShowDeleteModal(false);
      setSelectedPost(null);
      await fetchPosts({ page: currentPage });
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedPost(null);
  };

  const columns = [
    {
      key: 'title',
      label: 'Judul',
    },
    {
      key: 'type',
      label: 'Tipe',
      render: (_value: any, row: any) => row.type === 'news' ? "Berita" : "Pengumuman", 
      tdClassName: 'text-center',
    },
    {
      key: 'author',
      label: 'Penulis',
      render: (_value: any, row: any) => row.author?.username || '-',
      tdClassName: 'text-center',
    },
    {
      key: 'publishedAt',
      label: 'Tanggal',
      render: (value: any) => dateTimeFormatter(value, true),
      tdClassName: 'text-center',
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (_: any, row: any) => (
        <div className="flex space-x-2 text-xl justify-center">
          <button
            onClick={() => handleView(row)}
            className="text-green-600 hover:text-green-800"
            title="Lihat"
          >
            <AiOutlineEye />
          </button>
          <button
            onClick={() => handleUpdateConfirm(row)}
            className="text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <TiEdit />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-600 hover:text-red-800"
            title="Hapus"
          >
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full gap-5 my-[20px]">
        <h1 className="text-header2 font-bold ">Pengumuman dan Berita</h1>
        <button onClick={()=>navigate('/post/create')} className='flex items-center gap-2 bg-blue-600 w-fit text-white py-2 px-6 rounded-md'><span className='font-bold'>Tambah</span> <FaPlus size={17}/></button>
        
        <PaginatedTable
          data={posts}
          columns={columns}
          loading={loading}
          currentPage={pagination?.currentPage || 1}
          totalPages={pagination?.totalPages || 1}
          onPageChange={handlePageChange}
        />
      </div>
      <ConfirmDeleteModal
        visible={showDeleteModal}
        title="Konfirmasi Penghapusan"
        message={`Apakah kamu yakin ingin menghapus postingan "${selectedPost?.title}"?`}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
      <ConfirmActionModal
        visible={showUpdateModal}
        title="Konfirmasi Edit"
        message={`Apakah Anda yakin ingin mengedit postingan "${selectedPostForUpdate?.title}"?`}
        confirmLabel="Edit Sekarang"
        onCancel={cancelUpdate}
        onConfirm={confirmUpdate}
      />
      <NotificationModal
        visible={showNotifModal}
        type={notifData.type}
        title={notifData.title}
        message={notifData.message}
        onClose={() => setShowNotifModal(false)}
      />
    </DashboardLayout>
  );
};

export default PostDashboard;
