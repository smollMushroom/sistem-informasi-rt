import { useEffect, useState } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { useAuthStore } from './stores/authStore';
import { scheduleTokenExpiry } from './utils/helper/token';
import NotificationModal from './components/NotificationModal';
import { useNavigate } from 'react-router-dom';

function App() {
  const { logoutReason, clearLogoutReason, token } = useAuthStore((state)=> state)
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      scheduleTokenExpiry(token);
    }
  }, [token]);

  useEffect(()=>{
    if(logoutReason) {
      setModalVisible(true)
    }
  },[logoutReason])

  const handleModalClose = () => {
    setModalVisible(false);
    clearLogoutReason();
    navigate('/login')
  }

  return (
    <>
      <AppRoutes />
      <NotificationModal
        visible={modalVisible}
        message={logoutReason || ''}
        type="info"
        onClose={handleModalClose}
      />
    </>
  );
}

export default App;
