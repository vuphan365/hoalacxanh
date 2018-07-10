import * as adminFetch from '../../utils/adminFetch';
import { BACKEND_URL } from '../../config/constants';
import { types } from "./constants";

function loadAllOrders() {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/order/detail`;
      adminFetch.get(url).then(res => {
        res.json().then(json => {
          console.log(json);
          if (json.length > 0) {
            dispatch(actions.setOrders(json));
            resolve(true);
          }else reject();
        }).catch(() => reject());
      });
    }); 
  }
}
function loadAllStatusOrders() {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/status/detail`;
      adminFetch.get(url).then(res => {
        res.json().then(json => {
          console.log(json);
          if (json.length > 0) {
            dispatch(actions.setStatusOrders(json));
            resolve(true);
          }else reject();
        }).catch(() => reject());
      });
    }); 
  }
}
function loadViewOrders() {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/order/view`;
      adminFetch.get(url).then(res => {
        res.json().then(json => {
          console.log(json);
          if (json.length > 0) {
            dispatch(actions.setViewOrders(json));
            resolve(true);
          }else reject();
        }).catch(() => reject());
      });
    }); 
  }
}
function updateOrderToStore(order) {
  return dispatch => {
    console.log('edit');
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/order/edit/`;
      const { userID, statusID } = order;
      const id = order.orderID;
      const body = JSON.stringify({userID, id, statusID })
      adminFetch.post(url, body).then(res => {
        res.json().then(json => {
          console.log(json)
          if (json.rowsAffected.length > 0) {
            console.log(json.rowsAffected[0]);
            dispatch(actions.updateOrder(order));
            console.log('resolve true');
            resolve(true);
          }else reject();
        }).catch(err => {
          console.log(err);
          reject(err);
        });
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    });
    
  }
}
export const actions = {
  setOrders: (orders, content) => ({
    type: types.SET_ORDERS,
    payload: { orders, content }
  }),
  setViewOrders: (viewOrders, content) => ({
    type: types.SET_VIEW_ORDERS,
    payload: { viewOrders, content }
  }),
  updateOrder: (order, content) => ({
    type: types.UPDATE_ORDER,
    payload: { order, content }
  }),
  setStatusOrders: (statusOrders, content) => ({
    type: types.SET_STATUS_ORDERS,
    payload: { statusOrders, content }
  }),
  loadAllOrders,
  loadAllStatusOrders,
  loadViewOrders,
  updateOrderToStore
};