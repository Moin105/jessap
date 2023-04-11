// const initialState = {
//     token: null,
//     isAuthenticated: false,
//     // other authentication-related state
//   };
  
//   const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SIGNUP_SUCCESS':
//       case 'LOGIN_SUCCESS':
//         return {
//           ...state,
//           token: action.payload.token,
//           isAuthenticated: true,
//         };
//       case 'LOGOUT':
//         return {
//           ...state,
//           token: null,
//           isAuthenticated: false,
//         };
//       // other authentication-related actions and state handling
//       default:
//         return state;
//     }
//   };
  
//   export default authReducer;

// import { SIGNUP_SUCCESS, LOGIN_SUCCESS } from '../actions/types'; 
export const SIGNUP_SUCCESS ="SIGNUP_SUCCESS";
export const LOGIN_SUCCESS="LOGIN_SUCCESS";
const initialState = {
  token: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      // Update the state with the token and set isAuthenticated to true
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
      };
    // ... Handle other action types and state updates

    default:
      return state;
  }
};

export default authReducer;