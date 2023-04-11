import React from 'react'
import Editor from './Editor'
import Header from "../Header";
import Sops from "./Sops";
import AddSops from "./AddSops";
import { Route, Routes } from "react-router-dom";

function SopAdd({show,setShow}) {
  return (
    
<React.Fragment>
<div className="container" stu>
  <Header   show={show} setShow={setShow}/>
{/* <AddSops/>
</div>
    <div> */}
        <Editor/>
    </div>
</React.Fragment>
  )
}

export default SopAdd



