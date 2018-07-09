import { types } from "./constants";

// declare initial state of state
const initialState = {
  status: "unauthorized",
  message : ""
};

// create the reducer to handle autheticated actions
const authAdmin = (state = initialState, action) => {
  // handle action type
  switch (action.type) {
    case types.SET_STATUS:
      // set status from action and return it
      return { ...state, status: action.payload.status };
    case types.SET_MESSAGE:
      // set message from action and return it
      return { ...state, message: action.payload.message }; 
    case types.SET_ADMINID: 
      return { ...state, adminID: action.payload.adminID };
    case types.SET_IMAGE: 
      return { ...state, image: action.payload.image };
    case types.SET_USERNAME: 
      return { ...state, username: action.payload.username };        
    default:
      // return state
      return { ...state };
  }
};

// export authicated reducer
export default authAdmin;
