import * as userFetch from '../../utils/userFetch';
import { types } from "./constants";
import { BACKEND_URL } from '../../config/constants';

function loadCarts() {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/cart/me`;
      userFetch.get(url).then(res => {
        res.json().then(json => {
          console.log(json);
          if (json.length > 0) {
            dispatch(actions.setCarts(json));
            resolve(true);
          }else reject();
        }).catch(() => reject());
      });
    }); 
  }
}
function addCartToStore(userID, productID, quantity) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/cart/add`;
      let body =  JSON.stringify({ userID, productID, quantity });
      console.log("add");
      userFetch.post(url, body).then(res => {
        res.json().then(json => {
          console.log(json);
          if (json.rowsAffected[0] > 0) {
            let cart = {userID, productID, quantity};
            dispatch(actions.addCart(cart));
            resolve(true);
          }else reject();
        }).catch((error) => reject(error));
      });
    }); 
  }
}
function updateCartToStore(userID, productID, quantity) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/cart/edit`;
      let body =  JSON.stringify({ userID, productID, quantity });
      console.log("update");
      userFetch.post(url, body).then(res => {
        res.json().then(json => {
          console.log(json);
          if (json.rowsAffected[0] > 0) {
            let cart = {userID, productID, quantity};
            console.log(cart);
            dispatch(actions.updateCart(cart));
            resolve(true);
          }else reject();
        }).catch((error) => reject(error));
      });
    }); 
  }
}
function deleteCartToStore(userID, productID) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/cart/delete`;
      let body =  JSON.stringify({ userID, productID });
      userFetch.post(url, body).then(res => {
        res.json().then(json => {
          console.log(json);
          if (json.rowsAffected[0] > 0) {
            let cart = {userID, productID};
            console.log(cart);
            dispatch(actions.deleteCart(cart));
            resolve(true);
          }else reject();
        }).catch((error) => reject(error));
      });
    }); 
  }
}
function deleteAllCartToStore(userID) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/cart/delete/me`;
      let body =  JSON.stringify({ userID });
      userFetch.post(url, body).then(res => {
        res.json().then(json => {
          console.log(json);
          if (json.rowsAffected[0] > 0) {
            dispatch(actions.deleteCarts());
            resolve(true);
          }else reject();
        }).catch((error) => reject(error));
      });
    }); 
  }
}
export const actions = {
  setCarts: (carts, content) => ({
    type: types.SET_CARTS,
    payload: { carts, content }
  }),
  addCart: (cart, content) => ({
    type: types.ADD_CART,
    payload: { cart, content }
  }),
  updateCart: (cart, content) => ({
    type: types.UPDATE_CART,
    payload: { cart, content }
  }),
  deleteCart: (cart, content) => ({
    type: types.DELETE_CART,
    payload: { cart, content }
  }),
  deleteCarts: (content) => ({
    type: types.DELETE_CARTS,
    payload: {content }
  }),
  loadCarts,
  updateCartToStore,
  addCartToStore,
  deleteCartToStore,
  deleteAllCartToStore
};