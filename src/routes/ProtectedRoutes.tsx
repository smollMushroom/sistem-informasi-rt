import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/types/jwtPayload';

interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

const getRoleFromToken = (token: string): string | null => {
  try {
    const { role } = jwtDecode(token) as JwtPayload;
    return role || null;
  } catch (error) {
    console.error(error)
    return null;
  }
}

const RoleProtectedRoute = ({ allowedRoles }: RoleProtectedRouteProps) => {
  const token = useAuthStore((state) => state.token);

  if (!token) return <Navigate to="/login" replace />;

  const role = getRoleFromToken(token);
  
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;