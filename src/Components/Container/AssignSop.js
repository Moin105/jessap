import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sops from "./Sops";
import AddSops from "./AddSops";
import SideBar from "../SideBar";
import Cookies from "js-cookie";
import { Select, FormControl, FormLabel } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./Sops";
import { fetchUser } from "./Users";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"; 
import { FaTimes } from "react-icons/fa";
const config = {
  headers: {
    'Authorization':`Bearer  ${Cookies.get("token")}`,
     'Content-Type': 'application/json',
  }
};

function AssignSop({ show, setShow }) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData(config)); 
    dispatch(fetchUser(config));
  }, [])
  ////


  /////
  // const auth = useSelector(state => state);
  const users = useSelector((state) => state.users.users.employees);
  const sops = useSelector((state) => state.sops.data);
  //   const [selectedOptions, setSelectedOptions] = useState([]);
  
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedSop, setSelectedSop] = useState([]);
  const [loader, setLoader] = useState(false)
useEffect(() => {
    if(sops == [] && users == []){
      setLoader(true)
    }else{
      setLoader(false)
    }
}, [sops,users])

const navigate = useNavigate();
  //   const [selectedValues, setSelectedValues] = useState([]);

  //   const handleSelectChange = (event) => {
  //     const options = event.target.options;
  //     const selectedValues = [];
  //     for (let i = 0; i < options.length; i++) {
  //       if (options[i].selected) {
  //         selectedValues.push(options[i].value);
  //       }
  //     }
  //     setSelectedValues(selectedValues);
  //   };
  function handleSelectChanges(event) {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setSelectedSop(parseInt(selectedValue))
  }
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedEmployee = users.find(
      (employee) => employee.id.toString() === selectedValue
    );
    if (selectedEmployee) {
      const alreadySelected = selectedEmployees.find(
        (employee) => employee.id === selectedEmployee.id
      );
      if (!alreadySelected) {
        setSelectedEmployees([...selectedEmployees, selectedEmployee]);
      }
    }
  };
  const handleItemClick = (index) => {
    console.log("salan")
    const newItems = [...selectedEmployees];
    newItems.splice(index, 1); 
    setSelectedEmployees(newItems); 
  };
  useEffect(() => {
    const names = selectedEmployees.map(obj => obj.id);
     console.log("selected", names);
  }, [selectedEmployees]);
  var raw = {
    id: selectedSop,
    sop_assigned_to: selectedEmployees.map(obj => obj.id),
    status: 0,
  };
  const handleRouteChange = (route) => {
    // Use the navigate() function to navigate to the specified route
    navigate(route);
  };
  const checkForSuccessfull = (str) => {
    return str.includes("SOP assigned successfully");
  };
  const assignSop = async () => {
  
    await fetch('https://phplaravel-391561-3408566.cloudwaysapps.com/api/assignSOP',  {
      method: "POST",
      // mode: "no-cors",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json"
      },
      body:JSON.stringify(raw),
      redirect: 'follow',
    })
        .then(response => response.json())
        .then(result => {
          console.log(result);
          console.log('THE RESULT====', result.message);
          const isPresent = checkForSuccessfull(result.message);
          //   "Company Registered successfully."
          console.log(isPresent);
          if (isPresent) {

            handleRouteChange("/home");
          }
        })
        .catch(error => {
              console.log('error', error?.response);
        });
    };
  return (
    <React.Fragment>
   {loader ?  "loading" :<> <React.Fragment>
        <SideBar show={show} setShow={setShow} />
      </React.Fragment>
      <div className="container">
        <Header show={show} setShow={setShow} />

        <React.Fragment>
          <div className="container-sop">
            <h3>Assign SOPs</h3>
            <div className="container-assign">
              <FormControl className="group">
                <FormLabel htmlFor="first_name">Select SOP</FormLabel>
                <Select variant='filled'onChange={handleSelectChanges} placeholder="Select an SOP">
                  {sops?.map((sop, index) => {
                    return <option key={index} value={sop.id}>{sop.title}</option>;
                  })}
                </Select>
              </FormControl>
              {/* <FormControl className="group">
                <FormLabel  htmlFor="first_name">Select Employee</FormLabel>
                <Select     style={{
        width: "200px",
        backgroundColor: "lightgray",
        color: "black",
        borderRadius: "5px",
        padding: "10px",
        border: "none",
        boxShadow: "1px 1px 5px gray"
      }} placeholder="Select an option"  value={selectedValues} onChange={handleSelectChange}>
                  {users?.map((sop, index) => {
                    return <option value={sop.first_name}>{sop.first_name}</option>;
                  })}
                </Select>
              </FormControl> */}
              <FormControl className="group">
                <FormLabel htmlFor="first_name">Select Employee</FormLabel>
                <Select variant='filled'  value="" onChange={handleSelectChange}>
                  <option value={selectedEmployees}>Select an employee</option>
                  {users?.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.first_name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>
            <h4>Selected employees:{" "}</h4>
          <div className="employee-data">  {selectedEmployees.length > 0 && (
              <>
                {selectedEmployees?.map((employed,index) => {
          return        <CrossOnHover key={employed.id}  handleItemClick={handleItemClick} text={employed.first_name} />

                  return <p key={employed.id} onClick={handleItemClick}>{employed.first_name}</p>;
                })}
            </>
            )}  </div>
          </div>
        </React.Fragment>
        <button className="assignsop" onClick={assignSop}>Assign SOP</button>
      </div></>}
    </React.Fragment>
  );
}

export default AssignSop;



function CrossOnHover(props) {
  return (
    <p onClick={props.handleItemClick} className="cross-on-hover">
      {props.text}
      <span className="cross-icon">
        <FaTimes />
      </span>
    </p>
  );
}