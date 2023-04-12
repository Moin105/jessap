import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import SideBar from "./Components/SideBar";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Cookies from 'js-cookie';
import Container from "./Components/Container";
import Signin from "./Components/Signin/Signin";
import { store } from "./app/store";
import { Counter } from './features/counter/Counter';
import './App.css';
import { Route,Redirect,Routes ,useNavigate,Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import AddSop from "./Components/Container/AddSop";
import SopAdd from "./Components/Container/SopAdd";
import Signup from "./Components/Signup/Signup";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [show, setShow] = useState(false);
  const currentState = store.getState(); 
  const auth = useSelector(state => state.auth);
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const handleAuthentication = (status) => {
    console.log(status)
    setIsAuthenticated(status);
  };
  // Function to handle route change
  const handleRouteChange = (route) => {
    // Use the navigate() function to navigate to the specified route
    navigate(route);
  };
useEffect(() => {

console.log(token)
  if(token){
    setIsAuthenticated(true)
  }else{
    setIsAuthenticated(false)
  }
}, [])
// const auth = useSelector(state => state.auth);
const isLoggedIn = Boolean(Cookies.get("token"));

  return (
    <div className="App">
    <div className="wrapper">
    {/* <Signin/> */}
        <Routes>
        {/* <Route  path="/"  element={<Signin/>}/> */}
        {/* {isLoggedIn ? ( */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Signin onLogin={handleAuthentication} /> : <Navigate to="/home" replace />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup onSignup={handleAuthentication} /> : <Navigate to="/home" replace />}
        />
        {/* <Route exact path="/" element={<Signin/>} /> */}
        <Route path="/" element={<AuthenticatedRoute isAuthenticated={isAuthenticated} />}>

        {/* <Route to="/" element={<Signin/>}/> */}
         <Route
           path="/home"
           element={
             <>
               <React.Fragment>
                 <SideBar show={show} setShow={setShow} />
               </React.Fragment>
               <React.Fragment>
                 <Container show={show} setShow={setShow} />
               </React.Fragment>
             </>
           }
         />
           <Route
           path="/addsops"
           element={
             <>
               <React.Fragment>
                 <SideBar show={show} setShow={setShow} />
               </React.Fragment>
               <React.Fragment>
                 <SopAdd show={show} setShow={setShow} />
               </React.Fragment>
             </>
           }
         />
        </Route>  
                   {/* <Route path="/addsops" element={<AddSops />} /> */}
      {/* ) : ( */}
        {/* // Redirect to sign in page for unauthorized users */}
        
      {/* )} */}
            
        </Routes>
      
    </div>
  </div>
  );
}

export default App;
