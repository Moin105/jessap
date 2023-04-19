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
import { Route,Redirect,Routes ,useNavigate,Navigate,useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import AddSop from "./Components/Container/AddSop";
import SopAdd from "./Components/Container/SopAdd";
import Signup from "./Components/Signup/Signup";
import ShowSop from "./Components/Container/ShowSop";
import AddEmployee from "./Components/Container/AddEmployee";
import DynamicComponent from "./Components/Container/ShowSop";
import Users from "./Components/Container/Users";
import EditSop from "./Components/Container/EditSop";
import Header from "./Components/Header";
import AssignSop from "./Components/Container/AssignSop";
import NoPage from "./Components/Container/NoPage";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [show, setShow] = useState(false);
  const currentState = store.getState(); 
  const auth = useSelector(state => state.auth);
  const token = Cookies.get('token');
  const handleAuthentication = (status) => {
    console.log(status)
    setIsAuthenticated(status);
  };
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  // Function to handle route change
  const handleRouteChange = (route) => {
    // Use the navigate() function to navigate to the specified route
    navigate(route);
  };
  const isAuthenticateds = useSelector(state => state.auth.isAuthenticated)

useEffect(() => {

console.log(token)

if(token){
  setIsAuthenticated(true)
}else
if(token == undefined && path === (undefined || "/")){
  console.log("yes")
  handleRouteChange("/login")
}
// else 
// if(token !== "" && path== "/signup"){
//   console.log("yes1")
//   handleRouteChange('/home')
// }else 
// if(token !== "" &&  path == "/login"  ){
//   console.log("yes2")
//   handleRouteChange('/home')
// }

  
  else{
    setIsAuthenticated(false)
    // handleRouteChange("/login")
  }
}, [])
useEffect(() => {
  if(isAuthenticated == false && path !== ("/login" || "/signup")){
   console.log("kanjur",path)
   handleRouteChange("/login")
  }else{
    console.log("kanjur2")
  }
}, [isAuthenticated])

// const auth = useSelector(state => state.auth);
// const isLoggedIn = Boolean(Cookies.get("token"));

  return (
    <div className="App">
    <div className="wrapper">
    {/* <Signin/> */}
        <Routes>
        {/* <Route  path="/"  element={<Signin/>}/> */}
        {/* {isLoggedIn ? ( */}
   {  !isAuthenticated ? <>  <Route
          path="/login"
          element={<Signin onLogin={handleAuthentication} /> }
        />
        <Route
          path="/signup"
          element={ <Signup onSignup={handleAuthentication} /> }
        /> </>:
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
                    <Route
           path="/addemployee"
           element={
             <>
               <React.Fragment>
                 <SideBar show={show} setShow={setShow} />
               </React.Fragment>
               <React.Fragment>
               <div className="container">
                <Header show={show} setShow={setShow} />
                 <AddEmployee show={show} setShow={setShow}/>
                </div> 
               </React.Fragment>
             </>
           }
         />
               <Route path="*" element={<NoPage/>} />

           {/* <Route path="/dynamic/:id" component={<ShowSop/>} /> */}
           <Route path="/dynamic/:id" element={<> <React.Fragment>
                 <SideBar show={show} setShow={setShow} />
               </React.Fragment>
           <DynamicComponent show={show} setShow={setShow} /></>} />
           <Route path="/editsop/:id" element={<> <React.Fragment>
                 <SideBar show={show} setShow={setShow} />
               </React.Fragment>
           <EditSop show={show} setShow={setShow} /></>} />
           <Route path="/users" element={<Users show={show} setShow={setShow} />} />
           <Route path="/assignsop" element={<AssignSop show={show} setShow={setShow} />} />
        </Route>  }
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
