import React from "react";
import Header from "../Header";
import Sops from "./Sops";
import AddSops from "./AddSops";
import { Route, Routes } from "react-router-dom";

import "./styles.css";
function AddSop({show,setShow}) {
  return (
    <React.Fragment>
      <div className="container">
        <Header   show={show} setShow={setShow}/>
     <AddSops/>
      </div>
    </React.Fragment>
  );
}

export default AddSop;
