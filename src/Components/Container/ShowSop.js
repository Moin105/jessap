// import React, { useEffect } from "react";
import Header from "../Header";
import Sops from "./Sops";
import AddSops from "./AddSops";
import './indi.css'
import { Route, Routes } from "react-router-dom";
import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useState } from "react";
import Slider from 'react-slick';
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import HtmlViewer from "./HtmlViewer";
import Cookies from "js-cookie";
import Editor from "./Editor";
import 'react-quill/dist/quill.snow.css';
import MyCarousel from "./MyPage";
import EmployeeCarousel from "./EmployeeCarousel";


const checkForSuccessfull = (str) => {
  return str.includes('successfully');
};


function DynamicComponent({show,setShow}) {
  const handleRouteChange = (route) => {
    navigate(route);
  };
  const fetchData = (config,sopid) => {
   
      console.log("config")
      fetch('https://phplaravel-391561-3408566.cloudwaysapps.com/api/UpdateSOP/' + sopid ,config) 
        .then(response => {
          return response.json();
        })
        .then((response) => {
          console.log('JSON data:', response);
          const isPresent = checkForSuccessfull(response.message);
            console.log(isPresent); 
            if (isPresent){
              handleRouteChange('/home')
            }
            })
          .catch(error => {
           
          });
          
        };
        const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); 
  const location = useLocation();
  const dataas = location.state?.dataas; 
  const  information = dataas.sop
  const [arr, setArr] = useState([information])
  const [editablePageIndex, setEditablePageIndex] = useState(null);
  const role = Cookies.get("role")
  const config = {
    headers: {
      'Authorization':`Bearer  ${Cookies.get("token")}`,
      'Content-Type': 'application/json'
    }
  };
useEffect(() => {
  console.log("bohemia",dataas)
  console.log("bohemia",arr[0].steps)
}, [])

  
useEffect(() => {
  console.log("qwertyuiop",Cookies.get("token"))
  console.log("moeen",content)

  setTimeout(() => {
    console.log("moeen",arr)
  }, 2000);
}, [])
useEffect(() => {
  console.log("agency",content,arr[0].title)
}, [content])

const requestOptions = {
  method: 'PUT',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + Cookies.get("token") 
  },
};
const status = arr[0].status
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: false,
  };

  const handlePageEdit = (objectIndex, pageIndex) => {
    console.log("abdullah",objectIndex, pageIndex,editablePageIndex)
    setEditablePageIndex({ objectIndex, pageIndex });
    console.log("abdullah",editablePageIndex)
  };

  const handlePageSave = (objectIndex, pageIndex, content) => {
        setEditablePageIndex(null);
  };
return (
    <React.Fragment>
<div className="container">
<Header   show={show} setShow={setShow}/>
    <div className="rowerist">
    <div className="row">
    <div className="h2">
    <h2>{arr[0].title}</h2> 
    </div>  
    <p className="description">{arr[0].description}</p> 
    {role == "employee" ? <EmployeeCarousel objectData={arr[0]}/>:<MyCarousel objectData={arr[0]}/>}
    </div>
 
  </div>
  </div>
</React.Fragment>
)
}

export default DynamicComponent;
