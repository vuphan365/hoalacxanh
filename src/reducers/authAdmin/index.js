import fetch from "node-fetch";
import { types } from "./constants";

// declare initial state of state
const initialState = {
  status: "unauthorized"
};

// create the reducer to handle autheticated actions
const authAdmin = (state = initialState, action) => {
  // handle action type
  switch (action.type) {
    case types.SET_STATUS:
      // set status from action and return it
      return { ...state, status: action.payload.status };
    default:
      // return state
      return { ...state };
  }
};

// export authicated reducer
export default authAdmin;
