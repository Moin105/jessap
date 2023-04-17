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

// Function to handle route change

const checkForSuccessfull = (str) => {
  return str.includes('successfully');
};
// export const fetchData = (config,sopid) => {
//   // return (dispatch) => {
//     // dispatch(fetchUsersRequest());
//     console.log("config")
//     fetch('https://phplaravel-391561-3408566.cloudwaysapps.com/api/UpdateSOP/' + sopid ,config) // Replace with your API endpoint
//       .then(response => {
//         return response.json();
//       })
//       .then((response) => {
//         // Use parsed JSON data and text data as needed
//         console.log('JSON data:', response);
//         const isPresent = checkForSuccessfull(res.message);
//         //   "Company Registered successfully."
//           console.log(isPresent); 
//           if (isPresent){
//             handleRouteChange('/home')
//           }
//       //   console.log('Text data:', text);
//         // dispatch(fetchUsersSuccess(response)); // Dispatch success action with fetched data
//       })
//       .catch(error => {
//         // dispatch(fetchUsersFailure(error.message));
//       });
//   // };
// };

function DynamicComponent({show,setShow}) {
  const handleRouteChange = (route) => {
    // Use the navigate() function to navigate to the specified route
    navigate(route);
  };
  const fetchData = (config,sopid) => {
    // return (dispatch) => {
      // dispatch(fetchUsersRequest());
      console.log("config")
      fetch('https://phplaravel-391561-3408566.cloudwaysapps.com/api/UpdateSOP/' + sopid ,config) // Replace with your API endpoint
        .then(response => {
          return response.json();
        })
        .then((response) => {
          // Use parsed JSON data and text data as needed
          console.log('JSON data:', response);
          const isPresent = checkForSuccessfull(response.message);
          //   "Company Registered successfully."
            console.log(isPresent); 
            if (isPresent){
              handleRouteChange('/home')
            }
        //   console.log('Text data:', text);
          // dispatch(fetchUsersSuccess(response)); // Dispatch success action with fetched data
        })
        .catch(error => {
          // dispatch(fetchUsersFailure(error.message));
        });
    // };
  };
  const navigate = useNavigate();
  const { id } = useParams(); // Extract the 'id' route parameter from the URL
  const location = useLocation();
  const dataas = location.state?.dataas; // Extract data from location.state
  const  information = dataas.sop
  const [arr, setArr] = useState([information])
  const [editablePageIndex, setEditablePageIndex] = useState(null);
  const [content, setContent] = useState(null);
  const config = {
    headers: {
      'Authorization':`Bearer  ${Cookies.get("token")}`,
      'Content-Type': 'application/json'
    }
  };

  const [updated ,setUpdated] = useState({
    title:arr[0].title,
    description:arr[0].description,
    pages:[
        {
            pageTitle:"ok",
            sop_id:arr[0].steps[0].sop_id,
            pageNumber:"1",
            pageContent:content
        }
    ]
  })
useEffect(() => {
  console.log("qwertyuiop",Cookies.get("token"))
  console.log("moeen",content)

  setTimeout(() => {
    console.log("moeen",arr)
  }, 2000);
}, [])
useEffect(() => {
  console.log("werthj",content,updated)
  // id:arr[0]
  console.log("werthj2",arr[0].steps[0].sop_id)
  const {pages} = updated ;
  const newPages = [  {    ...updated.pages[0], // Copy all the properties of the first page
    pageContent: content,
    
  }
];
const newUpdated = {
  ...updated, // Copy all the properties of the original state object
  pages: newPages
};
setUpdated(newUpdated);

  // setUpdated({...updated,[...pages,page.C]})
  console.log("werthj",arr ,updated)
}, [content])

const requestOptions = {
  method: 'PUT',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + Cookies.get("token") 
  },
  body: JSON.stringify(updated)
};
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    // slidesToScroll: 1,
    autoplay: false,
    // autoplaySpeed: 2000
  };

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

return (
    <React.Fragment>
<div className="container">
<Header   show={show} setShow={setShow}/>
    <div>
    {arr.map((object, objectIndex) => (
      <div key={objectIndex}>
        <div className="row">
         <h2>{object.title}</h2>
        </div>
        <p>{object.description}</p>
        <div className="sigma">

       {object.pages !== [] ? 
        // <Slider settings={settings}>
        <>  {object.steps.map((page, pageIndex) => (
           <div key={pageIndex} className="sig">
              {editablePageIndex?.objectIndex === objectIndex &&
              editablePageIndex?.pageIndex === pageIndex ? (
             <>
             <Editor
               setSop={setContent}  contents={page.pageContent}
                //  onChange={(content) =>
                //    handlePageSave(objectIndex, pageIndex, content)
                //  }
               />
                  <button onClick={() => fetchData(requestOptions,arr[0].id)}>
                    update
                  </button>
             </>  
                
              ) : (
                <>
                    <p>{editablePageIndex?.objectIndex}</p>
                  <h3>{page.pageTitle}</h3>
                  <HtmlViewer html={page.pageContent} />
                  {/* {page.pageContent} */}
                  <button onClick={() => handlePageEdit(objectIndex, pageIndex)}>
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}</>
        // </Slider>
        : "no data"}
        </div>    
      </div>
    ))}
  </div></div>
</React.Fragment>
)
}

export default DynamicComponent;





  
//  <Sops />
