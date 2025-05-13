import ConfirmActionModal from '@/components/ConfirmActionModal';
import DashboardLayout from '@/components/DashboardLayout';
import ImageToBase64Input from '@/components/ImageToBase64Input';
import Loading from '@/components/Loading';
import NotificationModal from '@/components/NotificationModal';
import { updateUser } from '@/services/userService';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import { JwtPayload } from '@/types/jwtPayload';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

interface Modal {
  notificationVisible: boolean;
  notificationMessage: string;
  notificationType: 'error' | 'info';
  confirmVisible: boolean;
  confirmLabel: string;
  confirmMessage: string;
}

const SettingDashboard = () => {
  const {logout} = useAuthStore();
  const token = localStorage.getItem('token') || '';
  const { fetchUser, user } = useUserStore();
  const { role, userId } = jwtDecode(token) as JwtPayload;

  const [sign, setSign] = useState<string | null>(null);
  const [initialSign, setInitialSign] = useState<string | null>(null);

  const [modal, setModal] = useState<Modal>({
    confirmVisible: false,
    notificationMessage: '',
    notificationType: 'info',
    notificationVisible: false,
    confirmLabel: '',
    confirmMessage: '',
  });

  const handleModal = <K extends keyof Modal>(field: K, value: Modal[K]) => {
    setModal((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    handleModal('confirmVisible', false);

    if (!sign) {
      handleModal('notificationVisible', true);
      handleModal('notificationMessage', 'Tanda tangan tidak boleh kosong');
      handleModal('notificationType', 'error');
      return;
    }
    try {
      await updateUser(userId, {
        profile: {
          sign,
        },
      });

      handleModal('notificationVisible', true);
      handleModal(
        'notificationMessage',
        'Tanda tangan berhasil ditambah atau dirubah'
      );
      handleModal('notificationType', 'info');
    } catch (error) {
      console.error(error);
      handleModal('notificationVisible', true);
      handleModal(
        'notificationMessage',
        'Tanda tangan gagal ditambah atau dirubah'
      );
      handleModal('notificationType', 'error');
    }
  };

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  useEffect(() => {
    if (user) {
      setSign(user.profile?.sign || null);
      setInitialSign(user.profile?.sign || null);
    }
  }, [user]);

  return (
    <DashboardLayout>
      {!user ? (
        <div className="w-full h-[500px] flex justify-center items-center">
          <Loading isVisible />
        </div>
      ) : (
        <div className="flex flex-col w-full gap-5 my-[20px]">
          <h1 className="text-header2 font-bold ">Pengaturan</h1>
          {role === 'ketua' && (
            <div className="w-full border shadow-md rounded-lg flex flex-col gap-5 p-6 bg-white">
              <h2 className="text-header2 text-primary font-bold">
                Tanda Tangan Ketua RT
              </h2>
              <div className=" flex flex-col gap-6">
                <ImageToBase64Input onChange={(base64) => setSign(base64)} />
                <div className="w-full md:w-[300px] h-[300px] border rounded-md">
                  {sign && (
                    <img className="w-full h-full" src={sign} alt="sign" />
                  )}
                </div>
              </div>
              <button
                onClick={() => handleModal('confirmVisible', true)}
                className={`w-fit py-2 px-4 rounded-md text-white transition 
                  ${
                    !sign || sign === initialSign
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  }`}
                disabled={!sign || sign === initialSign}
              >
                Simpan Tanda Tangan
              </button>
            </div>
          )}
          <div className="w-full border bg-white rounded-lg shadow-md p-6 flex flex-col gap-5">
            <h2 className="text-header2 text-primary font-bold">Log out</h2>
            <button
              onClick={() => logout()}
            className="bg-red-600 w-fit py-2 px-4 rounded-md text-white">
              Log out
            </button>
          </div>
        </div>
      )}
      <ConfirmActionModal
        onCancel={() => handleModal('confirmVisible', false)}
        onConfirm={() => handleUpdate()}
        visible={modal.confirmVisible}
        confirmLabel="Lanjutkan"
        message="Apakah anda yakin ingin menambahkan/merubah Tanda tangan anda?"
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

export default SettingDashboard;
