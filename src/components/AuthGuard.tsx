import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const token = localStorage.getItem('token');  // Changed from 'btoken' to 'token'
  const isAuthenticated = useSelector(
    (state: any) => state.user.isAuthenticated
  );

  // Only redirect to /match when BOTH token and Redux authentication are present
  if (token && isAuthenticated) {
    return <Navigate to="/match" replace />;  // Changed from '/dashboard' to '/match'
  }

  return <>{children}</>;
};