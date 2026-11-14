import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomePage from './../views/pages/HomePage';

export default function HomeRoute() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (user && role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <HomePage />;
}