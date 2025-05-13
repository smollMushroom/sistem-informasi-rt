/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // const token = localStorage.getItem('token') || ''
  // const { role } = jwtDecode<{role: string}>(token)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const [role, setRole] = useState<'ketua' | 'admin' | 'warga'>('warga');

useEffect(() => {
  const token = localStorage.getItem('token') || '';
  try {
    const { role } = jwtDecode<{ role: string }>(token);
    const validRoles = ['ketua', 'admin', 'warga'] as const;
    if (validRoles.includes(role as any)) {
      setRole(role as 'ketua' | 'admin' | 'warga');
    }
  } catch (err) {
    console.error('Invalid token', err);
  }
}, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-800">
      {/* Header */}
      <Header />

      <div className="flex flex-1 w-full overflow-x-hidden">
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 sm:w-44 md:w-56 bg-gray-800 text-white p-4 z-40 transform transition-transform duration-300 md:relative md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between mb-4 md:hidden">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={() => setIsSidebarOpen(false)}>
              <FaTimes size={20} />
            </button>
          </div>
          <nav className="space-y-2">
            {role === 'ketua' || role === 'admin' ? (
            <nav className="space-y-2">
              <Link
                to="/dashboard/profile"
                className={`block ${path === "/dashboard/profile" ? 'bg-gray-700' : ''} hover:bg-gray-700 rounded px-2 py-1`}
              >
                Profil
              </Link>
              <Link
                to="/dashboard/users"
                className={`block ${path.startsWith("/dashboard/users") ? 'bg-gray-700' : ''} hover:bg-gray-700 rounded px-2 py-1`}
              >
                Pengguna
              </Link>
              <Link
                to="/dashboard/administration"
                className={`block ${path.startsWith("/dashboard/administration") ? 'bg-gray-700' : ''} hover:bg-gray-700 rounded px-2 py-1`}
              >
                Pengajuan Surat
              </Link>
              <Link
                to="/dashboard/posts"
                className={`block ${path.startsWith("/dashboard/posts") ? 'bg-gray-700' : ''} hover:bg-gray-700 rounded px-2 py-1`}
              >
                Pengumuman & Berita
              </Link>
            
              <Link
                to="/dashboard/settings"
                className={`block ${path.startsWith("/dashboard/settings") ? 'bg-gray-700' : ''} hover:bg-gray-700 rounded px-2 py-1`}
              >
                Pengaturan
              </Link>
            </nav>) : (
            <nav className="space-y-2">
              <Link
                to="/dashboard/profile"
                className={`block ${path.startsWith("/dashboard/profile") ? 'bg-gray-700' : ''} hover:bg-gray-700 rounded px-2 py-1`}
              >
                Profile
              </Link>
              <Link
                to="/dashboard/administration"
                className={`block ${path.startsWith("/dashboard/administration") ? 'bg-gray-700' : ''} hover:bg-gray-700 rounded px-2 py-1`}
              >
                Pengajuan
              </Link>
              <Link
                to="/dashboard/settings"
                className={`block ${path.startsWith("/dashboard/settings") ? 'bg-gray-700' : ''} hover:bg-gray-700 rounded px-2 py-1`}
              >
                Settings
              </Link>
            </nav>)}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex w-full flex-col">
          {/* Top bar (mobile only) */}
          <div className="bg-white shadow-md p-4 flex items-center justify-between md:hidden">
            <button onClick={() => setIsSidebarOpen(true)}>
              <FaBars size={20} />
            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>

          <main className="flex-1 w-full bg-gray-100 p-3 md:p-6 overflow-x-hidden overflow-y-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
