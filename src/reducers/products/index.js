import { types } from "./constants";

// declare initial state of state
const initialState = {
  products : [],
  product : null
};

const products = (state = initialState, action) => {
  // handle action type
  switch (action.type) {
    case types.SET_PRODUCTS:
      // set status from action and return it
      return { ...state, products: Object.assign({}, action.payload.products) };
    case types.ADD_PRODUCT:
      // set status from action and return it
      state.products[Object.keys(state.products).length] = action.payload.product;
      return { ...state, products: state.products };
    case types.UPDATE_PRODUCT:
      // set status from action and return it
      for (let product in state.products) {
        if (state.products[product].productID === action.payload.product.productID) {
          state.products[product] = action.payload.product;
          break;
        }
      }
      return { ...state, products: state.product }; 
    case types.DELETE_PRODUCT:
      // set status from action and return it
      let newProducts = [];
      for (let product in state.products) {
        let isFind = false;
        if (state.products[product].productID === action.payload.product.productID) {
          isFind = true;
        }
        if (!isFind) newProducts[Object.keys(newProducts).length] = state.products[product]; 
      }
      state.products = newProducts;
      return { ...state, products: state.products} ;               
    case types.SET_PRODUCT:
      // set status from action and return it
      return { ...state, product: Object.assign({}, action.payload.product)[0] };   
    default:
      // return state
      return { ...state };
  }
};

export default products;

