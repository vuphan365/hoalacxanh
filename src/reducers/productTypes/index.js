import { types } from "./constants";

// declare initial state of state
const initialState = {
  productTypes : []
};

const productTypes = (state = initialState, action) => {
  // handle action type
  switch (action.type) {
    case types.SET_PRODUCT_TYPES:
      // set status from action and return it
      return { ...state, productTypes: Object.assign({}, action.payload.productTypes) }; 
    default:
      // return state
      return { ...state };
  }
};

export default productTypes;
