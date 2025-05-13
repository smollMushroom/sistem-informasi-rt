import { z } from 'zod';

const today = new Date();
const minBirthDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());

export const ProfileRegisterSchema = z.object({
  fullName: z.string().nonempty('Nama lengkap wajib diisi'),

  address: z.string().nonempty('Alamat wajib diisi'),

  occupation: z.string().nonempty('Pekerjaan wajib diisi'),
  
  birthPlace: z.string().nonempty('Tempat lahir wajib diisi'),

  birthDate: z
    .string()
    .nonempty('Tanggal lahir wajib diisi')
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date <= minBirthDate;
    }, {
      message: 'Usia minimal 17 tahun',
    }),

  maritalStatus: z.enum(['sudah menikah', 'belum menikah'], {
    errorMap: () => ({ message: 'Status pernikahan harus "sudah menikah" atau "belum menikah"' }),
  }),

  religion: z.enum(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'], {
    errorMap: () => ({ message: 'Agama harus salah satu dari yang diakui di Indonesia' }),
  }),

  nationality: z.string().nonempty('Kewarganegaraan wajib diisi'),

  gender: z.enum(['male', 'female'], {
    errorMap: () => ({message: 'Pilih jenis kelamin anda'}),
  }),

  phoneNumber: z
    .string()
    .nonempty('Nomor HP wajib diisi')
    .regex(/^\d+$/, 'Nomor HP harus berupa angka')
    .min(11, 'Nomor HP minimal 11 digit')
    .max(13, 'Nomor HP maksimal 13 digit'),

  nationalId: z
    .string()
    .nonempty('NIK wajib diisi')
    .regex(/^\d{16}$/, 'NIK harus berupa 16 digit angka'),
});
