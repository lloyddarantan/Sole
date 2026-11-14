
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CustomerRoute() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  if (role !== 'customer') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Unable to verify your account role. Please contact support.
      </div>
    );
  }

  return <Outlet />;
}
