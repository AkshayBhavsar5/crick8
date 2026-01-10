import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const token = localStorage.getItem('token'); // Changed from 'btoken' to 'token'
  const isAuthenticated = useSelector(
    (state: any) => state.user.isAuthenticated
  );

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
