import { Link, useNavigate } from 'react-router-dom';
import { useRegisterStore } from '@/stores/registerStore';
import { register } from '@/services/userService';
import { useState } from 'react';
import { RegisterProfileErrors, RegisterProfileInput } from '@/types/user';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { FaArrowLeft } from 'react-icons/fa';
import 'quill/dist/quill.snow.css';
import delay from '@/utils/helper/delay';
import LoadingScreen from '@/components/LoadingScreen';
import ProfileValidators from '@/utils/validators/ProfileValidators';
import NotificationModal from '@/components/NotificationModal';

const RegisterProfile = () => {
  const { account, setProfile, reset } = useRegisterStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [firstErrorMessage, setFirstErrorMessage] = useState('')
  const [notificationVisible, setNotificationVisible] = useState(false);

  const [profileData, setProfileData] = useState<RegisterProfileInput>({
    address: '',
    fullName: '',
    birthDate: '',
    birthPlace: '',
    meritalStatus: '',
    nationalId: '',
    occupation: '',
    phoneNumber: '',
    gender: 'male',
    nationality: '',
    religion: 'Islam'
  });

  const [errors, setErrors] = useState<RegisterProfileErrors>({});

  const handleInputProfile = (
    field: keyof RegisterProfileInput,
    value: string
  ) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const newError: RegisterProfileErrors = {
      address: ProfileValidators.validateAddress(profileData.address),
      fullName: ProfileValidators.validateFullName(profileData.fullName),
      birthDate: ProfileValidators.validateBirthDate(profileData.birthDate),
      meritalStatus: ProfileValidators.validateMaritalStatus(profileData.meritalStatus),
      nationalId: ProfileValidators.validateNationalId(profileData.nationalId),
      occupation: ProfileValidators.validateOccupation(profileData.occupation),
      phoneNumber: ProfileValidators.validatePhoneNumber(profileData.phoneNumber),
      gender: ProfileValidators.validateGender(profileData.gender),
      nationality: ProfileValidators.validateNationality(profileData.nationality),
      religion: ProfileValidators.validateReligion(profileData.religion),
    };
    
    setErrors(newError);
    
    const firstErrorMessage = Object.values(newError).find(message => message !== null) ?? '';
    const hasError = Object.values(newError).some((error) => error !== null);

    setFirstErrorMessage(firstErrorMessage)
    
    if (firstErrorMessage) {
      setNotificationVisible(true)
    }

    if (hasError) return;
    if (!account) return;

    setProfile(profileData);

    const finalData = {
      ...account,
      profile: profileData,
    };

    try {
      setLoading(true);

      await Promise.all([
        await register(finalData),
        delay(3000)
      ]);

      reset();
      navigate('/login');
    } catch (error) {
      setLoading(false)
      console.error('Gagal registrasi:', error);
    }
  };

  return (
    <>
      <LoadingScreen isVisible={loading} />
      {!loading && (
        <div className=" flex h-screen justify-center items-center">
          <div className="my-6 shadow-lg border-2 border-primary w-[90%] max-w-[400px] sm:min-w-[640px] sm:max-w-[800px] rounded-md p-4 flex flex-col gap-5 justify-center">
            <h1 className="text-center font-bold text-primary text-normal sm:text-header2">
              Registrasi Sistem Informasi RT
            </h1>
            <div className="flex flex-wrap sm:flex-nowrap justify-center items-start gap-3 sm:gap-6">
              <div className="flex flex-wrap justify-center flex-col w-full gap-3">
                <Input
                  id="fullName"
                  label="Nama Lengkap"
                  placeholder="Nama Lengkap"
                  value={profileData.fullName}
                  onChange={(val) => {
                    handleInputProfile('fullName', val);
                    setErrors((prev) => ({ ...prev, fullName: ProfileValidators.validateFullName(val) }));
                  }}
                  error={errors.fullName}
                  onValidate={(val) => {
                    setErrors((prev) => ({ ...prev, fullName: ProfileValidators.validateFullName(val) }));
                  }}
                />

                <Input
                  id="address"
                  label="Alamat"
                  placeholder="Alamat"
                  value={profileData.address}
                  onChange={(val) => {
                    handleInputProfile('address', val);
                    setErrors((prev) => ({ ...prev, address: ProfileValidators.validateAddress(val)}));
                  }}
                  error={errors.address}
                  onValidate={(val) => {
                    setErrors((prev) => ({ ...prev, address: ProfileValidators.validateAddress(val)}));
                  }}
                />

                <Input
                  id="birthDate"
                  label="Tanggal Lahir"
                  placeholder=""
                  type="date"
                  value={profileData.birthDate}
                  onChange={(val) => {
                    handleInputProfile('birthDate', val);
                    setErrors((prev) => ({ ...prev, birthDate: ProfileValidators.validateBirthDate(val) }));
                  }}
                  error={errors.birthDate}
                  onValidate={(val) => {
                    setErrors((prev) => ({ ...prev, birthDate: ProfileValidators.validateBirthDate(val)}));
                  }}
                />

                <Input
                  id="birthPlace"
                  label="Tempat Lahir"
                  placeholder="Tempat Lahir"
                  value={profileData.birthPlace}
                  onChange={(val) => {
                    handleInputProfile('birthPlace', val);
                    setErrors((prev) => ({ ...prev, birthPlcae: ProfileValidators.validateBirthPlace(val) }));
                  }}
                  error={errors.birthPlace}
                  onValidate={(val) => {
                    setErrors((prev) => ({ ...prev, birthPlace: ProfileValidators.validateBirthPlace(val)}));
                  }}
                />

                <Select
                  id="meritalStatus"
                  label="Status Pernikahan"
                  value={profileData.meritalStatus}
                  onChange={(val) => {
                    handleInputProfile('meritalStatus', val);
                    setErrors((prev) => ({ ...prev, meritalStatus: ProfileValidators.validateMaritalStatus(val) }));
                  }}
                  error={errors.meritalStatus}
                  options={[
                    { value: 'belum menikah', label: 'Belum Menikah' },
                    { value: 'sudah menikah', label: 'Sudah Menikah' },
                  ]}
                  onValidate={(val) => {
                    setErrors((prev) => ({ ...prev, meritalStatus: ProfileValidators.validateMaritalStatus(val) }));
                  }}
                />

                <Input
                  id="nationality"
                  label="Kewarganegaraan"
                  placeholder="Kewarganegaraan"
                  type="text"
                  value={profileData.nationality}
                  onChange={(val) => {
                    handleInputProfile('nationality', val);
                    setErrors((prev) => ({ ...prev, nationality: ProfileValidators.validateNationality(val) }));
                  }}
                  error={errors.nationality}
                  onValidate={(val) => {
                    setErrors((prev) => ({ ...prev, nationality: ProfileValidators.validateNationality(val)}));
                  }}
                />
              </div>

              <div className="flex flex-wrap justify-center flex-col w-full gap-3">
                
                <Select
                  id="gender"
                  label="Jenis Kelamin"
                  value={profileData.gender}
                  onChange={(val) => {
                    handleInputProfile('gender', val);
                    setErrors((prev) => ({ ...prev, gender: ProfileValidators.validateGender(val) }));
                  }}
                  error={errors.gender}
                  options={[
                    { value: 'male', label: 'Laki-laki' },
                    { value: 'female', label: 'Perempuan' },
                  ]}
                  onValidate={(val) => {
                    setErrors((prev) => ({ ...prev, gender: ProfileValidators.validateGender(val) }));
                  }}
                />

                <Select
                  id="religion"
                  label="Jenis Kelamin"
                  value={profileData.religion}
                  onChange={(val) => {
                    handleInputProfile('religion', val);
                    setErrors((prev) => ({ ...prev, religion: ProfileValidators.validateReligion(val) }));
                  }}
                  error={errors.religion}
                  options={[
                    { value: 'Islam', label: 'Islam' },
                    { value: 'Kristen', label: 'Kristen' },
                    { value: 'Katolik', label: 'Katolik' },
                    { value: 'Hindu', label: 'Hindu' },
                    { value: 'Buddha', label: 'Buddha' },
                    { value: 'Konghucu', label: 'Konghucu' },
                  ]}
                  onValidate={(val) => {
                    setErrors((prev) => ({ ...prev, religion: ProfileValidators.validateReligion(val) }));
                  }}
                />

                <Input
                  id="phoneNumber"
                  label="Nomor HP"
                  placeholder="Nomor HP"
                  type="text"
                  value={profileData.phoneNumber}
                  onChange={(val) => {
                    if (/^\d*$/.test(val)) {
                      handleInputProfile('phoneNumber', val);
                    }
                    setErrors((prev) => ({ ...prev, phoneNumber: ProfileValidators.validatePhoneNumber(val) }));
                  }}
                  error={errors.phoneNumber}
                  onValidate={(val) => {
                    setErrors((prev) => ({ ...prev, phoneNumber: ProfileValidators.validatePhoneNumber(val)  }));
                  }}
                />

                <Input
                  id="nationalId"
                  label="NIK"
                  placeholder="NIK"
                  type="text"
                  value={profileData.nationalId}
                  onChange={(val) => {
                    if (/^\d*$/.test(val)) {
                      handleInputProfile('nationalId', val);
                    }
                    setErrors((prev) => ({ ...prev, nationalId: ProfileValidators.validateNationalId(val) }));
                  }}
                  error={errors.nationalId}
                  onValidate={(val) => {
                    setErrors((prev) => ({ ...prev, nationalId: ProfileValidators.validateNationalId(val) }));
                  }}
                />
                
                <Input
                  id="occupation"
                  label="Pekerjaan"
                  placeholder="Pekerjaan"
                  type="text"
                  value={profileData.occupation}
                  onChange={(val) => {
                    handleInputProfile('occupation', val);
                    setErrors((prev) => ({ ...prev, occupation: ProfileValidators.validateOccupation(val) }));
                  }}
                  error={errors.occupation}
                  onValidate={(val) => {
                    setErrors((prev) => ({ ...prev, occupation: ProfileValidators.validateOccupation(val) }));
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <button
                className="p-2 text-normal tracking-wide font-bold text-white rounded-md bg-primary active:bg-[#428a5a] active:text-white w-full min-w-[130px] max-w-[200px] self-center"
                onClick={handleSubmit}
              >
                Daftar
              </button>

              <Link
                to={'/register/account'}
                className="flex gap-1 justify-center"
              >
                <FaArrowLeft className="text-slate-400" size={20} />
                <span className="text-slate-500 inline-block">Sebelumnya</span>
              </Link>
            </div>
          </div>
          <NotificationModal 
            message={firstErrorMessage}
            onClose={() => setNotificationVisible(false)}
            visible={notificationVisible}
            type='error'
          />
        </div>
      )}
    </>
  );
};

export default RegisterProfile;
