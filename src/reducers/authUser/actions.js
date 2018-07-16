import Cookies from "js-cookie";
import { types } from "./constants";
import { BACKEND_URL } from '../../config/constants';
import * as userFetch from '../../utils/userFetch';

function getLoginAsync(email, name, image) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      // change state of autheticated action to loading before API call
      dispatch(actions.setStatus("loading"));
      // declare url of API and prepare API call
      let url = `${BACKEND_URL}/user/signin`;

      // declare API request 
      const requestOptions = {
        //mode: 'no-cors', // 'cors' by default
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "autherization": " bearer "
        },
        body: JSON.stringify({ email, name, image })
      };
      // begin API call and get access token from server
      fetch(url, requestOptions)
        .then(res => {
          res
            .json()
            .then(json => {
              dispatch(actions.setMessage(json.msg));
              if (typeof json.token !== 'undefined') {
                // Save access token to cookie
                Cookies.set("accessToken", json.token);
                // change state of autheticated action to success after API call successly
                dispatch(actions.setStatus("success"));
                dispatch(actions.setName(name));
                dispatch(actions.setImage(image));
                dispatch(actions.setEmail(email));
                resolve(true);
              } else {
                dispatch(actions.setStatus("error"));
                reject("error");
              }
            })
            .catch(err => {
              // if API call is error then change state of autheticated action to error
              dispatch(actions.setStatus("error"));
              reject(err);
            });
        })
        .catch(err => {
          // if API call is error then change state of autheticated action to error
          dispatch(actions.setStatus("error"));
          reject(err);
        });
    });
  };
}
function logOutAsyns() {
  return dispatch => {
    // change state of autheticated action to loading before log out
    dispatch(actions.setStatus("loading"));
    // Remove access token to cookie
    Cookies.remove("accessToken");
    dispatch(actions.setAddress(''));
    dispatch(actions.setPhone(''));
    dispatch(actions.setUserID(''));
    dispatch(actions.setName(''));
    dispatch(actions.setImage(''));
    dispatch(actions.setEmail(''));
    // change state of autheticated action to success after API call successly
    dispatch(actions.setStatus("unauthorized"));
  };
}
function loadUserInfo() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const url = `${BACKEND_URL}/user/detail/me`;
      userFetch.get(url).then(res => {
        res
          .json()
          .then(json => {
            if (json[0] !== undefined) {
              const {userID, name, image, email, address, phone} = json[0];
              dispatch(actions.setAddress(address));
              dispatch(actions.setPhone(phone));
              dispatch(actions.setUserID(userID));
              dispatch(actions.setName(name));
              dispatch(actions.setImage(image));
              dispatch(actions.setEmail(email));
              resolve(true);
            } else reject();
          }).catch(err => {
            console.log(err);
            reject();
          });
      }).catch(err => {
        console.log(err);
        reject();
      });
    })
  }
}
function updateUserInfo(phone, name, address) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const url = `${BACKEND_URL}/user/edit`;
      const body = JSON.stringify({ phone, name, address })
      userFetch.post(url, body).then(res => {
        res
          .json()
          .then(json => {
            if (json !== undefined) {
              dispatch(actions.setAddress(address));
              dispatch(actions.setPhone(phone));
              dispatch(actions.setName(name));
              resolve(true);
            } else reject();
          }).catch(err => {
            console.log(err);
            reject();
          });
      }).catch(err => {
        console.log(err);
        reject();
      });
    })
  }
}
// create actions to save state of authetication
export const actions = {
  setStatus: (status, content) => ({
    type: types.SET_STATUS,
    payload: { status, content }
  }),
  setMessage: (message, content) => ({
    type: types.SET_MESSAGE,
    payload: { message, content }
  }),
  setName: (name, content) => ({
    type: types.SET_NAME,
    payload: { name, content }
  }),
  setImage: (image, content) => ({
    type: types.SET_IMAGE,
    payload: { image, content }
  }),
  setEmail: (email, content) => ({
    type: types.SET_EMAIL,
    payload: { email, content }
  }),
  setAddress: (address, content) => ({
    type: types.SET_ADDRESS,
    payload: { address, content }
  }),
  setPhone: (phone, content) => ({
    type: types.SET_PHONE,
    payload: { phone, content }
  }),
  setUserID: (userID, content) => ({
    type: types.SET_USERID,
    payload: { userID, content }
  }),
  getLoginAsync,
  logOutAsyns,
  loadUserInfo,
  updateUserInfo
};