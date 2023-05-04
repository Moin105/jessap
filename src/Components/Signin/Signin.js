import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import "./styles.css";
import {BiShow} from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
// import store from '../../app/store'
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import {auth as auther,provider} from '../../firebase';
import { setRole, setEmployeeId } from "../../features/counter/userSlice";
import { signInWithPopup } from "firebase/auth";
import { loginSuccess } from "../../features/counter/authActions";
import { signupSuccess } from "../../features/counter/authActions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { onlineManager } from "react-query";
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
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    // event.preventDefault();
    if (!values.password) {
      setPasswordError('Password is required');
      console.log(passwordError)
    } else {
      setPasswordError('');
    }
    if (!values.email) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      setEmailError('Invalid email address');
      console.log(emailError)
    } else {
      setEmailError('');
    }
    if (values.password && values.email) {
      console.log('Form submitted successfully');
  
    try {
      const response = await login(values);
      console.log("marijuana",response)
      const { token } = response.data;

      dispatch(loginSuccess(token));
            console.log("token",response.data.user.id)
      if(token !== ""){
        Cookies.set('token', token);
        Cookies.set('role', response.data.user.role);
        Cookies.set('employeeId', response.data.user.id);
        console.log("marijuana",response.data.user.role)
        dispatch(setRole(response.data.user.role));
        dispatch(setEmployeeId(response.data.user));
        onLogin(true)
        
      }

      setSubmitting(false);
      handleRouteChange('/home')
    } catch (error) {
      if(error){
       setError(error.message) 
      setSubmitting(false);}
    }
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
      <div className="containers">
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
                  type={showPassword ?"text": "password"}
                  name="password"
                  id="password"
                /><span onClick={()=>{setShowPassword(!showPassword)}}><BiShow/></span>
              </FormControl>
            <button style={{margin:"10px 0px"}} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
            <button onClick={signInWithGoogle}>
            Continue with Google
            </button>
        <span>Don't have an account?<Link to="/signup"><p>Sign Up</p></Link></span>
    </div>
    </div>
  );
};
export default Signin

// export default ;
