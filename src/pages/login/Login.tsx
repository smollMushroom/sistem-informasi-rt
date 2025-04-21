import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@/services/authService';
import AccountValidator from '@/utils/validations/AccountValidator';
import Input from '@/components/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const validateLoginForm = (email: string, password: string) => {
    const errors = {
      email: AccountValidator.validateEmail(email),
      password: AccountValidator.validatePassword(password),
    };

    const isValid = !errors.email && !errors.password;

    return { isValid, errors };
  };

  const handleLogin = async () => {
    const { isValid, errors } = validateLoginForm(email, password);

    setEmailError(errors.email || '');
    setPasswordError(errors.password || '');

    if (!isValid) return;

    try {
      const token = await login({ email, password });
      setToken(token);
      navigate('/home');
    } catch (error) {
      alert('Login gagal, cek email dan password');
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center p-2">
      <div className="border-2 border-slate-400 w-[90%] sm:w-[400px] rounded-md p-5 flex flex-col gap-5 justify-center">
        <h1 className="text-center font-bold md:text-lg">
          Login Sistem Informasi RT
        </h1>
        <div className="flex flex-col gap-3">
          <Input
            id="email"
            label="Email"
            placeholder="Email"
            value={email}
            onChange={(val) => {
              setEmail(val);
              const err = AccountValidator.validateEmail(val);
              setEmailError(err ?? '');
            }}
            error={emailError}
            onValidate={(val) => {
              const err = AccountValidator.validateEmail(val);
              setEmailError(err ?? '');
            }}
          />
          <Input
            id="password"
            label="Password"
            placeholder="Password"
            type='password'
            value={password}
            onChange={(val) => {
              setPassword(val);
              const err = AccountValidator.validatePassword(val);
              setPasswordError(err ?? '');
            }}
            error={passwordError}
            onValidate={(val) => {
              const err = AccountValidator.validatePassword(val);
              setPasswordError(err ?? '');
            }}
          />
          <p>
            Belum memiliki akun?{' '}
            <Link to="/register/account" className="text-blue-600">
              Daftar Sekarang
            </Link>
          </p>
        </div>

        <button
          className="p-2 rounded-md bg-slate-300 hover:bg-blue-300 active:bg-blue-500 active:text-white w-[200px] self-center"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
