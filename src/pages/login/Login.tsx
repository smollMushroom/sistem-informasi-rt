import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@/services/authService';
import Input from '@/components/Input';
import LoadingScreen from '@/components/LoadingScreen';
import delay from '@/utils/helper/delay';
import AccountValidators from '@/utils/validators/AccountValidators';
import NotificationModal from '@/components/NotificationModal';
import { scheduleTokenExpiry } from '@/utils/helper/token';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [firstErrorMessage, setFirstErrorMessage] = useState('')
  const [notificationVisible, setNotificationVisible] = useState(false);

  const validateLoginForm = (email: string, password: string) => {
    const errors = {
      email: AccountValidators.validateEmail(email),
      password: AccountValidators.validatePassword(password),
    };

    const isValid = !errors.email && !errors.password;

    return { isValid, errors };
  };

  const handleLogin = async () => {
    const { isValid, errors } = validateLoginForm(email, password);

    setEmailError(errors.email || '');
    setPasswordError(errors.password || '');

    setFirstErrorMessage(Object.values(errors).find(message => message !== null) ?? '')

    if (!isValid) {
      setNotificationVisible(true)
      return;
    }

    setLoading(true);

    try {
      const [token] = await Promise.all([
        login({ email, password }),
        delay(3000),
      ]);


      setToken(token);
      scheduleTokenExpiry(token);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setFirstErrorMessage('Email atau Password salah')
      setNotificationVisible(true)
      console.error(error);
    }
  };

  return (
    <>
      <LoadingScreen isVisible={loading} />
      {!loading && (
        <div className="h-screen w-screen flex flex-col items-center">
          <div className="flex-grow w-[90%] flex justify-center items-center">
            <div className="border-2 border-primary w-full sm:w-[400px] rounded-md p-4 flex flex-col gap-5 justify-center">
              <h1 className="text-center font-bold text-primary text-normal md:text-header2">
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
                    const err = AccountValidators.validateEmail(val);
                    setEmailError(err ?? '');
                  }}
                  error={emailError}
                  onValidate={(val) => {
                    const err = AccountValidators.validateEmail(val);
                    setEmailError(err ?? '');
                  }}
                />
                <Input
                  id="password"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(val) => {
                    setPassword(val);
                    const err = AccountValidators.validatePassword(val);
                    setPasswordError(err ?? '');
                  }}
                  error={passwordError}
                  onValidate={(val) => {
                    const err = AccountValidators.validatePassword(val);
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
                className="p-2 text-normal tracking-wide font-bold text-white rounded-md bg-primary active:bg-[#428a5a] active:text-white w-full min-w-[130px] max-w-[200px] self-center"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
          <NotificationModal
          message={firstErrorMessage}
          onClose={()=> setNotificationVisible(false)}
          visible={notificationVisible}
          type='error'
          />
        </div>
      )}
    </>
  );
};

export default Login;
