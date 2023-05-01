import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import dots from "../../Images/dots.png";
// import { useDispatch } from "react-redux";
import { fetchData } from "./Sops";
import Cookies from "js-cookie";
import {CgDanger} from 'react-icons/cg'
import { useDispatch } from "react-redux";

function EmployeeSopRow({ icon, title, description, data,status }) {
  const checkForSuccessfull = (str) => {
    return str.includes("SOP deleted successfully");
  };
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { id } = data;
  const config = {
    headers: {
      'Authorization':`Bearer  ${Cookies.get("token")}`
    }
  };
  // Function to handle route change
  const deleteSop = async () => {
    console.log("naxxr", id);
    fetch(
      `https://phplaravel-391561-3408566.cloudwaysapps.com/api/SOPs/${id}`,
      {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(employee),ss
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // if (response.message == "SOP deleted successfully") {
        //   dispatch(fetchData(config));
        // }
        const isPresent = checkForSuccessfull(response.message);
        //   "Company Registered successfully."
        console.log(isPresent);
        if (isPresent) {
          dispatch(fetchData(config));
          setShow(false);
          // handleRouteChange("/home");
        }
        console.log("sajna", response);
      });
  };

  const dataas = {
    message: "Hello from Component A",
    sop: data,
    // Add more data as needed
  };
  const handleButton = () => {
    console.log("sop", id);
    deleteSop();
  };
  const handleClick = (id) => {
    navigate(`/dynamic/${id}`, { state: { dataas } });
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="box">
          <div
            className="left"
            onClick={() => {
              handleClick(id);
            }}
          >
            <div className="icon-container">
              <img src={icon} />
            </div>
            <div className="detail-heading">
              <h5>{title}</h5>
              <p>{description}</p>
            </div>
          </div>

          <div className="circle-box">
            <div className="circle">{/* <img>?</img> */}</div>
            <div className="circle">{/* <img>?</img> */}</div>
            <div className="circle">{/* <img>?</img> */}</div>
          </div>
        </div>
{show && status == 0 ?
          <div className="hidden-box">
            {/* <AiFillCloseCircle/> */}
            <button className="edit"  onClick={() => {handleClick(id)}} >View</button>
          </div>:""}
        <span className="danger" onClick={() => setShow(!show)}>
            <CgDanger/>
        </span>
      </div>
    </React.Fragment>
  );
}

export default EmployeeSopRow;
