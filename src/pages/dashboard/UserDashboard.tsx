/* eslint-disable @typescript-eslint/no-explicit-any */
import ConfirmActionModal from '@/components/ConfirmActionModal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import DashboardLayout from '@/components/DashboardLayout';
import NotificationModal from '@/components/NotificationModal';
import PaginatedTable from '@/components/PaginatedTable';
import { deleteUsers } from '@/services/userService';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import { JwtPayload } from '@/types/jwtPayload';
import dateTimeFormatter from '@/utils/formatters/dateTimeFormatter';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { TiEdit } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { fetchUsers, loading, pagination, users } = useUserStore();
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const { userId } = jwtDecode(token || '') as JwtPayload;

  const [currentPage, setCurrentPage] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);

  const [notifData, setNotifData] = useState({
    type: 'success' as 'success' | 'error' | 'info',
    title: '',
    message: '',
  });

  useEffect(() => {
    fetchUsers({ page: currentPage, order: 'desc', withProfile: true });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleView = (row: any) => {
    navigate(`/dashboard/user/detail/${row.id}`, {
      state: { user: row, mode: 'view' },
    });
  };

  const handleDelete = (row: any) => {
    setSelectedUser(row);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteUsers(selectedUser.id);

      setNotifData({
        type: 'success',
        title: 'Berhasil Dihapus',
        message: `Postingan "${selectedUser.username}" berhasil dihapus.`,
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
      setSelectedUser(null);
      await fetchUsers({ page: currentPage });
    }
  };

  const handleEdit = (row: any) => {
    navigate(`/dashboard/user/detail/${row.id}`, {
      state: { user: row, mode: 'edit' },
    });
  };

  const handleUpdateConfirm = (row: any) => {
    setSelectedUser(row);
    setShowUpdateModal(true);
  };

  const confirmUpdate = () => {
    if (selectedUser) {
      handleEdit(selectedUser); // panggil fungsi edit
    }
    setShowUpdateModal(false);
    setSelectedUser(null);
  };

  const cancelUpdate = () => {
    setShowUpdateModal(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      key: 'fullName',
      label: 'Nama Lengkap',
      render: (_value: any, row: any) => row?.profile?.fullName || '',
    },
    {
      key: 'username',
      label: 'Username',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'role',
      label: 'posisi',
      tdClassName: 'text-center',
    },
    {
      key: 'createdAt',
      label: 'Dibuat',
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
          {userId === row.id ? null : (
            <button
              onClick={() => handleDelete(row)}
              className="text-red-600 hover:text-red-800"
              title="Hapus"
            >
              <MdDelete />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full gap-5 my-[20px]">
        <h1 className="text-header2 font-bold ">Pengguna</h1>
        <PaginatedTable
          data={users}
          columns={columns}
          loading={loading}
          currentPage={pagination?.currentPage || 1}
          totalPages={pagination?.totalPages || 1}
          onPageChange={(page) => handlePageChange(page)}
        />
      </div>
      <ConfirmDeleteModal
        visible={showDeleteModal}
        title="Konfirmasi Penghapusan"
        message={`Apakah kamu yakin ingin menghapus akun "${selectedUser?.username}"?`}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
      <ConfirmActionModal
        visible={showUpdateModal}
        title="Konfirmasi Edit"
        message={`Apakah Anda yakin ingin mengedit akun "${selectedUser?.username}"?`}
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

export default UserDashboard;
