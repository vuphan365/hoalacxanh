import Cookies from "js-cookie";
import { push } from "react-router-redux";
import store from "../store";
import fetch from "node-fetch";

export function get(url) {
  let AdminToken = Cookies.get("AdminToken");
  return fetch(url, {
    method: 'GET',
    headers: {
      autherization: "bearer " + AdminToken
    }
  }).then(res => {
    if (res.status === 401) {
      Cookies.remove("accessToken");
      store.dispatch(push("/login"));
    }
    return res;
  });
}

export function del(url) {
  let AdminToken = Cookies.get("AdminToken");
  return fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      autherization: "Bearer " + AdminToken
    }
  }).then(res => {
    if (res.status === 401) {
      Cookies.remove("AdminToken");
      store.dispatch(push("/login"));
    }
    return res;
  });
}

export function post(url, body) {
  let AdminToken = Cookies.get("AdminToken");
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: "Bearer " + AdminToken
    },
    body: body
  }).then(res => {
    if (res.status === 401) {
      Cookies.remove("AdminToken");
      store.dispatch(push("/login"));
    }
    return res;
  });
}

export function put(url, body) {
  let AdminToken = Cookies.get("AdminToken");
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      autherization: "Bearer " + AdminToken
    },
    body: body
  }).then(res => {
    if (res.status === 401) {
      Cookies.remove("AdminToken");
      store.dispatch(push("/login"));
    }
    return res;
  });
}
