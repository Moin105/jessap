import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AuthenticatedRoute = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  // Function to handle route change
  const handleRouteChange = (route) => {
    // Use the navigate() function to navigate to the specified route
    navigate(route);
  };
  useEffect(() => {
  if(token){
    handleRouteChange('/home')
  }
  }, [])
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default AuthenticatedRoute;