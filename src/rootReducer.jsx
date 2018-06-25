import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import authAdmin from './reducers/authAdmin';

const rootReducer = combineReducers({
  router: routerReducer,
  authAdmin
});
export default rootReducer;