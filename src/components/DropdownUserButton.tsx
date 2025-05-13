import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { useAuthStore } from '@/stores/authStore';
import { RxPerson } from 'react-icons/rx';

const DropdownUserButton = () => {
  const { user, whoAmI } = useUserStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) whoAmI();
  }, [user, whoAmI]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1 bg-white rounded-full border-2 border-green-600 shadow-sm"
      >
        <div className='border-2 w-8 h-8 flex justify-center items-center rounded-full border-gray-200 bg-gray-300'>
          <RxPerson size={15}/>
        </div>
        <span className='text-primary'>{user?.username || '...'}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-40 bg-white border-2 text-black shadow-md rounded-md z-50">
          <Link
            to="/dashboard"
            className="block px-4 py-2 hover:bg-gray-100 rounded-tl-md rounded-tr-md"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100  rounded-bl-md rounded-br-md"
            onClick={() => {
              logout();
              navigate('/');
              setOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownUserButton;