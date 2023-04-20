import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import Header from "../Header";
import Sops from "./Sops";
import AddSops from "./AddSops";
import { Formik, Form, Field,useFormik } from "formik";
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
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedValue, setSelectedValue] = useState("Single SOP");
  const [pages, setPages] = useState([]);

  // const formik = useFormik({
  //   initialValues:{
  //               title: "",
  //               description: "",
  //               pages: [
  //                 { pageTitle: "", pageNumber: "1", pageContent: content },
  //               ],
  //             }
 
  // });
  
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };
  useEffect(() => {
    console.log("qwertyuiolkjhgfds", content);
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
  const formik = useFormik({
    initialValues:{
      title: "",
      description: "",
      pages: [
        { pageTitle: "", pageNumber: "1", pageContent: content },
      ],
    },
    onSubmit: (values) => {
      console.log("Submitted values:", values);
    },
  });
  const handleLogin = async (values, { setSubmitting }) => {
    console.log("qwertyyuiu", values, content);
    setSopFormat({
      title: values.title,
      description: values.description,
      pages: [{ pageTitle: values.title, pageNumber: "1", pageContent: content }],
    });
    console.log("khan painchod", sopformat);
    setTimeout(() => {
      console.log("khan painchod", sopformat);
    }, 3000);
    postData({
      title: values.title,
      description: values.description,
      pages: [
        { pageTitle: values.title, pageNumber: "1", pageContent: content },
      ],
    })
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
  const handleLoginMultiple = async (values, { setSubmitting }) => {
    // setPageNumber(pageNumber + 1)
    // console.log("qwertyyuiu", values, content);
    const newPage = {
      pageTitle: values.pageTitle,
      pageNumber: pageNumber,
      pageContent: content,
    };
    setPages([...pages, newPage]);
    setPageNumber(pageNumber + 1);
    console.log("sigma",newPage,pages)
    // formik.resetForm();
    setSopFormat({
      title: values.title,
      description: values.description,
      pages: pages,
    });
    console.log("khan painchod", sopformat);
    setTimeout(() => {
      console.log("khan painchod", sopformat);
    }, 3000);
    console.log(formik)
    formik.resetForm();
    // postData({
    //   title: values.title,
    //   description: values.description,
    //   pages: pages,
    // })
    //   .then((res) => {
    //     console.log("safweewg", res);
    //     const isPresent = checkForSuccessfull(res.message);
    //     //   "Company Registered successfully."
    //     console.log(isPresent);
    //     if (isPresent) {
    //       handleRouteChange("/home");
    //     }
    //     // Handle successful API call
    //   })
    //   .catch((error) => {
    //     // Handle errors
    //   });
  };
  const handleLoginMultiples = async (values, { setSubmitting }) => {
    // setPageNumber(pageNumber + 1)
    // console.log("qwertyyuiu", values, content);
    // const newPage = {
    //   pageTitle: values.pageTitle,
    //   pageNumber: pageNumber,
    //   pageContent: content,
    // };
    // setPages([...pages, newPage]);
    // setPageNumber(pageNumber + 1);
    // console.log("sigma",newPage,pages)
    // // formik.resetForm();
    // setSopFormat({
    //   title: values.title,
    //   description: values.description,
    //   pages: pages,
    // });
    // console.log("khan painchod", sopformat);
    // setTimeout(() => {
    //   console.log("khan painchod", sopformat);
    // }, 3000);
    // console.log(formik)
    // formik.resetForm();
    postData({
      title: values.title,
      description: values.description,
      pages: pages,
    })
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
  // const multipleHandleSubmit = (values) => {
  //   console.log("Submitted values:", values);

  // };


  const handleReset = () => {
    formik.resetForm();
  };
  return (
    <React.Fragment>
      <div className="container">
        <Header show={show} setShow={setShow} />

        <div
          className="container-sop"
          style={{ width: "100%", alignItems: "center" }}
        >
          <h2>Add SOP</h2>
          {selectedValue == "Single SOP" && (
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
              onSubmit={handleLoginMultiples}
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
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default SopAdd;
