import { types } from "./constants";

// declare initial state of state
const initialState = {
  status: "unauthorized",
  message : "",
  name : "",
  image : "",
  address : "",
  phone : "",
  userID : "",
  email : ""
};

// create the reducer to handle autheticated actions
const authUser = (state = initialState, action) => {
  // handle action type
  switch (action.type) {
    case types.SET_STATUS:
      // set status from action and return it
      return { ...state, status: action.payload.status };
    case types.SET_MESSAGE:
      // set message from action and return it
      return { ...state, message: action.payload.message }; 
    case types.SET_NAME: 
      return { ...state, name: action.payload.name };
    case types.SET_IMAGE: 
      return { ...state, image: action.payload.image };
    case types.SET_EMAIL: 
      return { ...state, email: action.payload.email };
    case types.SET_ADDRESS: 
      return { ...state, address: action.payload.address };
    case types.SET_USERID: 
      return { ...state, userID: action.payload.userID };
    case types.SET_PHONE:
      return { ...state, phone: action.payload.phone };                  
    default:
      // return state
      return { ...state };
  }
};

// export authicated reducer
export default authUser;
