/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardLayout from '@/components/DashboardLayout';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import { updateUser, verifyUser } from '@/services/userService';
import { ProfileDetailErrors, User } from '@/types/user';
import dateTimeFormatter from '@/utils/formatters/dateTimeFormatter';
import { useEffect, useState } from 'react';
import { RxPerson } from 'react-icons/rx';
import { TiEdit } from 'react-icons/ti';
import { useLocation } from 'react-router-dom';
import Select from '@/components/Select';
import { MdSaveAlt } from 'react-icons/md';
import ProfileValidators from '@/utils/validators/ProfileValidators';
import AccountValidators from '@/utils/validators/AccountValidators';
import ConfirmActionModal from '@/components/ConfirmActionModal';
import formatBirthDate from '@/utils/formatters/formatBirthDate';
import NotificationModal from '@/components/NotificationModal';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/types/jwtPayload';

type Notification = {
  message: string;
  type: 'info' | 'error';
  notificationVisible: boolean;
  confirmVisible: boolean;
};

const ProfileDetail = () => {
  const location = useLocation();
  const token = localStorage.getItem('token') || '';
  const { role } = jwtDecode(token) as JwtPayload;

  const userState = location.state?.user || null;
  const initialMode = location.state?.mode || null;

  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [user, setUser] = useState<Partial<User>>({});
  const [error, setError] = useState<ProfileDetailErrors>({});
  const [modal, setModal] = useState<Notification>({
    message: '',
    type: '' as 'info' | 'error',
    confirmVisible: false,
    notificationVisible: false,
  });

  const handleModal = (
    field: keyof Notification,
    value: Notification[keyof Notification]
  ) => {
    setModal((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const newError: ProfileDetailErrors = {
    address: ProfileValidators.validateAddress(user.profile?.address || ''),
    fullName: ProfileValidators.validateFullName(user.profile?.fullName || ''),
    birthDate: ProfileValidators.validateBirthDate(
      user.profile?.birthDate || ''
    ),
    birthPlace: ProfileValidators.validateBirthPlace(
      user.profile?.birthPlace || ''
    ),
    meritalStatus: ProfileValidators.validateMaritalStatus(
      user.profile?.meritalStatus || ''
    ),
    nationalId: ProfileValidators.validateNationalId(
      user.profile?.nationalId || ''
    ),
    occupation: ProfileValidators.validateOccupation(
      user.profile?.occupation || ''
    ),
    phoneNumber: ProfileValidators.validatePhoneNumber(
      user.profile?.phoneNumber || ''
    ),
    gender: ProfileValidators.validateGender(user.profile?.gender || ''),
    nationality: ProfileValidators.validateNationality(
      user.profile?.nationality || ''
    ),
    religion: ProfileValidators.validateReligion(user.profile?.religion || ''),
    email: AccountValidators.validateEmail(user.email || ''),
    username: AccountValidators.validateUsername(user.username || ''),
    role: AccountValidators.validateRole(user.role || ''),
  };

  const errorDetect = (field: keyof ProfileDetailErrors) => {
    setError((prev) => ({
      ...prev,
      [field]: newError[field],
    }));
  };

  const handleInput = (field: string, value: any) => {
    setUser((prev) => {
      const keys = field.split('.');
      const updated = { ...prev };
      let current: any = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      current[keys.at(-1)!] = value;
      return updated;
    });
  };

  useEffect(() => {
    setLoading(true);
    setMode('view');

    if (initialMode !== null) {
      setMode(initialMode);
    }

    const fetchUser = async () => {
      try {
        if (userState) {
          setUser(userState);
          setLoading(false);
        } else {
          const token = localStorage.getItem('token') || '';
          if (!token) throw new Error('No token found');
          const data = await verifyUser(token);
          const fetchedUser = data?.data?.users?.[0];
          setLoading(false);

          if (fetchedUser) {
            setUser(fetchedUser);
          } else {
            console.warn('No user data found from token.');
          }
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [location.pathname]);

  const handleEdit = () => {
    setMode('edit');
  };

  const handleSave = () => {
    console.log(error);

    if (Object.values(error).every((value) => value === null)) {
      handleModal('confirmVisible', true);
    }
  };

  const handleUpdate = async () => {
    handleModal('confirmVisible', false);
    setLoading(true);
    try {
      const id = user.id;
      if (!id) throw new Error('User ID is missing');

      if (!user) {
        throw new Error('User Data is Missing');
      }

      console.log('running');

      await updateUser(id, user);
      setMode('view');
      setLoading(false);
      handleModal('notificationVisible', true);
      handleModal('type', 'info');
      handleModal('message', 'Berhasil memperbarui profile user');
    } catch (error: any) {
      setLoading(false);
      handleModal('notificationVisible', true);
      handleModal('type', 'error');
      handleModal(
        'message',
        `Gagal memperbarui profile user: ${error.response.data.message}`
      );
      console.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full gap-5 my-[20px]">
        {loading && (
          <div className="w-full h-[500px] flex justify-center items-center">
            <Loading isVisible={loading} />
          </div>
        )}

        {!loading && (
          <>
            <div className="w-full flex gap-[20px] flex-col md:flex-row md:justify-between">
              <h1 className="text-header2 font-bold ">Profil Pengguna</h1>
              {mode === 'edit' ? (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 bg-primary w-fit text-white py-2 px-6 justify-center rounded-md"
                >
                  <span>Simpan</span>
                  <MdSaveAlt className="mb-1" size={20} />
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-1 bg-blue-600 w-fit text-white py-2 px-6 justify-center rounded-md"
                >
                  <span>Edit</span>
                  <TiEdit className="mb-1" size={20} />
                </button>
              )}
            </div>

            <div className="p-6 w-full bg-white shadow-md border rounded-md flex flex-col md:flex-row items-center gap-5 justify-start">
              <div className="bg-gray-300 shadow-sm w-[70px] h-[70px] rounded-full flex justify-center items-center">
                <RxPerson size={50} className="text-gray-800" />
              </div>
              <div className="text-center md:text-start">
                <h2 className="text-header2 font-bold mb-2">
                  {user.profile?.fullName}
                </h2>
                <div className="flex flex-col md:flex-row gap-1 md:gap-3 items-center">
                  <h4>{user.username}</h4>
                  <span className="hidden md:block">|</span>
                  <h4>{user.role}</h4>
                  <span className="hidden md:block">|</span>
                  <h4>{user.email}</h4>
                </div>
              </div>
            </div>
            {/* <h1 className="text-header2 font-bold ">Profile User</h1> */}
            <div className="w-full h-fit bg-white shadow-md rounded-md p-6 border flex flex-col md:flex-row justify-start gap-5 md:gap-x-[50px] flex-wrap">
              <div className="w-full md:w-fit md:min-w-[300px] flex flex-col gap-5">
                <Input
                  id="fullName"
                  label="Nama Lengkap"
                  onChange={(value) => {
                    handleInput('profile.fullName', value);
                    errorDetect('fullName');
                  }}
                  onValidate={() => errorDetect('fullName')}
                  placeholder="Nama Lengkap"
                  value={user.profile?.fullName || ''}
                  labelClassName="font-normal text-gray-400 text-normal"
                  mode={mode}
                  viewClassName="text-normal"
                  error={error.fullName}
                />

                <Input
                  id="email"
                  label="Email"
                  onChange={(value) => {
                    handleInput('email', value);
                    errorDetect('email');
                  }}
                  onValidate={() => errorDetect('email')}
                  placeholder="Email"
                  value={user.email || ''}
                  labelClassName="font-normal text-gray-400 text-normal"
                  mode={mode}
                  viewClassName="text-normal"
                  error={error.email}
                />

                <Input
                  id="birthDate"
                  label="Tanggal Lahir"
                  type="date"
                  onChange={(value) => {
                    handleInput('profile.birthDate', value);
                    errorDetect('birthDate');
                  }}
                  onValidate={() => errorDetect('birthDate')}
                  placeholder="Tanggal Lahir"
                  value={
                    mode === 'edit'
                      ? formatBirthDate(user.profile?.birthDate || '') ||
                        user.profile?.birthDate ||
                        ''
                      : dateTimeFormatter(user.profile?.birthDate || Date())
                  }
                  labelClassName="font-normal text-gray-400 text-normal"
                  mode={mode}
                  viewClassName="text-normal"
                  error={error.birthDate}
                />

                <Input
                  id="birthPlace"
                  label="Tempat Lahir"
                  onChange={(value) => {
                    handleInput('profile.birthPlace', value);
                    errorDetect('birthPlace');
                  }}
                  onValidate={() => errorDetect('birthPlace')}
                  placeholder="Kewarganegaraan"
                  value={user.profile?.birthPlace || ''}
                  labelClassName="font-normal text-gray-400 text-normal"
                  mode={mode ? mode : 'view'}
                  viewClassName="text-normal"
                  error={error.birthPlace}
                />

                {mode === 'view' ? (
                  <Input
                    id="maritalStatus"
                    label="Status Pernikahan"
                    onChange={(value) =>
                      handleInput('profile.meritalStatus', value)
                    }
                    placeholder="Status Pernikahan"
                    value={user.profile?.meritalStatus || ''}
                    labelClassName="font-normal text-gray-400 text-normal"
                    mode={mode ? mode : 'view'}
                    viewClassName="text-normal"
                  />
                ) : (
                  <Select
                    id="meritalStatus"
                    label="Status Pernikahan"
                    labelClassName='text-gray-400'
                    value={user.profile?.meritalStatus || ''}
                    onChange={(value) => {
                      handleInput('profile.meritalStatus', value);
                      errorDetect('meritalStatus');
                    }}
                    onValidate={() => errorDetect('meritalStatus')}
                    options={[
                      { value: 'belum menikah', label: 'Belum Menikah' },
                      { value: 'sudah menikah', label: 'Sudah Menikah' },
                    ]}
                    error={error.meritalStatus}
                  />
                )}
                <Input
                  id="address"
                  label="Alamat"
                  onChange={(value) => {
                    handleInput('profile.address', value);
                    errorDetect('address');
                  }}
                  onValidate={() => errorDetect('address')}
                  placeholder="Alamat"
                  value={user.profile?.address || ''}
                  labelClassName="font-normal text-gray-400 text-normal"
                  mode={mode ? mode : 'view'}
                  viewClassName="text-normal max-w-[400px]"
                  error={error.address}
                />
              </div>
              <div className="w-full md:w-fit min-w-[300px] flex flex-col gap-5">
                <Input
                  id="nationality"
                  label="Kewarganegaraan"
                  onChange={(value) => {
                    handleInput('nationality', value);
                    errorDetect('nationality');
                  }}
                  onValidate={() => errorDetect('nationality')}
                  placeholder="nationality"
                  value={user.profile?.nationality || ''}
                  labelClassName="font-normal text-gray-400 text-normal"
                  mode={mode ? mode : 'view'}
                  viewClassName="text-normal"
                  error={error.nationality}
                />
                {mode === 'view' ? (
                  <Input
                    id="gender"
                    label="Gender"
                    onChange={(value) => handleInput('profile.gender', value)}
                    placeholder="Gender"
                    value={user.profile?.gender || ''}
                    labelClassName="font-normal text-gray-400 text-normal"
                    mode={mode ? mode : 'view'}
                    viewClassName="text-normal"
                  />
                ) : (
                  <Select
                    id="gender"
                    label="Jenis Kelamin"
                    labelClassName='text-gray-400'
                    value={user.profile?.gender || ''}
                    onChange={(val) => {
                      handleInput('profile.gender', val);
                      errorDetect('gender');
                    }}
                    onValidate={() => errorDetect('gender')}
                    options={[
                      { value: 'male', label: 'Laki-laki' },
                      { value: 'female', label: 'Perempuan' },
                    ]}
                    error={error.gender}
                  />
                )}

                {mode === 'view' ? (
                  <Input
                    id="religion"
                    label="Agama"
                    onChange={(value) => handleInput('profile.religion', value)}
                    placeholder="Agama"
                    value={user.profile?.religion || ''}
                    labelClassName="font-normal text-gray-400 text-normal"
                    mode={mode ? mode : 'view'}
                    viewClassName="text-normal"
                  />
                ) : (
                  <Select
                    id="religion"
                    label="Agama"
                    labelClassName='text-gray-400'
                    value={user.profile?.religion || ''}
                    onChange={(val) => {
                      handleInput('profile.religion', val);
                      errorDetect('religion');
                    }}
                    onValidate={() => errorDetect('religion')}
                    options={[
                      { value: 'Islam', label: 'Islam' },
                      { value: 'Kristen', label: 'Kristen' },
                      { value: 'Katolik', label: 'Katolik' },
                      { value: 'Hindu', label: 'Hindu' },
                      { value: 'Buddha', label: 'Buddha' },
                      { value: 'Konghucu', label: 'Konghucu' },
                    ]}
                    error={error.religion}
                  />
                )}
                <Input
                  id="nationalId"
                  label="NIK"
                  onChange={(value) => {
                    handleInput('profile.nationalId', value);
                    errorDetect('nationalId');
                  }}
                  onValidate={() => errorDetect('nationalId')}
                  placeholder="NIK"
                  value={user.profile?.nationalId || ''}
                  labelClassName="font-normal text-gray-400 text-normal"
                  mode={mode}
                  viewClassName="text-normal"
                  error={error.nationalId}
                />
                <Input
                  id="phoneNumber"
                  label="No. HP"
                  onChange={(value) => {
                    handleInput('profile.phoneNumber', value);
                    errorDetect('phoneNumber');
                  }}
                  onValidate={() => errorDetect('phoneNumber')}
                  placeholder="No. HP"
                  value={user.profile?.phoneNumber || ''}
                  labelClassName="font-normal text-gray-400 text-normal"
                  mode={mode}
                  viewClassName="text-normal"
                  error={error.phoneNumber}
                />
                <Input
                  id="occupation"
                  label="Pekerjaan"
                  onChange={(value) => {
                    handleInput('profile.occupation', value);
                    errorDetect('occupation');
                  }}
                  onValidate={() => errorDetect('occupation')}
                  placeholder="Pekerjaan"
                  value={user.profile?.occupation || ''}
                  labelClassName="font-normal text-gray-400 text-normal"
                  mode={mode ? mode : 'view'}
                  viewClassName="text-normal max-w-[400px]"
                  error={error.occupation}
                />
              </div>
              <div className="w-full md:w-fit min-w-[300px] flex flex-col gap-5">
                <Input
                  id="username"
                  label="Username"
                  onChange={(value) => {
                    handleInput('username', value);
                    errorDetect('username');
                  }}
                  onValidate={() => errorDetect('username')}
                  placeholder="Username"
                  value={user.username || ''}
                  labelClassName="font-normal text-gray-400 text-normal"
                  mode={mode ? mode : 'view'}
                  viewClassName="text-normal"
                  error={error.username}
                />
                {mode === 'edit' && role === 'ketua' ? (
                  <Select
                    id="role"
                    label="Posisi" 
                    labelClassName='text-gray-400'
                    value={user.role || ''}
                    onChange={(val) => {
                      handleInput('role', val);
                      errorDetect('role');
                    }}
                    onValidate={() => errorDetect('role')}
                    options={[
                      { value: 'warga', label: 'Warga' },
                      { value: 'ketua', label: 'Ketua' },
                      { value: 'admin', label: 'Admin' },
                    ]}
                    error={error.religion}
                  />
                ) : (
                  <Input
                    id="role"
                    label="Posisi"
                    onChange={(value) => {
                      handleInput('role', value);
                      errorDetect('role');
                    }}
                    onValidate={() => errorDetect('role')}
                    placeholder="Posisi"
                    value={user.role || ''}
                    mode="view"
                    labelClassName="font-normal text-gray-400 text-normal"
                    viewClassName="text-normal max-w-[400px]"
                    error={error.role}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <ConfirmActionModal
        visible={modal.confirmVisible}
        onCancel={() => handleModal('confirmVisible', false)}
        onConfirm={() => handleUpdate()}
        confirmLabel="Konfirmasi"
        message="Apakah sudah yakin dengan perubahan datanya?"
      />
      <NotificationModal
        type={modal.type}
        onClose={() => handleModal('notificationVisible', false)}
        visible={modal.notificationVisible}
        message={modal.message}
      />
    </DashboardLayout>
  );
};

export default ProfileDetail;
