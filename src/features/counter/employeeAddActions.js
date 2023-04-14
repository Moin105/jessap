export const ADD_EMPLOYEE_REQUEST = "ADD_EMPLOYEE_REQUEST";
export const ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS";
export const ADD_EMPLOYEE_FAILURE = "ADD_EMPLOYEE_FAILURE";

export const addEmployee = (employee, token) => {
    return (dispatch) => {
      dispatch(addEmployeeRequest());
      fetch("https://your-api-url.com/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employee),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(addEmployeeSuccess(data));
        })
        .catch((error) => {
          dispatch(addEmployeeFailure(error.message));
        });
    };
  };
  
  export const addEmployeeRequest = () => {
    return {
      type: ADD_EMPLOYEE_REQUEST,
    };
  };
  
  export const addEmployeeSuccess = (employee) => {
    return {
      type: ADD_EMPLOYEE_SUCCESS,
      payload: employee,
    };
  };
  
  export const addEmployeeFailure = (error) => {
    return {
      type: ADD_EMPLOYEE_FAILURE,
      payload: error,
    };
  };