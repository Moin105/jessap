import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sops from "./Sops";
import AddSops from "./AddSops";
import SideBar from "../SideBar";
import Cookies from "js-cookie";
import { Select, FormControl, FormLabel } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
function AssignSop({ show, setShow }) {
  // const auth = useSelector(state => state);
  const users = useSelector((state) => state.users.users.employees);
  const sops = useSelector((state) => state.sops.data);
  //   const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

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

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedEmployee = users.find(
      (employee) => employee.first_name.toString() === selectedValue
    );

    if (
      selectedEmployee &&
      !selectedEmployees.includes(selectedEmployee.first_name)
    ) {
      setSelectedEmployees([...selectedEmployees, selectedEmployee]);
    }
  };
  const handleItemClick = (index) => {
    const newItems = [...selectedEmployees]; // create a copy of the items array
    newItems.splice(index, 1); // remove the clicked item from the copy
    setSelectedEmployees(newItems); // update the state with the new array
  };
  useEffect(() => {
     console.log("selected", selectedEmployees);
  }, [selectedEmployees]);
  return (
    <React.Fragment>
      <React.Fragment>
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
                <Select variant='filled' placeholder="Select an SOP">
                  {sops?.map((sop, index) => {
                    return <option value={sop.title}>{sop.title}</option>;
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
                  {users.map((employee) => (
                    <option key={employee.id} value={employee.first_name}>
                      {employee.first_name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>
            {selectedEmployees.length > 0 && (
              <div>
                Selected employees:{" "}
                {selectedEmployees.map((employed,index) => {
                  return <p onClick={handleItemClick}>{employed.first_name}</p>;
                })}
              </div>
            )}
          </div>
        </React.Fragment>
      </div>
    </React.Fragment>
  );
}

export default AssignSop;
