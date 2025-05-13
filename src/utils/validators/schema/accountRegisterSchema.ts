import { z } from 'zod';

export const AccountRegisterSchema = z.object({
  username: z
    .string({ required_error: 'Username wajib diisi' })
    .nonempty('Username wajib diisi')
    .min(3, 'Username minimal 3 digit')
    .refine((val) => !val.includes(' '), {
      message: 'Username tidak boleh mengandung spasi',
    }),
  email: z
    .string({ required_error: 'Email wajib diisi' })
    .nonempty('Email wajib diisi')
    .email('Email tidak valid'),
  password: z
    .string()
    .min(6, 'Password minimal 6 karakter')
    .regex(/\d/, 'Password harus mengandung angka')
    .refine((val) => !val.includes(' '), {
      message: 'Password tidak boleh mengandung spasi',
    }),
  role: z.enum(['warga', 'admin', 'ketua'], {
    required_error: 'Role wajib dipilih',
    invalid_type_error: 'Role tidak valid',
  }),
});
