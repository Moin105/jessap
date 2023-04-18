import { useEffect } from 'react';
import { Outlet, Navigate ,useSearchParams } from 'react-router-dom';
import { useNavigate,useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
const AuthenticatedRoute = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  // Function to handle route change
  const handleRouteChange = (route) => {
    // Use the navigate() function to navigate to the specified route
    navigate(route);
  };
  const token = Cookies.get("token")
  // const [searchParams] = useSearchParams();
  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {
    console.log("sakinaka",path)
  if(token !== "" && path== "/" ){
    handleRouteChange('/home')
  }
  if(token == "" && path== "/" ){
    handleRouteChange('/login')
  }

  }, [])
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default AuthenticatedRoute;