import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import { addEmployeeFailure,addEmployeeRequest,addEmployeeSuccess } from "../../features/counter/employeeAddActions";
import { useNavigate } from 'react-router-dom';
// import { loginSuccess } from "../../features/counter/authActions";
// import { login } from "../Signin/Signin";
// import { signupSuccess } from "../../features/counter/authActions";
// import { registerUser } from '../features/auth/authActions'
// import { registerUser } from "../../features/auth/authAction";
import { useEffect } from "react";
// import { signupSuccess } from '../redux/actions/authActions';
// import api from '../../api/api'
export const addEmploye =async (employee, token) => {
  return (dispatch) => {
    // dispatch(addEmployeeRequest());
    console.log("response1",employee)
    fetch("https://phplaravel-391561-3408566.cloudwaysapps.com/api/addEmployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employee),
    })
      .then((response) => {response.json();console.log("response")})
      .then((data) => {
        console.log("data")
        dispatch(addEmployeeSuccess(data));
      })
      .catch((error) => {
        dispatch(addEmployeeFailure(error.message));
      });
  };
};
const AddEmployee = ({isAuthenticated}) => {
  const navigate = useNavigate();

  // Function to handle route change
  const handleRouteChange = (route) => {
    // Use the navigate() function to navigate to the specified route
    navigate(route);
  };

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

 
  // const handleLogin = async (values) => {
  //   try {
  //     const response = await addEmployee(values);
  //   //   const {password , email} = values;
  //       // console.log(password ,email )
  //     dispatch(addEmployeeSuccess());
  //     const checkForSuccessfull = (str) => {
  //       return str.includes('successfull');
  //     };
      
  //   //   const inputString = 'The operation was successfull!';
  //     const isPresent = checkForSuccessfull(response.message);
  //     // setSubmitting(false);
  //   //   "Company Registered successfully."
  //     console.log(isPresent); 
  //   //   if(isPresent){
  //   //     try {
  //   //         const response = await login({email,password});
  //   //         const { token } = response.data;
      
  //   //         // Dispatch loginSuccess action with token
  //   //         dispatch(loginSuccess(token));
  //   //               console.log("token",token)
  //   //         if(token !== ""){
  //   //           Cookies.set('token', token);
      
  //   //           handleRouteChange('/home')
  //   //           // history.push('route');
  //   //         }
  //   //         // Handle successful login, e.g., redirect to dashboard
          
  //   //         // Reset form and set submitting to false
  //   //         setSubmitting(false);
  //   //       } catch (error) {
  //   //         // Handle login error
  //   //         setSubmitting(false);
  //   //       }
  //   //   }
 
  //   } catch (error) {
  //     // setSubmitting(false);
  //   }
  // };
  const checkForSuccessfull = (str) => {
    return str.includes('Employee Added Successfully');
  };
  const handleSubmit= async (values,) => {
    
      console.log(values)
      // return (dispatch) => {
        dispatch(addEmployeeRequest());
        console.log("response1",values)
        fetch("https://phplaravel-391561-3408566.cloudwaysapps.com/api/addEmployee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify(values),
        })
          .then((response) => {return response.json();console.log("response",response)})
          .then((response) => {
            console.log("data",response)
            dispatch(addEmployeeSuccess(response));
            const isPresent = checkForSuccessfull(response.message);
            //   "Company Registered successfully."
            console.log(isPresent);
            if (isPresent) {
              handleRouteChange("/home");
            }
          })
          .catch((error) => {
            dispatch(addEmployeeFailure(error.message));
          });
      // };
      // const response = await addEmploye(values,Cookies.get("token"));
      // const { token } = response.data;
  // console.log("response",response)
      // Dispatch loginSuccess action with token
      // dispatch(addEmployeeSuccess(token));
      //       console.log("token",token)
      // if(token !== ""){
      //   Cookies.set('token', token);
      //   console.log("marijuana",onLogin)
      //   onLogin(true)
      //   // isAuthenticated(true)
      //   // handleRouteChange('/home')
      //   // history.push('route');
      // }
      // // Handle successful login, e.g., redirect to dashboard
    
      // // Reset form and set submitting to false
      // setSubmitting(false);

  };

  return (
    <div className="sadie">
   <div className="contaiers">
      <Formik
        initialValues={{ first_name:'',sur_name:'',email: '', password: '', role: 'employee'}}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form> 
            <div className="dispo">
            <FormControl>
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <Field as={Input} type="first_name" name="first_name" id="first_name" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="sur_name">SurName</FormLabel>
                <Field as={Input} type="sur_name" name="sur_name" id="sur_name" />
              </FormControl>     
            </div>
            <div className="dispo">
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
            </div>
            <button  style={{margin:"10px 0px"}} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};
export default AddEmployee

// export default ;
