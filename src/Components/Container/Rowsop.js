import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {AiFillCloseCircle} from 'react-icons/ai'
import dots from '../../Images/dots.png'
import Cookies from "js-cookie";




function Rowsop({icon,title,description,data}) {
 const token = Cookies.get("token")
  const [show, setShow] = useState(false)
  const navigate = useNavigate();
  const {id} = data;
  // Function to handle route change
 const deleteSop = async ()=>{
  console.log("naxxr",id);
  fetch(`https://phplaravel-391561-3408566.cloudwaysapps.com/api/SOPs/${id}`, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(employee),ss
  })
  .then(response=>{return response.json()})
  .then(response => console.log(response))
 }
  const dataas = {
    message: 'Hello from Component A',
    sop:data,
    // Add more data as needed
  };
const handleButton = ()=>{
  console.log("sop",id)
  deleteSop()
}
  const handleClick = (id) => {
    navigate(`/dynamic/${id}`, { state: { dataas } });
  };
  return (
    <React.Fragment>
      <div  className="row"  >
        <div className="box">
            <div className="left" onClick={()=>{handleClick(id)}}>
   <div className="icon-container">
            <img src={icon} />
          </div>
          <div className="detail-heading">
            <h5 >{title}</h5>
            <p>{description}</p>
          </div>
            </div>
       
         <div className="circle-box">
            <div className="circle">{/* <img>?</img> */}</div>
            <div className="circle">{/* <img>?</img> */}</div>
            <div className="circle">{/* <img>?</img> */}</div>
         </div> 
        </div>
     {show &&<div className="hidden-box">
            {/* <AiFillCloseCircle/> */}
            <button onClick={handleButton}>Delete SOP</button>
      </div>}
        <span className="dots" onClick={()=>setShow(!show)}><img src={dots}/></span>
      </div>
   
    </React.Fragment>
  );
}

export default Rowsop;
