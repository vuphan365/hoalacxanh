import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import authAdmin from './reducers/authAdmin';
import products from './reducers/products';
import productTypes from './reducers/productTypes';
import orders from './reducers/orders';
import blogs from './reducers/blogs';
import authUser from './reducers/authUser';
import carts from './reducers/carts';
const rootReducer = combineReducers({
  router: routerReducer,
  authAdmin,
  products,
  productTypes,
  orders,
  blogs,
  authUser,
  carts
});
export default rootReducer;