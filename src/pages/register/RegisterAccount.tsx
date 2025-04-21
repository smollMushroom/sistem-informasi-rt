import { useState } from 'react';
import { useRegisterStore } from '@/stores/registerStore';
import { useNavigate } from 'react-router-dom';
import { RegisterAccountErrors } from '@/types/user';
import AccountValidator from '@/utils/validations/AccountValidator';
import Input from '@/components/Input';

const RegisterAccount = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<RegisterAccountErrors>({});
  const { setAccount } = useRegisterStore();
  const navigate = useNavigate();

  const handleNext = () => {
    const newErrors = {
      email: AccountValidator.validateEmail(email),
      username: AccountValidator.validateUsername(username),
      password: AccountValidator.validatePassword(password),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg !== null);
    if (hasError) return;

    setAccount({ email, username, password });
    navigate('/register/profile');
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center p-2">
      <div className="border-2 border-slate-400 w-[90%] sm:w-[400px] rounded-md p-5 flex flex-col gap-5 justify-center">
        <h1 className="text-center font-bold md:text-lg">
          Registrasi Sistem Informasi RT
        </h1>
        <div className="flex flex-col gap-3">
          <Input
            id="username"
            label="Username"
            placeholder="Username"
            value={username}
            onChange={(val) => {
              setUsername(val);
              const err = AccountValidator.validateUsername(val);
              setErrors((prev) => ({...prev, username: err}));
            }}
            error={errors.username}
            onValidate={(val) => {
              const err = AccountValidator.validateUsername(val);
              setErrors((prev) => ({...prev, username: err ?? ''}));
            }}
          />
          <Input
            id="email"
            label="Email"
            type='email'
            placeholder="Email"
            value={email}
            onChange={(val) => {
              setEmail(val);
              const err = AccountValidator.validateEmail(val);
              setErrors((prev) => ({...prev, email: err}));
            }}
            error={errors.email}
            onValidate={(val) => {
              const err = AccountValidator.validateEmail(val);
              setErrors((prev) => ({...prev, email: err ?? ''}));
            }}
          />
          <Input
            id="password"
            type='password'
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(val) => {
              setPassword(val);
              const err = AccountValidator.validatePassword(val);
              setErrors((prev) => ({...prev, password: err}));
            }}
            error={errors.password}
            onValidate={(val) => {
              const err = AccountValidator.validatePassword(val);
              setErrors((prev) => ({...prev, password: err ?? ''}));
            }}
          />
        </div>
        <button
          className="p-2 rounded-md bg-slate-300 hover:bg-blue-300 active:bg-blue-500 active:text-white w-[200px] self-center"
          onClick={handleNext}
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
};

export default RegisterAccount;
