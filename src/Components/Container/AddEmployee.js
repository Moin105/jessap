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
export const addEmployee = (employee, token) => {
    return (dispatch) => {
      dispatch(addEmployeeRequest());
      fetch("https://your-api-url.com/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employee),
      })
        .then((response) => response.json())
        .then((data) => {
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

 
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await addEmployee(values,token);
    //   const {password , email} = values;
        // console.log(password ,email )
      dispatch(addEmployeeSuccess());
      const checkForSuccessfull = (str) => {
        return str.includes('successfull');
      };
      
    //   const inputString = 'The operation was successfull!';
      const isPresent = checkForSuccessfull(response.message);
    //   "Company Registered successfully."
      console.log(isPresent); 
    //   if(isPresent){
    //     try {
    //         const response = await login({email,password});
    //         const { token } = response.data;
      
    //         // Dispatch loginSuccess action with token
    //         dispatch(loginSuccess(token));
    //               console.log("token",token)
    //         if(token !== ""){
    //           Cookies.set('token', token);
      
    //           handleRouteChange('/home')
    //           // history.push('route');
    //         }
    //         // Handle successful login, e.g., redirect to dashboard
          
    //         // Reset form and set submitting to false
    //         setSubmitting(false);
    //       } catch (error) {
    //         // Handle login error
    //         setSubmitting(false);
    //       }
    //   }
 
    } catch (error) {
    }
  };

  return (
    <div className="sign-up">
   <div className="contaiers">
      <Formik
        initialValues={{ email: '', password: '',first_name:'', sur_name:'',role: 'employee'}}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form> 
            <div className="dispo">
            <FormControl>
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <Field as={Input} type="first_name" name="first_name" id="first_name" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="sur_name">Sur Name</FormLabel>
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
            <button style={{margin:"10px 0px"}} type="submit" disabled={isSubmitting}>
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
