// import React, { useEffect } from "react";
import Header from "../Header";
import Sops from "./Sops";
import AddSops from "./AddSops";
import './indi.css'
import { Route, Routes } from "react-router-dom";
// // import {  } from 'react-router-dom';


// import "./styles.css";
// function ShowSop({show,setShow}) {
//     const { id } = useParams(); // Extract the 'id' route parameter from the URL
//     const location = useLocation();
//     const data = location.state?.data;
// useEffect(() => {
//  console.log("bimbo",id)
// }, [])
  
//   return (
//     <React.Fragment>
//       <div className="container">
//         <Header   show={show} setShow={setShow}/>
//         <React.Fragment>
//              <div className='container-sop'>
//             <h3>SOPs</h3>
           
//             <div className='sop-container-row'>
//                   wefew
//              </div>we
//             </div>
//    </React.Fragment>
//       </div>
//     </React.Fragment>
//   );
// }

// export default ShowSop;
import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useState } from "react";
import Slider from 'react-slick';
import ReactQuill from 'react-quill';
import Editor from "./Editor";
import 'react-quill/dist/quill.snow.css';
// import "slick-carousel/slick/slick.css";
function DynamicComponent({show,setShow}) {
  const { id } = useParams(); // Extract the 'id' route parameter from the URL
  const location = useLocation();
  const dataas = location.state?.dataas; // Extract data from location.state
  const  information = dataas.sop
  const [arr, setArr] = useState([information])
useEffect(() => {
  console.log("moeen",information)
  setTimeout(() => {
    console.log("moeen",arr)
  }, 2000);
}, [])
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    // slidesToScroll: 1,
    autoplay: false,
    // autoplaySpeed: 2000
  };
  const [editablePageIndex, setEditablePageIndex] = useState(null);
  const [content, setContent] = useState(null);

  const handlePageEdit = (objectIndex, pageIndex) => {
    console.log("abdullah",objectIndex, pageIndex,editablePageIndex)
    setEditablePageIndex({ objectIndex, pageIndex });
    console.log("abdullah",editablePageIndex)
  };
//   useEffect(() => {
//    console.log("mamba",content)
//   }, [content])
  

  const handlePageSave = (objectIndex, pageIndex, content) => {
    
    // TODO: save the updated content to the pages array of the object at objectIndex
    setEditablePageIndex(null);
  };
//   return (
//     // <div>
//     //   <h1>Dynamic Component</h1>
//     //   <p>Dynamic ID: {id}</p>
//     //   {dataas && <p>Message from Component A: {dataas.message}</p>}
//     // </div>
//     <React.Fragment>
//            <div className="container">
//              <Header   show={show} setShow={setShow}/>
//              <React.Fragment>
//                   <div className='container-sop'>
//                  <h3>SOPs</h3>
               
//                  <div className='sop-container-row'>
//                       <div>
//                            {arr.map((item, index) => (
//     //    <Slider {...settings}>   
//        <div key={index}>
//         <h2>{item.title}</h2>
//         <p>{item.description}</p>
//         {/* <Slider {...settings}> */}
//              {item.steps.map((innerItem, innerIndex) => (
//          <div className="indi" key={innerIndex}>
//          <h3>
//            {innerItem.pageNumber} - {innerItem.pageTitle}
//          </h3>
//         {/* // <div     dangerouslySetInnerHTML={{ __html: innerItem.pageContent }}>{innerItem.pageContent}</div> */}
//          {/* <Editor/> */}
//        </div>
//       ))}
//     {/* </Slider> */}
//         {/* {item.steps.map(() => (
       
//         ))} */}
//       </div>
//     //   </Slider>
//     ))}
//                       </div>
//                       </div>
//                  </div>
//         </React.Fragment>
//            </div> 
//     </React.Fragment>
//   );
return (
    <div>
    {arr.map((object, objectIndex) => (
      <div key={objectIndex}>
        <h2>{object.title}</h2>
        <p>{object.description}</p>
       {object.pages !== [] ? 
        // <Slider settings={settings}>
        <>  {object.steps.map((page, pageIndex) => (
            <div key={pageIndex}>
              {editablePageIndex?.objectIndex === objectIndex &&
              editablePageIndex?.pageIndex === pageIndex ? (
             <>
             <Editor
               setSop={setContent}  contents={page.pageContent}
                //  onChange={(content) =>
                //    handlePageSave(objectIndex, pageIndex, content)
                //  }
               />
             </>  
                
              ) : (
                <div>
                    <p>{editablePageIndex?.objectIndex}</p>
                  <h3>{page.pageTitle}</h3>
                  {page.pageContent}
                  <button onClick={() => handlePageEdit(objectIndex, pageIndex)}>
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}</>
        // </Slider>
        : "no data"}
      </div>
    ))}
  </div>
)
}

export default DynamicComponent;