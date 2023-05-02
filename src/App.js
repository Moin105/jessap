import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import SideBar from "./Components/SideBar";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Cookies from "js-cookie";
import Container from "./Components/Container";
import Signin from "./Components/Signin/Signin";
import { store } from "./app/store";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import {
  Route,
  Redirect,
  Routes,
  useNavigate,
  Navigate,
  useLocation,
  Link,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddSop from "./Components/Container/AddSop";
import SopAdd from "./Components/Container/SopAdd";
import { fetchUser } from "./Components/Container/Users";
import Signup from "./Components/Signup/Signup";
import ShowSop from "./Components/Container/ShowSop";
import AddEmployee from "./Components/Container/AddEmployee";
import DynamicComponent from "./Components/Container/ShowSop";
import Users from "./Components/Container/Users";
import EditSop from "./Components/Container/EditSop";
import Header from "./Components/Header";
import AssignSop from "./Components/Container/AssignSop";
import NoPage from "./Components/Container/NoPage";
import Sops from "./Components/Container/Sops";
import { setEmployeeId, setRole } from "./features/counter/userSlice";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const role = Cookies.get("role");
  const employeeId = Cookies.get("employeeId");
  const [show, setShow] = useState(false);
  const currentState = store.getState();
  const user = currentState.auth.user;
  const auth = useSelector((state) => state.auth);
  const token = Cookies.get("token");
  const dispatch = useDispatch(); 
  const handleAuthentication = (status) => {
    // console.log(status)
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
  const isAuthenticateds = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    console.log(token);

    if (token) {
      setIsAuthenticated(true);
      console.log(token);
    } else {
      setIsAuthenticated(false);
      console.log("wqf", token);
      if ((token == undefined && path !== "/login") || "/signup") {
        handleRouteChange("/login");
      }
    }
  }, [token]);
  const config = {
    headers: {
      'Authorization':`Bearer  ${Cookies.get("token")}`
    }
  };
  useEffect(() => {
    console.log("user", user);
  
    if(Cookies.get("role") !== (""||undefined || null) ){
      dispatch(setRole(role));
      dispatch(setEmployeeId(employeeId));
      dispatch(fetchUser(config));
    setUserRole(role);
    console.log("role", user);
  }
  }, [user]);
  return (
    <div className="App">
      <div className="wrapper">
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route
                path="/login"
                element={<Signin onLogin={handleAuthentication} />}
              />
              <Route
                path="/signup"
                element={<Signup onSignup={handleAuthentication} />}
              />
            </>
          ) : role == "company" ? (
            <Route
              path="/"
              element={<AuthenticatedRoute isAuthenticated={isAuthenticated} />}
            >
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
                        <AddEmployee show={show} setShow={setShow} />
                      </div>
                    </React.Fragment>
                  </>
                }
              />
              <Route path="*" element={<NoPage />} />
              <Route
                path="/dynamic/:id"
                element={
                  <>
                    {" "}
                    <React.Fragment>
                      <SideBar show={show} setShow={setShow} />
                    </React.Fragment>
                    <DynamicComponent show={show} setShow={setShow} />
                  </>
                }
              />
              <Route
                path="/editsop/:id"
                element={
                  <>
                    {" "}
                    <React.Fragment>
                      <SideBar show={show} setShow={setShow} />
                    </React.Fragment>
                    <EditSop show={show} setShow={setShow} />
                  </>
                }
              />
              <Route
                path="/users"
                element={<Users show={show} setShow={setShow} />}
              />
              <Route
                path="/assignsop"
                element={<AssignSop show={show} setShow={setShow} />}
              />
            </Route>
          ) : (
            <Route
              path="/"
              element={<AuthenticatedRoute isAuthenticated={isAuthenticated} />}
            >
              <Route
                path="/home"
                element={
                  <>
                    {" "}
                    <SideBar show={show} setShow={setShow} />{" "}
                    <Container show={show} setShow={setShow} />
        
                  </>
                }
              />
                  <Route
                path="/dynamic/:id"
                element={
                  <>
                    {" "}
                    <React.Fragment>
                      <SideBar show={show} setShow={setShow} />
                    </React.Fragment>
                    <DynamicComponent show={show} setShow={setShow} />
                  </>
                }
              />
            </Route>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
