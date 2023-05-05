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
  Spinner,
  Stack
} from "@chakra-ui/react";
import "./styles.css";
import "../Signin/styles.css";
import { FiChevronDown } from "react-icons/fi";
function SopAdd({ show, setShow }) {
  const [content, setContent] = useState(null);
  const [sopformat, setSopFormat] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedValue, setSelectedValue] = useState("Single SOP");
  const [pages, setPages] = useState([]);
  const [showFields, setShowFields] = useState(false);
  const [values, setValues] = useState({});
  const [textvalues, setTextValues] = useState({});
  const [pageTitle, setPageTitle] = useState("");
  // new formation
  const [showEditor, setShowEditor] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const myInputs = useRef(null);
  const editor = useRef(null);
  // const handleSelectChange = (event) => {
  //   const value = event.target.value;
  //   setSelectedValue(value);
  // };
  const handleClearEditor = () => {
    setContent("");
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const getValues = (e) => {
    e.preventDefault();

    // const values = {};
    const inputs = myInputs.current.querySelectorAll("input");
    const textareas = myInputs.current.querySelectorAll("textarea");
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    textareas.forEach((textarea) => {
      textvalues[textarea.name] = textarea.value;
    });
    console.log("values", values, textvalues, content);
    const sopContent = content;
    console.log("values", values, textvalues, sopContent);
    if (values.title && textareas.description !== "") {
      setShowEditor(true);
      setIsDisabled(true);
    } else {
      setShowEditor(false);
      setIsDisabled(false);
    }

    console.log(values, textvalues, content, sopContent);
    // console.log("khan painchod", sopformat);
  };
  useEffect(() => {
    if (!isChecked) {
      setSopFormat({
        title: values.title,
        description: textvalues.description,
        pages: [
          { pageTitle: values.title, pageNumber: 1, pageContent: content },
        ],
      });
    }
    console.log("qwertyuiolkjhgfds", sopformat);
  }, [content]);

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
      setIsLoading(false);
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
    setIsLoading(true)
    console.log("qwertyyuiu", sopformat);
    const sopContent = content;
    console.log(values, textvalues, content, "firstPage");
    console.log("khan painchod", sopformat);
    postData(sopformat)
      .then((res) => {
        console.log("safweewg", res);
        const isPresent = checkForSuccessfull(res.message);
        //   "Company Registered successfully."
        console.log(isPresent);
        if (isPresent) {
          handleRouteChange("/home");
          setIsLoading(false);
        }else{
        
        }  setIsLoading(false);
        // Handle successful API call
      })
      .catch((error) => {   setIsLoading(false)});
  };

  const addNewPage = async (e) => {
    // setContent(null);
    
    getValues(e);
    e.preventDefault();
    const inputs = myInputs.current.querySelectorAll("input");
    console.log("mir", values, textvalues, content);

    setPageNumber((pageNumber) => {
      return pageNumber + 1;
    });

    inputs.forEach((input) => {
      console.log("input", input.name);
      if (input.name === "pagetitle") {
        input.name = "";
      }
    });
  };

  const multipleHandleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    console.log("qwertyyuiu", sopformat);
    postData(sopformat)
      .then((res) => {
        console.log("safweewg", res);
        const isPresent = checkForSuccessfull(res.message);
        //   "Company Registered successfully."
        console.log(isPresent);
        if (isPresent) {
          handleRouteChange("/home");
          setIsLoading(false);

        }else{
          setIsLoading(false)
        }
        // Handle successful API call
      })
      .catch((error) => {});
  };
  useEffect(() => {
    if (isChecked) {
      const newPage = {
        pageTitle: values.pagetitle,
        pageNumber: pageNumber,
        pageContent: content,
      };
      console.log(newPage);
      // setPages([...pages, newPage]);
      if (
        sopformat.pages.length == 1 &&
        sopformat.pages[0].pageNumber == pageNumber
      ) {
        console.log("maa ka bharosa ", sopformat.pages.length);
        {
          setSopFormat({
            title: values.title,
            description: textvalues.description,
            pages: [
              { pageTitle: values.title, pageNumber: 1, pageContent: content },
            ],
          });
          const inputs = myInputs.current.querySelectorAll("input");
          inputs.forEach((input) => {
            console.log("input", input.name);
            if (input.name === "pagetitle") {
              input.name = '';
            }
          });
          handleClearEditor();
        }
      } else {
        setSopFormat((prevState) => {
          prevState = {
            title: values.title,
            description: textvalues.description,
            pages: [...sopformat.pages, newPage],
          };
          return prevState;
        });
        const inputs = myInputs.current.querySelectorAll("input");
        inputs.forEach((input) => {
          console.log("input", input.name);
          if (input.name === "pagetitle") {
            input.name = '';
          }
        });
        handleClearEditor();
      }
      console.log(sopformat.pages);
    }
  }, [pageNumber]);

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
                <input
                  type="text"
                  placeholder="SOP Title"
                  name="title"
                  disabled={isDisabled}
                />
              </div>
              <div className="group">
                <label>SOP Description</label>
                <textarea
                  type="text"
                  placeholder="SOP Description"
                  name="description"
                  className="text-area"
                  disabled={isDisabled}
                />
              </div>
            </div>
            {showEditor && (
              <div className="checkboxer">
                <h2>Add Content</h2>
                <label style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    style={{
                      width: "20px",
                      height: "20px",
                      margin: "0px 10px 0px 0px",
                    }}
                  />
                  Multi-page SOP
                </label>
                {isChecked && (
                  <div className="group">
                    <label>SOP Page Title</label>
                    <input
                      type="text"
                      placeholder="SOP Title"
                      name="pagetitle"
                    />
                  </div>
                )}
                <Editor
                  setSop={setContent}
                  onChange={setContent}
                  contents={content}
                />
              </div>
            )}
        
            {!isChecked ? (
              <>
                {" "}
                {!showEditor ? (
                  <button
                    style={{
                      margin: "10px 0px",
                      maxWidth: "145px",
                      fontSize: "14px",
                      width: "95%",
                    }}
                    onClick={getValues}
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    style={{
                      margin: "10px auto",
                      maxWidth: "145px",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      fontSize: "14px",
                      width: "95%",
                    }}
                    onClick={(e) => handleLogin(e)}
                  >
                 {isLoading ? <Stack  direction='row'><Spinner   
                  speed='0.65s'
                  // emptyColor='gray.200'
                  color='blue.500'
                  style={{width:'20px',height:'20px'}}
                  size='xl'/></Stack> : "Finalise SOP"}
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  style={{
                    margin: "10px 0px",
                    maxWidth: "145px",
                    fontSize: "14px",
                    width: "95%",
                  }}
                  onClick={(e) => {
                    addNewPage(e);
                  }}
                >
                  Add New Page
                </button>
                <button
                  style={{
                    margin: "10px 0px 0px 10px",
                    maxWidth: "145px",
                    fontSize: "14px",
                    
                    width: "95%",
                  }}
                  onClick={multipleHandleSubmit}
                >
                   {isLoading ? <Stack  direction='row' spacing={4}><Spinner   
                  speed='0.65s'
                  color='blue.500'
                  style={{margin:"0 auto",width:'15px',height:'15px'}}
                  size='xl'/></Stack> : "Finalise SOP"}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SopAdd;
