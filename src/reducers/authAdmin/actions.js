import Cookies from "js-cookie";
import { types } from "./constants";
import fetch from "node-fetch";
import * as adminFetch from '../../utils/adminFetch';
import { BACKEND_URL } from '../../config/constants';
// create login function to comminucate with server and store when client log in
function getLoginAsync(username, password) {
  return dispatch => {
    // change state of autheticated action to loading before API call
    dispatch(actions.setStatus("loading"));
    // declare url of API and prepare API call
    let url = `${BACKEND_URL}/admin/signin`;
    
    // declare API request 
    const requestOptions = {
      //mode: 'no-cors', // 'cors' by default
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "autherization": " bearer "
      },
      body: JSON.stringify({ username, password })
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
              Cookies.set("AdminToken", json.token);
              // change state of autheticated action to success after API call successly
              dispatch(actions.setStatus("success"));
            } else {
              dispatch(actions.setStatus("error"));
            }
          })
          .catch(err => {
            // if API call is error then change state of autheticated action to error
            dispatch(actions.setStatus("error"));
          });
      })
      .catch(err => {
        // if API call is error then change state of autheticated action to error
        dispatch(actions.setStatus("error"));
      });
  };
}
function logOutAsyns() {
  return dispatch => {
    // change state of autheticated action to loading before log out
    dispatch(actions.setStatus("loading"));
    // Remove access token to cookie
    Cookies.remove("AdminToken");
    dispatch(actions.setImage());
    dispatch(actions.setUsername());
    // change state of autheticated action to success after API call successly
    dispatch(actions.setStatus("unauthorized"));
   };
}
function loadAdminInfo() {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/admin/me`;
      adminFetch.get(url).then(res => {
        res
        .json()
        .then(json => {
          if (json.username !== "") {
            dispatch(actions.setImage(json.image));
            dispatch(actions.setUsername(json.username.toUpperCase()));
            resolve(true);
          } else reject();
        }).catch(() => reject());
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
  setAdminID: (adminID, content) => ({
    type: types.SET_ADMINID,
    payload: { adminID, content }
  }),
  setImage: (image, content) => ({
    type: types.SET_IMAGE,
    payload: { image, content }
  }),
  setUsername: (username, content) => ({
    type: types.SET_USERNAME,
    payload: { username, content }
  }),
  getLoginAsync,
  logOutAsyns,
  loadAdminInfo
};