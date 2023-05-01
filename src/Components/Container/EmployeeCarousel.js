import React,{useEffect, useState} from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './overrides.css'
import {GrFormPrevious,GrNext} from 'react-icons/gr'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import HtmlViewer from './HtmlViewer';
import Editor from './Editor';
const EmployeeCarousel = ({ objectData }) => {

    const [selectedPage, setSelectedPage] = useState(null);
    const [editorContent, setEditorContent] = useState('');
    const { steps,title,description,user_id } = objectData;
    const [pages, setPages] = useState(steps);
    const navigate = useNavigate();
    const checkForSuccessfull = (str) => {
        return str.includes('successfully');
      };
    const arrowStyles = {
      position: "absolute",
      top: "0",
      bottom: "auto",
      padding: ".4em",
      zIndex: 2,
     
      width: "55px",
      height: "100%",
    };
    const handleRouteChange = (route) => {
        // Use the navigate() function to navigate to the specified route
        navigate(route);
      };
      const requestOptions = {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get("token") 
        },
        body: JSON.stringify({title:title,pages:pages,description:description})
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
    const handleEditButtonClick = (page) => {
      setSelectedPage(page);
      setEditorContent(page.pageContent);
    };
  
    const handleEditorChange = (content) => {
      setEditorContent(content);
    };
  
    const handleSaveButtonClick = () => {
        console.log(pages)
      const updatedPages = pages.map((page) =>
        page.id === selectedPage?.id
          ? { ...page, pageContent: editorContent }
          : page
      );
      setPages(updatedPages);
    //   setPages(updatedPages);
    //   setSelectedPage(null);
      console.log(pages)
    };
useEffect(() => {
    handleSaveButtonClick()
}, [editorContent])

  return (
    <Carousel
    renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="arrow"
            style={{
              ...arrowStyles,
              left: "0",
              backgroundColor: "transparent",
              border: "none",
              margin: "auto 0px ",
            }}
          >
            {" "}
            <GrFormPrevious/>
            {/* <Image src={prev} alt="quote" width={52} height={52} smooth /> */}
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            className="arrow"
            onClick={onClickHandler}
            title={label}
            style={{
              ...arrowStyles,
              right: 0,
              background: "transparent",
              border: "none",
              margin: "auto 0px ",
            }}
          >
            {" "}
            <GrNext/>
            {/* <Image src={next} alt="quote" width={52} height={52} /> */}
          </button>
        )
      }
      showStatus={false}
      showThumbs={false}
      // autoPlay={true}
      style={{ ...arrowStyles, left: 15 }}
    >
      {steps.map((page, index) => (
        <div key={index} className='page-content'>
       {page.id == selectedPage?.id ? <>  <div className='clisco'>  
          <h3>{page.pageTitle}</h3>
          <Editor setSop={setEditorContent} onChange={handleEditorChange} contents={editorContent}/>
          {/* <p className='content' dangerouslySetInnerHTML={{ __html: page.pageContent }} /> */}
          </div>  
          <button   className='button' onClick={() =>{ handleSaveButtonClick(page);fetchData(requestOptions,page.sop_id)}}>Finalise</button></>: 
          <>  <div className='clisco'>  
          <h3>{page.pageTitle}</h3>
          <HtmlViewer html={page.pageContent}  sopId={page.sop_id} userId={user_id}/>
          </div>  
          {/* <button   className='button' onClick={() => {handleEditButtonClick(page);}}>bc</button> */}
          </>
          }
        </div>
      ))}
    </Carousel>
  );
};

export default EmployeeCarousel;