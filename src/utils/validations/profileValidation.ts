import {
  required,
  minLength,
  exactLength,
  matchRegex,
  composeValidators,
  minAge,
  maxLength,
} from './baseValidator';

class ProfileValidator {
  static validateFullName = required('Nama lengkap');

  static validateNationalId = composeValidators(
    required('NIK'),
    matchRegex('NIK', /^[0-9]+$/, 'harus berupa angka'),
    exactLength('NIK', 16)
  );

  static validatePhoneNumber = composeValidators(
    required('Nomor HP'),
    minLength('Nomor HP', 12),
    maxLength('Nomor HP', 13)
  );
  static validateMaritalStatus = required('Status Pernikahan')

  static validateOccupation = required('Pekerjaan')

  static validateBirthDate = composeValidators(
    required('Tanggal lahir'),
    minAge('Usia', 17)
  );

  static validateGender = required('Jenis kelamin');

  static validateAddress = required('Alamat');
}

export default ProfileValidator;