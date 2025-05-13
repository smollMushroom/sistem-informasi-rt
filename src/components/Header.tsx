import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';
import DropdownUserButton from './DropdownUserButton';

const Header = () => {
  const { token, logout } = useAuthStore((state) => state);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="px-4 md:px-6 bg-primary w-full flex justify-center text-white ">
      <div className="max-w-[1100px] w-full">
        <div className=" flex h-[80px] w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-[45px]" />
            <Link to="/" className="font-bold">
              Website Rukun Tetangga
              <br />
              RT 006 Desa Cimandala
            </Link>
          </div>

          <div>
            <nav className="hidden md:flex items-center gap-5 ">
              <Link to="/">Beranda</Link>
              <Link to="/service">Layanan</Link>
              <Link to="/info">Informasi</Link>
              <Link to="/about">Tentang</Link>
              {token ? (
                <DropdownUserButton />
              ) : (
                <button
                  onClick={() => {
                    navigate('/login');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  Login
                </button>
              )}
            </nav>
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <RxHamburgerMenu size={30} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                className="fixed inset-0 backdrop-blur-[2px] bg-black/50 z-40 md:hidden"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.nav
                className="fixed z-50 top-0 bg-primary right-0 h-full w-[75%] max-w-xs text-white shadow-lg p-6 md:hidden flex flex-col gap-4"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
              >
                <button className="self-end" onClick={() => setMenuOpen(false)}>
                  <IoClose size={40} />
                </button>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Beranda
                </Link>
                <Link to="/service" onClick={() => setMenuOpen(false)}>
                  Layanan
                </Link>
                <Link to="/info" onClick={() => setMenuOpen(false)}>
                  Informasi
                </Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  Tentang
                </Link>
                {token ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <Link
                      to="/"
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                )}
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
