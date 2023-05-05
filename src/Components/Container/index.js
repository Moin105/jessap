import React, { useEffect } from "react";
import Header from "../Header";
import Sops from "./Sops";
import AddSops from "./AddSops";
import Cookies from 'js-cookie'
import { Route, Routes,useLocation,useNavigate } from "react-router-dom";
import "./styles.css";
function Container({show,setShow}) {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const handleRouteChange = (route) => {
    navigate(route);
  };
  
  return (
    <React.Fragment>
      <div className="container">
        <Header   show={show} setShow={setShow}/>
       <Sops />
      </div>
    </React.Fragment>
  );
}

export default Container;
