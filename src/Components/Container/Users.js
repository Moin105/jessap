import React, { useEffect } from "react";
import Header from "../Header";
import Sops from "./Sops";
import AddSops from "./AddSops";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import { fetchUsers } from "../../features/counter/userActions";
import { fetchUsersRequest,fetchUsersFailure,fetchUsersSuccess } from "../../features/counter/userActions";
import { useDispatch,useSelector } from "react-redux";
import "./styles.css";
import UserCard from "./UserCard";
import SideBar from "../SideBar";
export const fetchData = (config) => {
    return (dispatch) => {
      dispatch(fetchUsersRequest());
      fetch('https://phplaravel-391561-3408566.cloudwaysapps.com/api/employees',config) // Replace with your API endpoint
        .then(response => {
          return response.json();
        })
        .then((response) => {
          // Use parsed JSON data and text data as needed
          console.log('JSON data:', response);
        //   console.log('Text data:', text);
          dispatch(fetchUsersSuccess(response)); // Dispatch success action with fetched data
        })
        .catch(error => {
          dispatch(fetchUsersFailure(error.message));
        });
    };
  };
function Users({show,setShow}) {
    const dispatch = useDispatch()
    const sop = useSelector(state => state.users);
    const config = {
        headers: {
          'Authorization':`Bearer  ${Cookies.get("token")}`
        }
      };
      const usersData = sop.users.employees;
    useEffect(() => {
        dispatch(fetchData(config));
        console.log("container",usersData)
        
    }, [])
  return (
    <React.Fragment>
     <SideBar show={show} setShow={setShow}/> 
      <div className="container">
        <Header   show={show} setShow={setShow}/>
        <React.Fragment>
             <div className='container-sop'>
            <h3>Users</h3>
           
            {/* <div className='sop-container-row'>
              <div className='input-container'>
                <span><CgSearch/></span>
                <input type='text' placeholder='Search SOPs'/>
              </div>
              <Link to="/addsops"><button>Add SOP</button></Link>  
            </div> */}
            <div className='card-sop'>
                {usersData && usersData?.map((user,index)=>{
                    return <UserCard key={index} name={user.first_name} joined_date={user.joined_date} sops={user.sops}/>
                })}
              {/* {
                sop?.users?.employees?.map((employee)=>{
                      <p>{employee.first_name}</p>
                })
              } */}
             
              {/* <Rowsop icon={check}/>
              <Rowsop icon={document}/> */}
            </div>
            </div>
   </React.Fragment>
      </div>
    </React.Fragment>
  );
}

export default Users;
