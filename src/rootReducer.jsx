import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import authAdmin from './reducers/authAdmin';
import products from './reducers/products';
import productTypes from './reducers/productTypes';

const rootReducer = combineReducers({
  router: routerReducer,
  authAdmin,
  products,
  productTypes,

});
export default rootReducer;