import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import { useNavigate ,useLocation} from 'react-router-dom';
import { loginSuccess } from "../../features/counter/authActions";
import { login } from "../Signin/Signin";
// import firebase from '../../firebase';
import { Link } from "react-router-dom";
import { signupSuccess } from "../../features/counter/authActions";
// import { registerUser } from '../features/auth/authActions'
// import { registerUser } from "../../features/auth/authAction";
import { useEffect } from "react";
// import { signupSuccess } from '../redux/actions/authActions';
// import api from '../../api/api'
export const signup = async (formData) => {
  console.log("firstttt")
  try {
    console.log("firstttssst")
    // Make a POST request to the login API endpoint with the form data
    const response = await fetch('https://phplaravel-391561-3408566.cloudwaysapps.com/api/register', {
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
const Signup = ({isAuthenticated}) => {
  const navigate = useNavigate();


 
  const location = useLocation();
  
  // const GoogleLoginButton = () => {
  //   return (
   
  //   );
  // }
  // Function to handle route change
  const handleRouteChange = (route) => {
    // Use the navigate() function to navigate to the specified route
    navigate(route);
  };
  var datae = location?.state?.dataas?.email;
  var datap = location?.state?.dataas?.password;
  var datan = location?.state?.dataas?.names;
  var firstName = '' 
  var lastName ='' 
  useEffect(() => {
console.log("sharjeela",location)
if(location.state  !== null ){
var nameArray = ['','']


  var fullName = datan;
   nameArray = fullName.split(' ');
   firstName = nameArray[0]; 
   lastName = nameArray[1]; }
  }, [location])
  
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
//  useEffect(() => {
//    console.log("wertyj",auth)
//    if(auth.token == null){
//     handleRouteChange('/')
//   }else{
//     handleRouteChange('/home')
//   }
//  }, [auth])
 
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await signup(values);
      const {password , email} = values;
        console.log(password ,email )

    //   const { email } = response.user;
    //   const   {password} = values.password
      // Dispatch loginSuccess action with token
      dispatch(signupSuccess());
      const checkForSuccessfull = (str) => {
        return str.includes('successfull');
      };
      
    //   const inputString = 'The operation was successfull!';
      const isPresent = checkForSuccessfull(response.message);
    //   "Company Registered successfully."
      console.log(isPresent); 
      if(isPresent){
        try {
            const response = await login({email,password});
            const { token } = response.data;
      
            // Dispatch loginSuccess action with token
            dispatch(loginSuccess(token));
                  console.log("token",token)
            if(token !== ""){
              Cookies.set('token', token);
      
              handleRouteChange('/home')
              // history.push('route');
            }
            // Handle successful login, e.g., redirect to dashboard
          
            // Reset form and set submitting to false
            setSubmitting(false);
          } catch (error) {
            // Handle login error
            setSubmitting(false);
          }
      }
            // console.log("token",token)
    //   if(token !== ""){
    //     // Cookies.set('token', token);

    //     handleRouteChange('/home')
    //     // history.push('route');
    //   }
      // Handle successful login, e.g., redirect to dashboard
    
      // Reset form and set submitting to false
    //   setSubmitting(false);
    } catch (error) {
      // Handle login error
    //   setSubmitting(false);
    }
  };

  return (
    <div className="sign-up">
      <div className="contaiers">
      {/* Render login form using Formik */}
      <Formik
        initialValues={{ email:datae, password: datap,first_name:firstName, sur_name:lastName,c_password:datap,signup_type:'normal' ,company:''}}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form> 
            <div className="dispo">
            <FormControl className="group">
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <Field as={Input} type="first_name" name="first_name" id="first_name" />
              </FormControl>
              <FormControl className="group"> 
                <FormLabel htmlFor="sur_name">SurName</FormLabel>
                <Field as={Input} type="sur_name" name="sur_name" id="sur_name" />
              </FormControl>     
            </div>
            <div className="dispo">
            <FormControl className="group">
                <FormLabel htmlFor="email">Email</FormLabel>
                <Field as={Input} type="email" name="email" id="email" />
              </FormControl >
              <FormControl  className="group"mt={4}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Field
                  as={Input}
                  type="password"
                  name="password"
                  id="password"
                />
              </FormControl>
            </div>
            <div className="dispo">
                 
              <FormControl className="group" mt={4}>
                <FormLabel htmlFor="c_password">Confirm Password</FormLabel>
                <Field
                  as={Input}
                  type="password"
                  name="c_password"
                  id="c_password"
                />
              </FormControl>
              <FormControl className="group">
                <FormLabel htmlFor="company">company</FormLabel>
                <Field as={Input} type="company" name="company" id="company" />
              </FormControl>

            </div>
            <button style={{margin:"10px 0px"}} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Submit'}
            </button>
           
          </Form>
        )}
      </Formik>
      <span>Already have an account?<Link to="/login"><p>Sign In</p></Link></span>
    </div>
    </div>
  );
};
export default Signup

// export default ;
