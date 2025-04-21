import { useNavigate } from 'react-router-dom';
import { useRegisterStore } from '@/stores/registerStore';
import { register } from '@/services/userService';
import { useState } from 'react';
import { RegisterProfileErrors, RegisterProfileInput } from '@/types/user';
import ProfileValidator from '@/utils/validations/profileValidation';
import Input from '@/components/Input';
import Select from '@/components/Select';

const RegisterProfile = () => {
  const { account, setProfile, reset } = useRegisterStore();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<RegisterProfileInput>({
    address: '',
    fullName: '',
    birthDate: '',
    meritalStatus: '',
    nationalId: '',
    occupation: '',
    phoneNumber: '',
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
    const newError = {
      address: ProfileValidator.validateAddress(profileData.address),
      fullName: ProfileValidator.validateFullName(profileData.fullName),
      birthDate: ProfileValidator.validateBirthDate(profileData.birthDate),
      meritalStatus: ProfileValidator.validateMaritalStatus(profileData.meritalStatus),
      nationalId: ProfileValidator.validateNationalId(profileData.nationalId),
      occupation: ProfileValidator.validateOccupation(profileData.occupation),
      phoneNumber: ProfileValidator.validatePhoneNumber(profileData.phoneNumber),
    };

    setErrors(newError);
    
    const hasError = Object.values(newError).some((error) => error !== null);

    if (hasError) return;
    if (!account) return;

    setProfile(profileData);

    const finalData = {
      ...account,
      profile: profileData,
    };

    console.log(profileData);
    
    try {
      await register(finalData);
      reset();
      navigate('/login');
    } catch (error) {
      console.error('Gagal registrasi:', error);
    }
  };

  return (
    <div className="h-fit flex justify-center items-center py-6">
      <div className="border-2 border-slate-400 w-[90%] sm:w-[400px] rounded-md p-5 flex flex-col gap-5 justify-center">
        <h1 className="text-center font-bold md:text-lg">
          Registrasi Sistem Informasi RT
        </h1>
        <div className="flex flex-col gap-3">
          <Input
            id="fullName"
            label="Nama Lengkap"
            placeholder="Nama Lengkap"
            value={profileData.fullName}
            onChange={(val) => {
              handleInputProfile('fullName', val)
              const err = ProfileValidator.validateFullName(val);
              setErrors((prev) => ({ ...prev, fullName: err }));
            }}
            error={errors.fullName}
            onValidate={(val) => {
              const err = ProfileValidator.validateFullName(val);
              setErrors((prev) => ({ ...prev, fullName: err }));
            }}
          />

          <Input
            id="address"
            label="Alamat"
            placeholder="Alamat"
            value={profileData.address}
            onChange={(val) => {
              handleInputProfile('address', val)
              const err = ProfileValidator.validateAddress(val);
              setErrors((prev) => ({ ...prev, address: err }));
            }}
            error={errors.address}
            onValidate={(val) => {
              const err = ProfileValidator.validateAddress(val);
              setErrors((prev) => ({ ...prev, address: err }));
            }}
          />

          <Input
            id="birthDate"
            label="Tanggal Lahir"
            placeholder=""
            type="date"
            value={profileData.birthDate}
            onChange={(val) => {
              handleInputProfile('birthDate', val)
              const err = ProfileValidator.validateBirthDate(val);
              setErrors((prev) => ({ ...prev, birthDate: err }));
            }}
            error={errors.birthDate}
            onValidate={(val) => {
              const err = ProfileValidator.validateBirthDate(val);
              setErrors((prev) => ({ ...prev, birthDate: err }));
            }}
          />

          <Select
            id='meritalStatus'
            label='Status Pernikahan'
            value={profileData.meritalStatus}
            onChange={(val) => {
              handleInputProfile('meritalStatus', val);
              const err = ProfileValidator.validateMaritalStatus(val);
              setErrors((prev) => ({...prev, meritalStatus: err}));
            }}
            error={errors.meritalStatus}
            options={[
              {value: "belum menikah", label: "Belum Menikah"},
              {value: "sudah menikah", label: "Sudah Menikah"}
            ]}
            
            onValidate={(val)=> {
              const err = ProfileValidator.validateMaritalStatus(val);
              setErrors((prev) => ({...prev, meritalStatus: err}));
            }}
          />

          <Input
            id="occupation"
            label="Pekerjaan"
            placeholder="Pekerjaan"
            type="text"
            value={profileData.occupation}
            onChange={(val) => {
              handleInputProfile('occupation', val)
              const err = ProfileValidator.validateOccupation(val);
              setErrors((prev) => ({ ...prev, occupation: err }));
            }}
            error={errors.occupation}
            onValidate={(val) => {
              const err = ProfileValidator.validateOccupation(val);
              setErrors((prev) => ({ ...prev, occupation: err }));
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
              const err = ProfileValidator.validatePhoneNumber(val);
              setErrors((prev) => ({ ...prev, phoneNumber: err }));
            }}
            error={errors.phoneNumber}
            onValidate={(val) => {
              const err = ProfileValidator.validatePhoneNumber(val);
              setErrors((prev) => ({ ...prev, phoneNumber: err }));
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
              const err = ProfileValidator.validateNationalId(val);
              setErrors((prev) => ({ ...prev, nationalId: err }));
            }}
            error={errors.nationalId}
            onValidate={(val) => {
              const err = ProfileValidator.validateNationalId(val);
              setErrors((prev) => ({ ...prev, nationalId: err }));
            }}
          />
        </div>

        <button
          className="p-2 rounded-md bg-slate-300 hover:bg-blue-300 active:bg-blue-500 active:text-white w-[200px] self-center"
          onClick={handleSubmit}
        >
          Daftar
        </button>
      </div>
    </div>
  );
};

export default RegisterProfile;
