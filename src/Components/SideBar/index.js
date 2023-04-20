import React, { useEffect } from "react";
import Tab from "./Tab";
import logo from "../../Images/logo.png";
import setting from "../../Images/tabsetting.png";
import user from "../../Images/user.png";
import whatsapp from "../../Images/whatsapp.png";
import './styles.css'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../features/counter/authReducer";
import { logout } from "../../features/counter/authActions";
// import { showNav, hideNav } from "../../Actions/action";
// import { connect } from "react-redux";

function SideBar({ show, setShow }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle route change
  const handleRouteChange = (route) => {
    // Use the navigate() function to navigate to the specified route
    navigate(route);
  };
  const auth =  useSelector(state => state.auth)
  // setShow(false)
  useEffect(() => {
    setShow(false)
  }, [])
  const logouts =()=>{
   console.log("tere",auth)
   dispatch(logout())
   Cookies.remove("token");
   window.location.reload();
  }
  
  useEffect(() => {
    console.log("moeeen", show);
  }, [show]);

//   useEffect(() => {
//     console.log("siri2",auth)
//  if (auth.isAuthenticated == false && path ){
//   // handleRouteChange("/login")
//   navigate('/login')
//   console.log("siri")
//  }else{
//   console.log("siri3")
//  }
//   }, [auth])
  
  const navHandle = () => {
    setShow(!show);
  };
  return (
    <React.Fragment>
      {show == true ? (
        <div>
          <div className="nav-bar">
            <figure className="logo">
              <img src={logo} />
            </figure>
            <div className="btn-container">
            <Link to='/home'> <Tab name="SOPs" icon={setting} /></Link>
             <Link to='/users'> <Tab name="USERS" icon={user} /></Link>
              <Tab name="Support" icon={whatsapp} />
              <Link to="/addemployee"><Tab name="Add employees" icon={user} /></Link>
             <Link to="/assignsop"><Tab name="Assign SOP" icon={user} /></Link>
             <button onClick={logouts} >logout</button>
                
            </div>
          </div>
          {/* mobile responsiveness here */}
          <div className="mobilenav" onClick={navHandle}>
            {" "}
            <div className="mobileback">
              <div className="mobilebar">
                <div className="nav-bar">
                  <figure className="logo">
                    <img src={logo} />
                  </figure>
                  <div className="btn-container">
                  <Link to='/home'> <Tab name="SOPs" icon={setting} /></Link>
             <Link to='/users'> <Tab name="USERS" icon={user} /></Link>
              <Tab name="Support" icon={whatsapp} />
              <Link to="/addemployee"><Tab name="Add employees" icon={user} /></Link>
              <Link to="/assignsop"><Tab name="Assign SOP" icon={user} /></Link>
              <button onClick={logouts} >logout</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mobilebar">
              <div className="nav-bar">
                <figure className="logo">
                  <img src={logo} />
                </figure>
                <div className="btn-container">
                <Link to='/home'> <Tab name="SOPs" icon={setting} /></Link>
             <Link to='/users'> <Tab name="USERS" icon={user} /></Link>
              <Tab name="Support" icon={whatsapp} />
              <Link to="/addemployee"><Tab name="Add employees" icon={user} /></Link>
              <Link to="/assignsop"><Tab name="Assign SOP" icon={user} /></Link>
              <button onClick={logouts} >logout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
        // <div></div>
      )}
    </React.Fragment>
  );
}
const mapStateToProps = (state) => (
  {
    show: state.show,
  },
  console.log("first", state.show)
);
// const mapDispatchToProps = {
//   showNav,
//   hideNav,
// };
export default SideBar;
