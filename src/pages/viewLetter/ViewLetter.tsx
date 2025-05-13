/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import LetterTemplate from '@/components/LetterTemplate';
import Preview from '@/components/Preview';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/types/jwtPayload';
import { useLetterRequestStore } from '@/stores/letterRequestStore';
import { useUserStore } from '@/stores/userStore';
import LetterAction from '@/components/LetterAction';
import ConfirmActionModal from '@/components/ConfirmActionModal';
import NotificationModal from '@/components/NotificationModal';
import LoadingScreen from '@/components/LoadingScreen';
import formatDate from '@/utils/formatters/dateTime';
import { PDFDownloadLink } from '@react-pdf/renderer';

interface Modal {
  notificationVisible: boolean;
  confirmVisible: boolean;
  notificationMessage: string;
  notificationType: 'error' | 'success';
}

const ViewLetter = () => {
  const { fetchLetterById, letterRequest, createLetterRequest } =useLetterRequestStore();
  const { fetchUser, user } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { id: letterIdParam } = useParams();
  const letterId = letterIdParam || '';
  const isSubmission = location.pathname.split('/')[2] === 'submission';
  const letterType = location.pathname.split('/')[3]?.toUpperCase() || '';

let letterTitle = '';
let letterReason = '';

switch (letterType) {
  case 'KK':
    letterTitle = 'Surat Pengantar Kartu Keluarga';
    letterReason = 'Mengajukan permohonan pembuatan Kartu Keluarga (KK) baru sebagai kelengkapan administrasi kependudukan sesuai peraturan yang berlaku.';
    break;
  case 'KTP':
    letterTitle = 'Surat Pengantar Kartu Tanda Penduduk';
    letterReason = 'Mengajukan permohonan pembuatan Kartu Tanda Penduduk (KTP) baru sebagai kelengkapan administrasi kependudukan sesuai peraturan yang berlaku.';
    break;
  case 'SKD':
    letterTitle = 'Surat Keterangan Domisili';
    letterReason = 'Mengajukan permohonan penerbitan Surat Keterangan Domisili (SKD) sebagai kelengkapan administrasi yang dibutuhkan.';
    break;
  default:
    letterTitle = `Surat Pengantar ${letterType}`;
    letterReason = `Mengajukan permohonan pembuatan ${letterType} baru sebagai kelengkapan administrasi kependudukan sesuai peraturan yang berlaku.`;
    break;
}

const newLetterData = {
  letterType: letterTitle,
  reason: letterReason,
};

  const [modal, setModal] = useState<Modal>({
    confirmVisible: false,
    notificationVisible: false,
    notificationMessage: '',
    notificationType: 'success',
  });
  const handleModal = <K extends keyof Modal>(field: K, value: Modal[K]) => {
    setModal((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [letterData, setLetterData] = useState<any>(null);

  const token = localStorage.getItem('token') || '';
  let role: 'warga' | 'ketua' | 'admin' = 'warga';
  let userId = '';

  try {
    const decoded = jwtDecode(token) as JwtPayload;
    role = decoded.role;
    userId = decoded.userId;
  } catch (err) {
    console.error('Token decode failed:', err);
  }

  const mapLetterData = (letter: any) => {
    if (!letter?.user?.profile) return null;

    return {
      letterType: letter.letterType || newLetterData.letterType,
      fullName: letter.user.profile.fullName,
      address: letter.user.profile.address,
      birthDate: letter.user.profile.birthDate,
      birthPlace: letter.user.profile.birthPlace,
      gender: letter.user.profile.gender,
      religion: letter.user.profile.religion,
      meritalStatus: letter.user.profile.meritalStatus,
      occupation: letter.user.profile.occupation,
      reason: letter.reason || newLetterData.reason,
      letterNumber: letter.letterNumber,
      submissionDate: letter.submissionDate || new Date(),
      nationalId: letter.user.profile.nationalId,
      nationality: letter.user.profile.nationality,
      status: letter.status || '-',
      sign: letter.signed || '',
    };
  };

  useEffect(() => {
    if (isSubmission && userId) {
      fetchUser(userId);
    } else if (!isSubmission && letterId) {
      fetchLetterById(letterId);
    }
  }, [isSubmission, fetchUser, fetchLetterById, letterId, userId]);

  useEffect(() => {
    if (isSubmission && user && user.profile) {
      const mapped = mapLetterData({
        user: { profile: user.profile },
        reason: '',
        letterNumber: '',
        submissionDate: '',
      });
      setLetterData(mapped);
    }
  }, [isSubmission, user]);

  const memoizedLetter = useMemo(() => {
    if (!isSubmission && letterRequest) {
      return mapLetterData(letterRequest);
    }
    return null;
  }, [isSubmission, letterRequest]);

  const letter = isSubmission ? letterData : memoizedLetter;

  if (!letter && !user) {
    return <LoadingScreen isVisible={!letter} />;
  }

  const handleSubmit = async () => {
    handleModal('confirmVisible', false);

    try {
      
      handleModal(
        'notificationMessage',
        'Surat berhasil diajukan, hubungi pengurus untuk informasi lebih lanjut'
      );handleModal('notificationType', 'success');
      await createLetterRequest(newLetterData);
      handleModal('notificationVisible', true);
      
    } catch (error) {
      console.error(error);
      handleModal(
        'notificationMessage',
        'Surat Gagal diajukan, hubungi pengurus untuk informasi lebih lanjut'
      );
      handleModal('notificationType', 'error');
    }
  };

  if (!letter) {
    return <LoadingScreen isVisible={true} />;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <div className="w-full px-4 lg:w-[1100px] min-h-screen my-[50px] flex flex-col lg:flex-row gap-4">
        <div className=" w-full lg:w-[40%] h-fit p-4 md:p-6 bg-white rounded-lg flex flex-col gap-4 overflow-auto border shadow-md my-4">
          <h1 className="text-header text-center text-primary font-bold mb-4 ">
            Tinjau Surat
          </h1>
          <div className="border shadow-md p-4 rounded-md">
            <h2 className="text-header3 font-bold text-primary text-center mb-4">
              Detail Pengajuan
            </h2>
            <div className="mb-2">
              <h3 className="font-bold text-header4 text-gray-400">
                Tipe Surat
              </h3>
              <p className="text-normal">{letter?.letterType || '-'}</p>
            </div>
            <div className="mb-2">
              <h3 className="font-bold text-header4 text-gray-400">
                Diajukan Oleh
              </h3>
              <p className="text-normal">{letter.fullName}</p>
            </div>
            <div className="mb-2">
              <h3 className="font-bold text-header4 text-gray-400">
                Tanggal Pengajuan
              </h3>
              <p className="text-normal">{formatDate(letter.submissionDate)}</p>
            </div>
            <div className="mb-2">
              <h3 className="font-bold text-header4 text-gray-400">
                Status Pengajuan
              </h3>
              <p
                className={`
                  text-normal py-[3px] px-4 rounded-md text-white w-fit
                  ${
                    letter.status === 'pending'
                      ? 'bg-yellow-400'
                      : letter.status === 'process'
                      ? 'bg-blue-500'
                      : letter.status === 'approved'
                      ? 'bg-emerald-600'
                      : letter.status === 'rejected'
                      ? 'bg-red-500'
                      : letter.status === 'canceled'
                      ? 'bg-gray-400'
                      : 'bg-gray-200'
                  }
                `}
              >
                {letter.status === 'pending'
                  ? 'Menunggu'
                  : letter.status === 'approved'
                  ? 'Disetujui'
                  : letter.status === 'rejected'
                  ? 'Ditolak'
                  : letter.status === 'process'
                  ? 'Diproses'
                  : letter.status === 'canceled'
                  ? 'Dibatalkan'
                  : 'Belum diajukan'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-bold text-header4 text-gray-400">
                Alasan Pengajuan
              </h3>
              <p className="text-normal">{letter.reason}</p>
            </div>
          </div>

          {isSubmission ? (
            <LetterAction
              isSubmission={isSubmission}
              handleSubmit={() => handleModal('confirmVisible', true)}
              role={role}
            />
          ) : null}

          {letter.status === 'approved' ? (
            <div className="p-4 rounded-md shadow-lg border">
              <h2 className="text-header3 font-bold text-primary text-center mb-4">
                Unduh Surat
              </h2>
              <div className="flex w-full justify-center">
                {letter && (
                  <PDFDownloadLink
                    document={<LetterTemplate letter={letter} />}
                    fileName={`surat-${letter.letterType
                      ?.toLowerCase()
                      .replace(/\s+/g, '-')}.pdf`}
                    className="mt-2 text-center px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    {({ loading }) =>
                      loading ? 'Menyiapkan PDF...' : 'Unduh Surat'
                    }
                  </PDFDownloadLink>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <div className="w-full lg:w-[60%] h-[300px] md:h-[750px] border my-4 rounded-lg shadow-md flex items-center justify-center p-4">
          <div className="w-full h-full">
            <Preview>
              {letter ? (
                <LetterTemplate letter={letter} />
              ) : (
                <div className="text-center text-gray-400">Memuat surat...</div>
              )}
            </Preview>
          </div>
        </div>
      </div>

      <ConfirmActionModal
        onCancel={() => handleModal('confirmVisible', false)}
        onConfirm={() => handleSubmit()}
        visible={modal.confirmVisible}
        message="Apakah data sudah sesuai dan ingin mengajukan surat?"
        confirmLabel="Ajukan"
        title="Konfirmasi Pengajuan"
      />

      <NotificationModal
        message={modal.notificationMessage}
        onClose={() => {
          handleModal('notificationVisible', false)
          
          if(modal.notificationType === 'success') {
            navigate('/dashboard/administration')
        }}
        }
        visible={modal.notificationVisible}
        type={modal.notificationType}
      />
      <Footer />
    </div>
  );
};

export default ViewLetter;
