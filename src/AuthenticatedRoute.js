import { Outlet, Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default AuthenticatedRoute;