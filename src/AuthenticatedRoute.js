import { useEffect } from 'react';
import { Outlet, Navigate ,useSearchParams } from 'react-router-dom';
import { useNavigate,useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
const AuthenticatedRoute = ({ isAuthenticated }) => {

  const navigate = useNavigate();
  // Function to handle route change
  const handleRouteChange = (route) => {
    // Use the navigate() function to navigate to the specified route
    navigate(route);
  };
  const isAuthenticateds = useSelector(state => state.auth.isAuthenticated)
  const token = Cookies.get("token")
  // const [searchParams] = useSearchParams();
  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {

    console.log("sakinaka",location.pathname)
    // console.log("sakinaka",isAuthenticateds)
  if(token !== "" && path== "/" ){
    handleRouteChange('/home')
  }else
  if(token !== "" && path== "/signup"){
    handleRouteChange('/home')
  }else
  if(token !== "" &&  path == "/login"  ){
    handleRouteChange('/home')
  }if(token !=="" && path !== "/login"||"/signup"){
 return
  } 

  // if(token  || path == undefined ){
  //   handleRouteChange('/login')
  // }

  }, [])
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default AuthenticatedRoute;