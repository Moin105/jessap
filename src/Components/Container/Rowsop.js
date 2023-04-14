import React from "react";
import { useNavigate } from 'react-router-dom';

import dots from '../../Images/dots.png'




function Rowsop({icon,title,description,data}) {
  const navigate = useNavigate();
  const {id} = data;
  // Function to handle route change
 
  const dataas = {
    message: 'Hello from Component A',
    sop:data,
    // Add more data as needed
  };

  const handleClick = (id) => {
    navigate(`/dynamic/${id}`, { state: { dataas } });
    // navigate(`/dynamic/${id}`,);
  };
  return (
    <React.Fragment>
      <div className="row" >
        <div className="box">
            <div className="left">
   <div className="icon-container">
            <img src={icon} />
          </div>
          <div className="detail-heading">
            <h5 onClick={()=>{handleClick(id)}}>{title}</h5>
            <p>{description}</p>
          </div>
            </div>
       
         <div className="circle-box">
            <div className="circle">{/* <img>?</img> */}</div>
            <div className="circle">{/* <img>?</img> */}</div>
            <div className="circle">{/* <img>?</img> */}</div>
         </div> 
        </div>
        <span className="dots"><img src={dots}/></span>
      </div>
    </React.Fragment>
  );
}

export default Rowsop;
