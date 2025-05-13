/* eslint-disable @typescript-eslint/no-explicit-any */
import ConfirmActionModal from '@/components/ConfirmActionModal';
import DashboardLayout from '@/components/DashboardLayout';
import NotificationModal from '@/components/NotificationModal';
import PaginatedTable from '@/components/PaginatedTable';
import { deleteLetter } from '@/services/letterRequestService';
import { useLetterRequestStore } from '@/stores/letterRequestStore';
import { useUserStore } from '@/stores/userStore';
import { JwtPayload } from '@/types/jwtPayload';
import { LetterStatus } from '@/types/letterRequest';
import dateTimeFormatter from '@/utils/formatters/dateTimeFormatter';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { CgCloseR } from 'react-icons/cg';
import { FaPlus } from 'react-icons/fa';
import { FiCheckSquare } from 'react-icons/fi';
import { GoRead } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';
import { TbMailCancel } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

interface Modal {
  notificationVisible: boolean;
  notificationMessage: string;
  notificationType: 'error' | 'info';
  confirmVisible: boolean;
  confirmLabel: string;
  confirmMessage: string;
  confirmAction: () => Promise<void> | void | null;
}

const LetterRequestDashboard = () => {
  const {
    fetchLetterRequest,
    updateLetterRequest,
    letterRequests,
    loading,
    pagination,
  } = useLetterRequestStore();

  const { whoAmI, user } = useUserStore();
  const token = localStorage.getItem('token') || '';
  const { role } = jwtDecode(token) as JwtPayload;
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState<Modal>({
    confirmVisible: false,
    notificationMessage: '',
    notificationType: 'info',
    notificationVisible: false,
    confirmLabel: '',
    confirmMessage: '',
    confirmAction: () => {},
  });

  const handleModal = <K extends keyof Modal>(field: K, value: Modal[K]) => {
    setModal((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    whoAmI();
  }, []);

  useEffect(() => {
    fetchLetterRequest({ page: currentPage, order: 'desc' });
  }, [currentPage]);

  const handleUpdate = async (id: string, status: LetterStatus) => {
    handleModal('confirmVisible', false);

    if (role === 'ketua' && status === 'approved' && !user?.profile.sign) {
      handleModal('notificationVisible', true);
      handleModal(
        'notificationMessage',
        'Gagal menyetujui surat: Anda belum memiliki tanda tangan digital. Isi tanda tangan digital di pengaturan'
      );
      handleModal('notificationType', 'error');
      return;
    }

    try {
      const data: any = { status, signed: '' };

      if (role === 'ketua' && status === 'approved') {
        data.signed = user?.profile.sign;
      }
      await updateLetterRequest(id, data);
      handleModal('notificationVisible', true);
      handleModal('notificationMessage', 'Status pengajuan berhasil dirubah');
      handleModal('notificationType', 'info');
      fetchLetterRequest({ page: currentPage, order: 'desc' });
    } catch (error) {
      console.log(error);
      handleModal('notificationVisible', true);
      handleModal('notificationMessage', 'Status pengajuan gagal dirubah');
      handleModal('notificationType', 'error');
    }
  };

  const columns = [
    {
      key: 'fullName',
      label: 'Nama Lengkap',
      render: (value: any, row: any) => row.user.profile.fullName || '',
      tdClassName: 'text-center',
    },
    {
      key: 'letterType',
      label: 'Tipe Pengajuan',
      tdClassName: 'text-center',
    },
    {
      key: 'submissionDate',
      label: 'Tanggal Pengajuan',
      render: (value: any, row: any) => dateTimeFormatter(row.submissionDate),
      tdClassName: 'text-center',
    },
    {
      key: 'letterNumber',
      label: 'Nomor Surat',
      render: (value: any, row: any) => {
        const splittedLetterNumber = row.letterNumber.split('-');
        return `${splittedLetterNumber[0]} / SK-P / ${splittedLetterNumber[1]} / ${splittedLetterNumber[2]}`;
      },
      tdClassName: 'text-center',
    },
    {
      key: 'status',
      label: 'Status',
      tdClassName: 'text-center',
      render: (value: any, row: any) => {
        return (
          <span
            className={`py-[6px] px-3 rounded-md text-sm font-medium text-white ${
              row.status === 'pending'
                ? 'bg-yellow-400'
                : row.status === 'approved'
                ? 'bg-green-600'
                : row.status === 'rejected'
                ? 'bg-red-500'
                : row.status === 'process'
                ? 'bg-blue-600'
                : row.status === 'canceled'
                ? 'bg-gray-500'
                : 'bg-gray-300'
            }`}
          >
            {row.status === 'pending'
              ? 'Menunggu'
              : row.status === 'approved'
              ? 'Disetujui'
              : row.status === 'rejected'
              ? 'Ditolak'
              : row.status === 'process'
              ? 'Diproses'
              : row.status === 'canceled'
              ? 'Dibatalkan'
              : 'Tidak Diketahui'}
          </span>
        );
      },
    },
  ];

  if (role === 'admin' || role === 'ketua') {
    columns.push({
      key: 'changeStatus',
      label: 'Ubah Status',
      render: (_: any, row: any) => {
        if (role === 'admin') {
          return (
            <div className="flex space-x-2 text-xl justify-center">
              <button
                onClick={() => {
                  handleModal('confirmVisible', true);
                  handleModal('confirmAction', () =>
                    handleUpdate(row.id, 'process')
                  );
                }}
                className="text-blue-600 hover:text-blue-800"
                title="Proses"
              >
                <GoRead />
              </button>
            </div>
          );
        }

        if (role === 'ketua') {
          return (
            <div className="flex space-x-2 text-xl justify-center">
              <button
                onClick={() => {
                  handleModal('confirmVisible', true);
                  handleModal('confirmAction', () =>
                    handleUpdate(row.id, 'process')
                  );
                }}
                className="text-blue-600 hover:text-blue-800"
                title="Proses"
              >
                <GoRead />
              </button>
              <button
                onClick={() => {
                  handleModal('confirmVisible', true);
                  handleModal('confirmAction', () =>
                    handleUpdate(row.id, 'approved')
                  );
                }}
                className="text-green-600 hover:text-green-800"
                title="Setujui"
              >
                <FiCheckSquare />
              </button>
              <button
                onClick={() => {
                  handleModal('confirmVisible', true);
                  handleModal('confirmAction', () =>
                    handleUpdate(row.id, 'rejected')
                  );
                }}
                className="text-red-600 hover:text-red-800"
                title="Tolak"
              >
                <CgCloseR />
              </button>
            </div>
          );
        }
        return null;
      },
      tdClassName: 'text-center',
    });
  }

  columns.push({
    key: 'actions',
    label: 'Aksi',
    render: (_: any, row: any) => (
      <div className="flex space-x-2 text-xl justify-center">
        <button
          onClick={() =>
            navigate(`/administration/${row.id}`, { state: { letter: row } })
          }
          className="	text-gray-600 hover:text-gray-800"
          title="Lihat"
        >
          <AiOutlineEye />
        </button>
        {role === 'warga' && row.status !== 'canceled' ? (
          <button
            onClick={() => {
              handleModal('confirmVisible', true);
              handleModal('confirmAction', () =>
                handleUpdate(row.id, 'canceled')
              );
            }}
            className="text-red-600 hover:text-red-800"
            title="Cancel"
          >
            <TbMailCancel />
          </button>
        ) : role !== 'warga' ? (
          <button
            onClick={() => {
              handleModal('confirmVisible', true);
              handleModal('confirmAction', async () => {
                handleModal('confirmVisible', false);
                try {
                  await deleteLetter(row.id);
                  handleModal('notificationType', 'info');
                  handleModal(
                    'notificationMessage',
                    'Berhasil menghapus surat'
                  );
                  handleModal('notificationVisible', true);
                  fetchLetterRequest({ page: currentPage, order: 'desc' });
                } catch (error) {
                  console.error(error);
                  handleModal('notificationType', 'error');
                  handleModal('notificationMessage', 'Gagal menghapus surat');
                  handleModal('notificationVisible', true);
                }
              });
            }}
            className="text-red-600 hover:text-red-800"
            title="Hapus"
          >
            <MdDelete />
          </button>
        ) : null}
      </div>
    ),
    tdClassName: 'text-center',
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full gap-5 my-[20px]">
        <h1 className="text-header2 font-bold ">Pengajuan Surat</h1>
        <button
          onClick={() => navigate('/administration')}
          className="flex items-center gap-2 bg-blue-600 w-fit text-white py-2 px-6 rounded-md"
        >
          <span className="font-bold">Tambah</span> <FaPlus size={17} />
        </button>
        <PaginatedTable
          data={letterRequests}
          columns={columns}
          loading={loading}
          currentPage={pagination?.currentPage || 1}
          totalPages={pagination?.totalPages || 1}
          onPageChange={handlePageChange}
        />
      </div>

      <ConfirmActionModal
        onCancel={() => handleModal('confirmVisible', false)}
        onConfirm={modal.confirmAction}
        visible={modal.confirmVisible}
        confirmLabel="Lanjutkan"
        message="Apakah anda yakin ingin merubah status pengajuan?"
      />

      <NotificationModal
        message={modal.notificationMessage}
        onClose={() => handleModal('notificationVisible', false)}
        visible={modal.notificationVisible}
        title={modal.notificationType}
      />
    </DashboardLayout>
  );
};

export default LetterRequestDashboard;
