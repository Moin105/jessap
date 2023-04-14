export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";



export const fetchUsers = () => {
    return (dispatch) => {
      dispatch(fetchUsersRequest());
      fetch("https://phplaravel-391561-3408566.cloudwaysapps.com/api/employees/9")
        .then((response) => response.json())
        .then((data) => {
          dispatch(fetchUsersSuccess(data));
        })
        .catch((error) => {
          dispatch(fetchUsersFailure(error.message));
        });
    };
  };
  
  export const fetchUsersRequest = () => {
    return {
      type: FETCH_USERS_REQUEST,
    };
  };
  
  export const fetchUsersSuccess = (users) => {
    return {
      type: FETCH_USERS_SUCCESS,
      payload: users,
    };
  };
  
  export const fetchUsersFailure = (error) => {
    return {
      type: FETCH_USERS_FAILURE,
      payload: error,
    };
  };