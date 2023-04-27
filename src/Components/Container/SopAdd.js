import React, { useEffect, useRef, useState } from "react";
import Editor from "./Editor";
import Header from "../Header";
import Sops from "./Sops";
import AddSops from "./AddSops";
import { Formik, Form, Field, useFormik, useFormikContext } from "formik";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import "./styles.css";
import "../Signin/styles.css";
import { FiChevronDown } from "react-icons/fi";
function SopAdd({ show, setShow }) {
  const [content, setContent] = useState(null);
  const [sopformat, setSopFormat] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedValue, setSelectedValue] = useState("Single SOP");
  const [pages, setPages] = useState([]);
  const [showFields, setShowFields] = useState(false);
  const [values,setValues] = useState({})
  const [pageTitle, setPageTitle] = useState("");
  // new formation
  const [showEditor ,setShowEditor] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const myInputs = useRef(null);
  const editor = useRef(null);
  // const handleSelectChange = (event) => {
  //   const value = event.target.value;
  //   setSelectedValue(value);
  // };
  const handleClearEditor = () => {
    setContent('');
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    
  };
  const getValues = (e) => {
    e.preventDefault();

    // const values = {};
    const inputs = myInputs.current.querySelectorAll("input");
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    if(values.title && values.description !== "" ){
      setShowEditor(true)
      setIsDisabled(true)
    }else{
      setShowEditor(false)
      setIsDisabled(false) 
    }
    console.log(values);
    // for single sop 
    setSopFormat(
      {
        title: values.title,
            description: values.description,
            pages: [{ pageTitle: values.title, pageNumber: pageNumber, pageContent: content }],
      }
    )
  };
  useEffect(() => {
    console.log("qwertyuiolkjhgfds", editor.current);
  }, [content]);
  useEffect(() => {}, []);

  // useEffect(() => {
  //   if(pages.length <= 0){
  //    setShowFields(true)
  //   }else{
  //     setShowFields(false)
  //   }
  // }, [pages])

  async function postData(data) {
    console.log("mpeen", data);
    try {
      const response = await fetch(
        "https://phplaravel-391561-3408566.cloudwaysapps.com/api/SOPs",
        {
          method: "POST",
          // mode: "no-cors",
          headers: {
            Authorization: `Bearer  ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Data posted successfully:", result);
      return result;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  }
  const navigate = useNavigate();
  // Function to handle route change
  const handleRouteChange = (route) => {
    // Use the navigate() function to navigate to the specified route
    navigate(route);
  };
  const checkForSuccessfull = (str) => {
    return str.includes("successfull");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("qwertyyuiu", values, content);
    setSopFormat({
      title: values.title,
      description: values.description,
      pages: [{ pageTitle: values.title, pageNumber: pageNumber, pageContent: content }],
    });
    console.log("khan painchod", sopformat);
    setTimeout(() => {
      console.log("khan painchod", sopformat);
    }, 3000);
    postData(sopformat)
      .then((res) => {
        console.log("safweewg", res);
        const isPresent = checkForSuccessfull(res.message);
        //   "Company Registered successfully."
        console.log(isPresent);
        if (isPresent) {
          handleRouteChange("/home");
        }
        // Handle successful API call
      })
      .catch((error) => {
        // Handle errors
      });
  };
  const addNewPage = async(e) => {
    getValues(e)
    e.preventDefault();
    const inputs = myInputs.current.querySelectorAll("input");
    console.log("mir",values)
    const newPage = {
          pageTitle: values.pagetitle,
          pageNumber: pageNumber,
          pageContent: content,
        };
        setPages([...pages, newPage]);
    setPageNumber(pageNumber + 1);
    console.log("sigma",newPage,pages)
    inputs.forEach((input) => {
      if (input.name === "pagetitle") {
        input.value = "";
      }
    });
    setContent(null);
       setSopFormat({
      title: values.title,
      description: values.description,
      pages: pages,
    });
    handleClearEditor();
  }
  const multipleHandleSubmit = async(e) => {
    e.preventDefault();
    console.log("qwertyyuiu",sopformat);
    postData(sopformat)
    .then((res) => {
      console.log("safweewg", res);
      const isPresent = checkForSuccessfull(res.message);
      //   "Company Registered successfully."
      console.log(isPresent);
      if (isPresent) {
        handleRouteChange("/home");
      }
      // Handle successful API call
    })
    .catch((error) => {
      // Handle errors
    });
  }
  // const handleLoginMultiple = async (values, ) => {
  //   // setPageNumber(pageNumber + 1)
  //   // console.log("mir",formik.values);
  //   console.log("mir",values)
  //   // console.log("qwertyyuiu", values, content);
  //   if(values.pageTitle == ("" ||undefined)){

  //   }else {
  //     setPageTitle(values.pageTitle)
  //   }
  //   const newPage = {
  //     pageTitle: pageTitle,
  //     pageNumber: pageNumber,
  //     pageContent: content,
  //   };
  //   setPages([...pages, newPage]);
  //   setPageNumber(pageNumber + 1);
  //   console.log("sigma",newPage,pages)
  //   // formik.resetForm();
  //   setSopFormat({
  //     title: values.title,
  //     description: values.description,
  //     pages: pages,
  //   });
  //   console.log("khan painchod", sopformat);
  //   // setTimeout(() => {
  //   //   console.log("khan painchod", sopformat);
  //   // }, 3000);
  //   // console.log(formik)
  //   // formik.resetForm();
  //   // postData({
  //   //   title: values.title,
  //   //   description: values.description,
  //   //   pages: pages,
  //   // })
  //   //   .then((res) => {
  //   //     console.log("safweewg", res);
  //   //     const isPresent = checkForSuccessfull(res.message);
  //   //     //   "Company Registered successfully."
  //   //     console.log(isPresent);
  //   //     if (isPresent) {
  //   //       handleRouteChange("/home");
  //   //     }
  //   //     // Handle successful API call
  //   //   })
  //   //   .catch((error) => {
  //   //     // Handle errors
  //   //   });
  // };
  // const handleLoginMultiples = async (values) => {
  //   // setPageNumber(pageNumber + 1)
  //   // console.log("qwertyyuiu", values, content);
  //   // const newPage = {
  //   //   pageTitle: values.pageTitle,
  //   //   pageNumber: pageNumber,
  //   //   pageContent: content,
  //   // };
  //   // setPages([...pages, newPage]);
  //   // setPageNumber(pageNumber + 1);
  //   // console.log("sigma",newPage,pages)
  //   // // formik.resetForm();
  //   // setSopFormat({
  //   //   title: values.title,
  //   //   description: values.description,
  //   //   pages: pages,
  //   // });
  //   // console.log("khan painchod", sopformat);
  //   // setTimeout(() => {
  //   //   console.log("khan painchod", sopformat);
  //   // }, 3000);
  //   // console.log(formik)
  //   // formik.resetForm();
  //   postData({
  //     title: values.title,
  //     description: values.description,
  //     pages: pages,
  //   })
  //     .then((res) => {
  //       console.log("safweewg", res);
  //       const isPresent = checkForSuccessfull(res.message);
  //       //   "Company Registered successfully."
  //       console.log(isPresent);
  //       if (isPresent) {
  //         handleRouteChange("/home");
  //       }
  //       // Handle successful API call
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //     });
  // };
  // const multipleHandleSubmit = (values) => {
  //   console.log("Submitted values:", values);

  // };

  // const handleReset = () => {
  //   formik.resetForm();
  // };
  return (
    <React.Fragment>
      <div className="container">
        <Header show={show} setShow={setShow} />

        <div
          className="container-sop"
          style={{ width: "100%", alignItems: "center" }}
        >
          <h2>Add SOP</h2>
          <form className="form" ref={myInputs}>
            <div className="sikna">
              <div className="group">
                <label>SOP Title</label>
                <input type="text" placeholder="SOP Title" name="title" disabled={isDisabled}/>
              </div>
              <div className="group">
                <label>SOP Description</label>
                <input
                  type="text"
                  placeholder="SOP Description"
                  name="description"
                  disabled={isDisabled}
                />
              </div>
            </div>
            {showEditor && <div className="checkboxer">
              <h2>Add Content</h2>
              <label style={{display:"flex",alignItems:"center"}}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          style={{ width: '20px', height: '20px',margin:"0px 10px 0px 0px" }}
        />
        Multi-page SOP
      </label>
    {isChecked  &&<div className="group">
                <label>SOP Page Title</label>
                <input type="text" placeholder="SOP Title" name="pagetitle" />
              </div>}
              <Editor  setSop={setContent} onChange={setContent} contents={content} />
            </div>  
              }
            {/* <div className="group">
               <label>
                Title
               </label>
               <input type="text" placeholder="title"/>
            </div> */}
     { !isChecked   ?  <>  {!showEditor ? <button
              style={{
                margin: "10px 0px",
                maxWidth: "145px",
                fontSize: "14px",
                width: "95%",
              }}
              onClick={getValues}
            >
              Confirm
            </button>:<button
              style={{
                margin: "10px 0px",
                maxWidth: "145px",
                fontSize: "14px",
                width: "95%",
              }}
              onClick={handleLogin}
            >
              Finalise SOP
            </button>}</> :<>
            <button   style={{
                margin: "10px 0px",
                maxWidth: "145px",
                fontSize: "14px",
                width: "95%",
              }} onClick={addNewPage}>Add New Page</button>
              <button   style={{
                margin: "10px 0px 0px 10px",
                maxWidth: "145px",
                fontSize: "14px",
                width: "95%",
              }} onClick={multipleHandleSubmit}>Finalise SOP</button>
            </> 
            }
          </form>
          {/* {selectedValue !== ("Multiple SOP") && (
            <Formik
              initialValues={{
                title: "",
                description: "",
                pageTitle: "", 
                pageNumber: "1",
                pageContent: content 
              }}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="form">
                  <div className="sikna">
                    <FormControl>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <Field as={Input} type="title" name="title" id="title" />
                    </FormControl>
                    <FormControl style={{ position: "relative" }}>
                      <FormLabel htmlFor="title">Sop</FormLabel>
                      <Select
                        value={selectedValue}
                        onChange={handleSelectChange}
                      >
                        <option value="">Select SOP Method</option>
                        <option value="Single SOP">Single SOP</option>
                        <option value="Multiple SOP">Multiple SOP</option>
                      </Select>
                    </FormControl>
                  </div>
                  <FormControl
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Field as="textarea" id="description" name="description" />
                  </FormControl>
                  <Editor setSop={setContent} contents={content} />
                  <button
                    style={{
                      margin: "10px 0px",
                      maxWidth: "320px",
                      width: "95%",
                    }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Loading..." : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
          )}
          {selectedValue == "Multiple SOP" && (
            <Formik
              initialValues={{
                title: "",
                description: "",
                pages: [
                  { pageTitle: "", pageNumber: "1", pageContent: content },
                ],
              }}
              onSubmit={handleLoginMultiple}
            >
              {({ isSubmitting }) => (
                <Form className="form">
                  <div className="sikna">
              {showFields  &&    <FormControl>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <Field as={Input} type="title" name="title" id="title" />
                    </FormControl>}
                    <FormControl style={{ position: "relative" }}>
                      <FormLabel htmlFor="title">Sop</FormLabel>
                      <Select
                        value={selectedValue}
                        onChange={handleSelectChange}
                      >
                        <option value="">Select SOP Method</option>
                        <option value="Single SOP">Single SOP</option>
                        <option value="Multiple SOP">Multiple SOP</option>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="sikna">
                    {" "}
                    <FormControl>
                      <FormLabel htmlFor="pageTitle">Page Title</FormLabel>
                      <Field
                        as={Input}
                        type="pageTitle"
                        name="pageTitle"
                        id="pageTitle"
                      />
                    </FormControl>
                  </div>
                  {showFields  &&        <FormControl
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Field as="textarea" id="description" name="description" />
                  </FormControl>}
                  <Editor setSop={setContent} contents={content} />
                  <div style={{display: "flex",justifyContent: "flex-end"}}>

                      <button
                        style={{
                          margin: "10px 0px",
                          maxWidth: "145px",
                          fontSize:'14px',
                          width: "95%",
                        }}
                        onClick={handleLoginMultiple}
                      >
                        Add New Page
                      </button>
                  <button
                    style={{
                      margin: "10px 0px",
                      maxWidth: "145px",
                      fontSize:'14px',
                      width: "95%",
                    }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  </div>
                  
                </Form>
              )}
            </Formik>
          )} */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default SopAdd;
