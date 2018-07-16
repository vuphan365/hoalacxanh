import { types } from "./constants";

// declare initial state of state
const initialState = {
  orders : [],
  statusOrders : [],
  viewOrders :[],
  orderOfUser : []
};

const orders = (state = initialState, action) => {
  // handle action type
  switch (action.type) {
    case types.SET_ORDERS:
      // set status from action and return it
      return { ...state, orders: Object.assign({}, action.payload.orders) };
    case types.SET_ORDERS_OF_USER:
      // set status from action and return it
      return { ...state, orderOfUser: Object.assign({}, action.payload.orders) };  
    case types.SET_VIEW_ORDERS:
      // set status from action and return it
      return { ...state, viewOrders: Object.assign({}, action.payload.viewOrders) };  
    case types.SET_STATUS_ORDERS:
      // set status from action and return it
      return { ...state, statusOrders: Object.assign({}, action.payload.statusOrders) }; 
    case types.UPDATE_ORDER:
      // set status from action and return it
      for (var order in state.orders) {
        if (state.orders[order].orderID === action.payload.order.orderID) {
          state.orders[order] = action.payload.order;
          break;
        }
      }
      return { ...state, orders: state.order }; 
    default:
      // return state
      return { ...state };
  }
};

export default orders;