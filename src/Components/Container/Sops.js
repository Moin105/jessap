import React, { useEffect, useState, useMemo } from "react";
import Rowsop from "./Rowsop";
import setting from "../../Images/setting.png";
import check from "../../Images/check.png";
import document from "../../Images/document.png";
import { Link, useMatch, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CgSearch } from "react-icons/cg";
import { Spinner,Stack } from "@chakra-ui/react";
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
} from "../../features/counter/sopActions";
import { useDispatch, useSelector } from "react-redux";
import EmployeeSopRow from "./EmployeeSopRow";

// const config = {
//   headers: {
//     'Authorization':
//   }
// };

export const fetchData = (config) => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    fetch(
      "https://phplaravel-391561-3408566.cloudwaysapps.com/api/getSOPs",
      config
    ) // Replace with your API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return Promise.all([response.clone().json(), response.text()]);

        // return response.json();
      })
      .then(([json, text]) => {
        // Use parsed JSON data and text data as needed
        console.log("JSON data:", json);
        console.log("Text data:", text);
        dispatch(fetchDataSuccess(json)); // Dispatch success action with fetched data
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};

function Sops() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const satats = useSelector((state) => state);
  const sop = useSelector((state) => state.sops);
  const role = Cookies.get("role");
  const [completed, setCompleted] = useState([]);
  const [uncompleted, setUncompleted] = useState([]);
  const filteredSops = searchQuery
    ? sop.data.filter((sop) =>
        sop.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sop.data;
  const fetchEmployeeData = (config) => {
    return (dispatch) => {
      dispatch(fetchDataRequest());
      fetch(
        "https://phplaravel-391561-3408566.cloudwaysapps.com/api/getSOPs",
        config
      ) // Replace with your API endpoint
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return Promise.all([response.clone().json(), response.text()]);
          // console.log("response",response)
          //         return response.json();
        })
        .then((data) => {
          // Use parsed JSON data and text data as needed
          // console.log('JSON data:', json);
          // console.log('Text data:', text);
          dispatch(fetchDataSuccess(data));
          setCompleted(data[0].completed || []);
          setUncompleted(data[0].uncompleted || []);
          localStorage.setItem("myData", JSON.stringify(data[0]));
          // Dispatch success action with fetched data
        })
        .catch((error) => {
          dispatch(fetchDataFailure(error.message));
        });
    };
  };
  // let content;

  // if (filteredSops.length > 0) {
  //   content = (
  //     <ul>
  //       {filteredSops.data.map(sop => <li key={sop.id}>{sop.title}</li>)}
  //     </ul>
  //   );
  // } else if (searchQuery && filteredSops.data.length === 0) {
  //   content = (
  //     <p>No SOPs found.</p>
  //   );
  // } else {
  //   content = (
  //     <ul>
  //       {sop.data.map(sop => <li key={sop.id}>{sop.title}</li>)}
  //     </ul>
  //   );
  // }
  // const filteredSops = searchQuery ? sop.filter(sop => sop.title.toLowerCase().includes(searchQuery.toLowerCase())) : sop;

  // const token ={Authorization:}
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer  ${Cookies.get("token")}`,
    },
  };
  const handleClick = (id, data) => {
    navigate(`/dynamic/${id}`);
  };

  useEffect(() => {
    console.log("container", satats);
    if (role == "company") {
      dispatch(fetchData(config));
    } else if (role == "employee") {
      dispatch(fetchEmployeeData(config));
    }
  }, []);

  // useEffect(() => {
  //   if(sop.data){
  //     if(sop.data[0]?.completed !== []){
  //       setCompleted(sop.data[0]?.completed)
  //     }if(sop.data[0]?.uncompleted !==[]){
  //       setUncompleted(sop.data[0]?.uncompleted)
  //     }
  //   }
  // }, [])
  useEffect(() => {
    console.log("loader jani", sop.isLoading);
    const storedData = localStorage.getItem("myData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setCompleted(parsedData.completed || []);
      setUncompleted(parsedData.uncompleted || []);
    } else {
      fetchData();
    }
  }, []);

  const updatedUnCompletedArr = useMemo(() => {
    return uncompleted?.map((subArray) => {
      return subArray?.map((item) => {
        return {
          ...item,
          status: "0",
        };
      });
    });
  }, [uncompleted]);

  return (
    <React.Fragment>
      {role == "company" ? (
        <div className="container-sop">
          <h3>SOPs</h3>

          <div className="sop-container-row">
         
            <div className="input-container">
              <span>
                <CgSearch />
              </span>
              <input
                type="text"
                placeholder="Search SOPs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link to="/addsops">
              <button>Add SOP</button>
            </Link>
          </div>
          <div className="card-sop">
            {filteredSops.length ? (
              <>
                {filteredSops.map((sops, index) => (
                  <Rowsop
                    data={sops}
                    key={index}
                    icon={setting}
                    title={sops.title}
                    description={sops.description}
                  />
                ))}
              </>
            ) : searchQuery && filteredSops.length === 0 ? (
              <p>No SOPs found.</p>
            ) : (
              <>
             {!sop.isLoading  ? <>{sop.data.length > 0
                  ? sop.data.map((sops, index) => (
                      <Rowsop
                        data={sops}
                        key={index}
                        icon={setting}
                        title={sops.title}
                        description={sops.description}
                      />
                    ))
                  : "No SOP Added"}</>:<div style={{height:"50px"}}> <Stack  direction='row' spacing={4}><Spinner   
                  speed='0.65s'
                  // emptyColor='gray.200'
                  color='blue.500'
                  style={{width:'30px',height:'30px'}}
                  size='xl'/></Stack>
                  </div>}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="container-sop">
          <h3>SOPs</h3>
          <div className="card-sop">
            {!sop.isLoading ? (
              <>
                {updatedUnCompletedArr?.length > 0 &&
                  updatedUnCompletedArr?.map((subArray) => (
                    <div key={subArray}>
                      {subArray.map((item, index) => (
                        <EmployeeSopRow
                          data={item}
                          key={index}
                          icon={setting}
                          title={item.title}
                          status={item.status}
                          description={item.description}
                        />
                      ))}
                    </div>
                  ))}
              </>
            ) : (
              <Stack  direction='row' spacing={4}><Spinner   
              speed='0.65s'
              // emptyColor='gray.200'
              color='blue.500'
              style={{width:'30px',height:'30px'}}
              size='xl'/></Stack>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Sops;
