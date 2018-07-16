import { types } from "./constants";

// declare initial state of state
const initialState = {
  carts : []
};

const carts = (state = initialState, action) => {
  // handle action type
  switch (action.type) {
    case types.SET_CARTS:
      // set status from action and return it
      return { ...state, carts: Object.assign({}, action.payload.carts) };
    case types.ADD_CART:
      // set status from action and return it
      state.carts[Object.keys(state.carts).length] = action.payload.cart;
      console.log(state.carts);
      return { ...state, carts: state.carts };  
    case types.UPDATE_CART:
      console.log(state.carts);
      // set status from action and return it
      for (var cart = 0 ; cart < Object.keys(state.carts).length ; cart ++) {
        if (state.carts[cart].productID == action.payload.cart.productID) {
          state.carts[cart].quantity = action.payload.quantity;
          break;
        }
      }
      console.log(state.carts);
      return { ...state, orders: state.order }; 
    case types.DELETE_CART:
      // set status from action and return it
      let newCarts = [];
      for (let cart in state.carts) {
        let isFind = false;
        if (state.carts[cart].productID === action.payload.cart.productID && 
          state.carts[cart].userID === action.payload.cart.userID) {
          isFind = true;
        }
        if (!isFind) newCarts[Object.keys(newCarts).length] = state.carts[cart]; 
      }
      state.carts = newCarts;
      return { ...state, carts: state.carts} ;
    case types.DELETE_CARTS:
      return { ...state, carts: []} ;          
    default:
      // return state
      return { ...state };
  }
};

export default carts;