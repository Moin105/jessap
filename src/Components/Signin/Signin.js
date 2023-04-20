import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import {auth as auther,provider} from '../../firebase';
// import firebase from '../../firebase';
import { signInWithPopup } from "firebase/auth";
// import 'firebase/auth';
// import firebase from 'firebase/app';
// import 'firebase/auth';

// const provider = new firebase.auth.GoogleAuthProvider();
// import { useNavigate } from 'react-router-dom';
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
 useEffect(() => {
   console.log("wertyj",auth)
   if(   Cookies.get('token') == (null ||""||undefined)){
    handleRouteChange('/login')
  }else{
    handleRouteChange('/home')
  }
 }, [])
 
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
      handleRouteChange('/home')
    } catch (error) {
      // Handle login error
      setSubmitting(false);
    }
  };
  const [userData ,setUserData]=useState({email:'',password:''})
  const signInWithGoogle = () => {
    // GoogleSignUp
    signInWithPopup(auther,provider).then(async (data)=>{
            console.log("sharjeela",data.user.providerData[0].email)
            console.log("sharjeela",data.user.providerData[0].uid)
            console.log("sharjeela",data.user.providerData[0].displayName)
            setUserData({...userData,email:data.user.providerData[0].email})
            setUserData({...userData,password:data.user.providerData[0].uid})
            console.log("sharjeeela",userData)
            var email = '';
            var password = '';
            var names = '';
            email = data.user.providerData[0].email;
            names = data.user.providerData[0].displayName
            password = data.user.providerData[0].uid;
      const response = await       fetch('https://phplaravel-391561-3408566.cloudwaysapps.com/api/GoogleSignUp', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({email,password}),
            });
            if (!response.ok) {
              // Handle error response from the server
              console.log("sharjeela",response)

            }
            const dataas = {
              // message: 'Hello from Component A',
              // sop:data,
              email:email,
              password:password,
              names:names
              // Add more data as needed
            };
            // Parse the response as JSON and return it
            const datas = await response.json();
            console.log("sharjeela",datas)
            if(datas.message == 'User found'){
              handleLogin({email,password},{})
            }else{
              navigate(`/signup`, { state: { dataas } });
            }
            return datas;
            // console.log("sharjeela",response)
            // console.log("sharjeela",data.user)
    })

    // console.log("sharjeel",firebase)
    // const provider = new auth.GoogleAuthProvider();
    // const provider = new GoogleAuthProvider();

    // console.log("sharjeela",provider)
    // // const provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithPopup(provider);
  }
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
                 <FormControl className="group">
                <FormLabel htmlFor="email">Email</FormLabel>
                <Field as={Input} type="email" name="email" id="email" />
              </FormControl>
              <FormControl mt={4} className="group">
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
            <button onClick={signInWithGoogle}>
                Sign in with Google
            </button>
    </div>
    </div>
  );
};
export default Signin

// export default ;
