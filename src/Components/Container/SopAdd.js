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

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

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
    postData(sopformat)
      .then((res) => {
        console.log("safweewg", res);
        // Handle successful API call
      })
      .catch((error) => {
        // Handle errors
      });
    // try {
    //   // const response = await signup(values);
    //   // const {password , email} = values;
    //   //   console.log(password ,email )

    // //   const { email } = response.user;
    // //   const   {password} = values.password
    //   // Dispatch loginSuccess action with token
    //   // dispatch(signupSuccess());
    //   // const checkForSuccessfull = (str) => {
    //   //   return str.includes('successfull');
    //   // };
    // }catch{

    // }
    //   const inputString = 'The operation was successfull!';
  };
  return (
    <React.Fragment>
      <div className="container">
        <Header show={show} setShow={setShow} />
        <Editor setSop={setContent} />
        <div className="contaiers">
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
              <Form>
                <FormControl>
                  <FormLabel htmlFor="title">Example SOP</FormLabel>
                  <Field as={Input} type="title" name="title" id="title" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Enter description"
                  />
                </FormControl>
                <button
                  style={{ margin: "10px 0px" }}
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
