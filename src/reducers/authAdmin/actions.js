import Cookies from "js-cookie";
import { types } from "./constants";

// create login function to comminucate with server and store when client log in
function getLoginAsync(username, password) {
  return dispatch => {
    // change state of autheticated action to loading before API call
    dispatch(actions.setStatus("loading"));
    // declare url of API and prepare API call
    let url = `https://hoalacxanh-server.azurewebsites.net/admin/signin`;

    // declare API request 
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    };
    // begin API call and get access token from server
    fetch(url, requestOptions)
      .then(res => {
        res
          .json()
          .then(json => {
            // Save access token to cookie
            Cookies.set("accessToken", json.data.token);

            // change state of autheticated action to success after API call successly
            dispatch(actions.setStatus("success"));
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
    Cookies.remove("accessToken");
    // change state of autheticated action to success after API call successly
    dispatch(actions.setStatus("unauthorized"));
   };
}

// create actions to save state of authetication
export const actions = {
  setStatus: (status, content) => ({
    type: types.SET_STATUS,
    payload: { status, content }
  }),
  getLoginAsync,
  logOutAsyns
};