import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import SideBar from "./Components/SideBar";
import Cookies from 'js-cookie';
import Container from "./Components/Container";
import Signin from "./Components/Signin/Signin";
import { store } from "./app/store";
import { Counter } from './features/counter/Counter';
import './App.css';
import { Route,Redirect,Routes ,useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import AddSop from "./Components/Container/AddSop";
import SopAdd from "./Components/Container/SopAdd";


function App() {
  const [show, setShow] = useState(false);
  const currentState = store.getState(); // Retrieve the current state from the Redux store
  const auth = useSelector(state => state.auth);
  const token = Cookies.get('token');
  const navigate = useNavigate();

  // Function to handle route change
  const handleRouteChange = (route) => {
    // Use the navigate() function to navigate to the specified route
    navigate(route);
  };
// useEffect(() => {

// console.log(token)
// }, [currentState])
// const auth = useSelector(state => state.auth);
useEffect(() => {
  console.log("wertyj",auth)
  if(auth.token == null){
   handleRouteChange('/')
 }else{
   handleRouteChange('/home')
 }
}, [auth])
const isLoggedIn = Boolean(Cookies.get("token"));

  return (
    <div className="App">
    <div className="wrapper">
    {/* <Signin/> */}
        <Routes>
        {/* <Route  path="/"  element={<Signin/>}/> */}
        {/* {isLoggedIn ? ( */}
        <Route exact path="/" element={<Signin/>} />

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
