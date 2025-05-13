import { useState } from 'react';
import { useRegisterStore } from '@/stores/registerStore';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterAccountErrors } from '@/types/user';
import Input from '@/components/Input';
import AccountValidators from '@/utils/validators/AccountValidators';
import NotificationModal from '@/components/NotificationModal';

const RegisterAccount = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<RegisterAccountErrors>({});
  const [firstErrorMessage, setFirstErrorMessage] = useState('')
  const [notificationVisible, setNotificationVisible] = useState(false);
  const { setAccount } = useRegisterStore();
  const navigate = useNavigate();

  const handleNext = () => {
    const newErrors = {
      email: AccountValidators.validateEmail(email),
      username: AccountValidators.validateUsername(username),
      password: AccountValidators.validatePassword(password),
    };

    setErrors(newErrors);

    const firstErrorMessage = Object.values(newErrors).find((message) => message !== null) ?? '';
    const hasError = Object.values(newErrors).some((msg) => msg !== null);

    setFirstErrorMessage(firstErrorMessage);

    if(firstErrorMessage) {
      setNotificationVisible(true)
    }

    if (hasError) return;

    setAccount({ email, username, password, role: 'warga'});
    navigate('/register/profile');
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="border-2 border-primary w-[90%] sm:w-[400px] rounded-md p-5 flex flex-col gap-4 justify-center shadow-lg">
        <h1 className="text-center font-bold text-primary text-normal md:text-header2">
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
              setErrors((prev) => ({ ...prev, username: AccountValidators.validateUsername(val)}));
            }}
            error={errors.username}
            onValidate={(val) => {
              setErrors((prev) => ({ ...prev, username: AccountValidators.validateUsername(val) ?? '' }));
            }}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(val) => {
              setEmail(val);
              setErrors((prev) => ({ ...prev, email: AccountValidators.validateEmail(val)}));
            }}
            error={errors.email}
            onValidate={(val) => {
              setErrors((prev) => ({ ...prev, email: AccountValidators.validateEmail(val) ?? '' }));
            }}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(val) => {
              setPassword(val);
              setErrors((prev) => ({ ...prev, password: AccountValidators.validatePassword(val)}));
            }}
            error={errors.password}
            onValidate={(val) => {
              setErrors((prev) => ({ ...prev, password: AccountValidators.validatePassword(val) ?? '' }));
            }}
          />
        </div>
        <button
          className="p-2 text-normal tracking-wide font-bold text-white rounded-md bg-primary active:bg-[#428a5a] active:text-white w-full min-w-[130px] max-w-[200px] self-center"
          onClick={handleNext}
        >
          Selanjutnya
        </button>
        <div className='flex gap-1 justify-center'>
          <p className='inline-block'>Memiliki akun? </p>
          <Link to={'/login'} className='text-blue-600 inline-block text-blue'>Login</Link>
        </div>
      </div>
      <NotificationModal
        message={firstErrorMessage}
        onClose={() => setNotificationVisible(false)}
        visible={notificationVisible}
        type='error'
      />
    </div>
  );
};

export default RegisterAccount;
