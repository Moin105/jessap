import React, { useEffect } from "react";
import Tab from "./Tab";
import logo from "../../Images/logo.png";
import setting from "../../Images/tabsetting.png";
import user from "../../Images/user.png";
import whatsapp from "../../Images/whatsapp.png";
import './styles.css'
import { Link } from "react-router-dom";
// import { showNav, hideNav } from "../../Actions/action";
// import { connect } from "react-redux";

function SideBar({ show, setShow }) {
  // setShow(false)
  useEffect(() => {
    setShow(false)
  }, [])
  
  useEffect(() => {
    console.log("moeeen", show);
  }, [show]);

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
              <Tab name="Assign SOP" icon={user} />
                 
                
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
              <Tab name="Assign SOP" icon={user} />
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
              <Tab name="Assign SOP" icon={user} />
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
