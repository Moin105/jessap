import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from "../../features/counter/authActions";
import { signupSuccess } from "../../features/counter/authActions";
// import { registerUser } from '../features/auth/authActions'
import { Link } from "react-router-dom";
// import { registerUser } from "../../features/auth/authAction";
import { useEffect } from "react";
import { onlineManager } from "react-query";
// import { signupSuccess } from '../redux/actions/authActions';
// import api from '../../api/api'
export const login = async (formData) => {
  console.log("firstttt")
  try {
    console.log("firstttssst")
    // Make a POST request to the login API endpoint with the form data
    const response = await fetch('https://phplaravel-391561-3408566.cloudwaysapps.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // Handle error response from the server
      throw new Error('Failed to login');
    }

    // Parse the response as JSON and return it
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any errors that occur during the request
    throw new Error('Failed to login');
  }
};
const Signin = ({onLogin}) => {
  const navigate = useNavigate();

  // Function to handle route change
  const handleRouteChange = (route) => {
    // Use the navigate() function to navigate to the specified route
    navigate(route);
  };

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
//  useEffect(() => {
//    console.log("wertyj",auth)
//    if(auth.token == null){
//     handleRouteChange('/')
//   }else{
//     handleRouteChange('/home')
//   }
//  }, [])
 
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await login(values);
      const { token } = response.data;

      // Dispatch loginSuccess action with token
      dispatch(loginSuccess(token));
            console.log("token",token)
      if(token !== ""){
        Cookies.set('token', token);
        console.log("marijuana",onLogin)
        onLogin(true)
        // isAuthenticated(true)
        // handleRouteChange('/home')
        // history.push('route');
      }
      // Handle successful login, e.g., redirect to dashboard
    
      // Reset form and set submitting to false
      setSubmitting(false);
    } catch (error) {
      // Handle login error
      setSubmitting(false);
    }
  };

  return (
    <div className="sign-up">
      {/* {userInfo} */}
{/* <>{success },</> */}
      {/* <div className="container"> */}
        {/* <Formik
          initialValues={{ email: "", password: "" }}
         onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Field as={Input} type="email" name="email" id="email" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Field
                  as={Input}
                  type="password"
                  name="password"
                  id="password"
                />
              </FormControl>
              <Button
                mt={4}
                colorScheme="blue"
                type="submit"
                onClick={handleLogin}
              >
                Submit
              </Button>
            </Form>
          )}

        </Formik> */}
      {/* </div> */}
      <div className="containers">
      {/* Render login form using Formik */}
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
                 <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Field as={Input} type="email" name="email" id="email" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Field
                  as={Input}
                  type="password"
                  name="password"
                  id="password"
                />
              </FormControl>
              {/* <Button
                mt={4}
                colorScheme="blue"
                type="submit"
                onClick={submitForm}
              >
                Submit
              </Button> */}
            {/* <Field type="email" name="email" placeholder="Email" />
            <Field type="password" name="password" placeholder="Password" /> */}
            <button style={{margin:"10px 0px"}} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Submit'}
            </button>
            <span>Dont have an account?<Link to="/signup"><p>Sign Up</p></Link></span>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};
export default Signin

// export default ;
