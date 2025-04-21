// import { useAuthStore } from '@/stores/authStore';
import logo from '@/assets/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoClose, IoReorderThreeOutline } from 'react-icons/io5';

const Home = () => {
  // const logout = useAuthStore((state) => state.logout);
  // const logoutHandler = () => {
  //   logout();
  // };

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <header className="px-3 py-2 bg-primary text-white ">
        <div className="items-center flex justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-[45px]" />
            <h2>
              Website Rukun Tetangga
              <br />
              RT 006 Desa Cimandala
            </h2>
          </div>
          <div>
            <nav className="hidden md:flex gap-3">
              <Link to="/service">Layanan</Link>
              <Link to="/about">Tentang</Link>
              <Link to="/login">Login</Link>
            </nav>
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <IoReorderThreeOutline size={30} />
            </button>
          </div>
        </div>

        {/* === Mobile Menu Overlay === */}
        <div
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* === Mobile Side Menu === */}
        <nav
          className={`fixed top-0 right-0 h-full w-[75%] max-w-xs bg-primary text-white z-50 shadow-lg p-6 transition-transform duration-300 transform ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden flex flex-col gap-4`}
        >
          <button
            className="self-end text-xl"
            onClick={() => setMenuOpen(false)}
          >
            <IoClose size={40}/>
          </button>
          <Link to="/service" onClick={() => setMenuOpen(false)}>
            Layanan
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            Tentang
          </Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        </nav>
      </header>

      <h2>Welcome</h2>
    </div>
  );
};

export default Home;
