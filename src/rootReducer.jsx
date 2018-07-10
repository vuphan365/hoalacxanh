import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import authAdmin from './reducers/authAdmin';
import products from './reducers/products';
import productTypes from './reducers/productTypes';
import orders from './reducers/orders';
import blogs from './reducers/blogs';
const rootReducer = combineReducers({
  router: routerReducer,
  authAdmin,
  products,
  productTypes,
  orders,
  blogs
});
export default rootReducer;