import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import Header from "../Header";
import Sops from "./Sops";
import AddSops from "./AddSops";
import { Formik, Form, Field } from "formik";
import Cookies from 'js-cookie';

import { Route, Routes } from "react-router-dom";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import "./styles.css";
import "../Signin/styles.css";
import {FiChevronDown} from 'react-icons/fi'
function SopAdd({ show, setShow }) {
  const [content, setContent] = useState(null);
  const [sopformat, setSopFormat] = useState({});
  useEffect(() => {
    console.log("qwertyuiolkjhgfds", content);
  }, [content]);
  async function postData(data) {
    console.log("mpeen",data)
    try {
      const response = await fetch(
        "https://phplaravel-391561-3408566.cloudwaysapps.com/api/SOPs",
        {
          method: "POST",
          // mode: "no-cors",
          headers: {
            'Authorization':`Bearer  ${Cookies.get("token")}`,
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

  const handleLogin = async (values, { setSubmitting }) => {
    console.log("qwertyyuiu", values, content);
    setSopFormat({
      title: values.title,
      description: values.description,
      pages: [{ pageTitle: "ok", pageNumber: "1", pageContent: content }],
    });
    console.log("khan painchod", sopformat);
    setTimeout(() => {
      console.log("khan painchod", sopformat);
    }, 3000);
    postData({
      title: values.title,
      description: values.description,
      pages: [{ pageTitle: "ok", pageNumber: "1", pageContent: content }],
    })
      .then((res) => {
        console.log("safweewg", res);
        // Handle successful API call
      })
      .catch((error) => {
        // Handle errors
      });
  };
  return (
    <React.Fragment>
      <div className="container">
        <Header show={show} setShow={setShow} />
       
        <div className="container-sop" style={{width:"100%",alignItems:"center"}}>
          <h2>Add SOP</h2>
          <Formik
            initialValues={{
              title: "",
              description: "",
              pages: [
                { pageTitle: "ok", pageNumber: "1", pageContent: content },
              ],
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
                <FormControl style={{position:"relative"}}>
                  <FormLabel htmlFor="title">Sop</FormLabel>
                  <Field as={Input}isReadOnly={true} type="s" name="title" id="s" value={"Single SOP"} />
                  <span style={{fontSize:"25px",position:"absolute",right:"10px",top: "45px",color: "#848489"}}>  
                  <FiChevronDown color='green.500' />
                  </span>
                </FormControl>
               </div> 
                <FormControl style={{
    display:"flex",flexDirection:"column"}}>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Field
                    as="textarea"
                    id="description"
                  
                    name="description"
                  />
                </FormControl>
                <Editor setSop={setContent}  contents={content}/>
                <button
                  style={{ margin: "10px 0px",maxWidth:"320px",width:"95%" }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SopAdd;
