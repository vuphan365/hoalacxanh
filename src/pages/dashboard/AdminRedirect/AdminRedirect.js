import React, { Component } from 'react'
import {routeHistory} from '../../../store';
import Cookies from "js-cookie";
export default class AdminRedirect extends Component {
  componentWillMount() {
    if (Cookies.get("AdminToken") ? routeHistory.push("/admin/products")
        : routeHistory.push("/admin/login"));
  }
  render() {
    return (
      <div>
        ABC
      </div>
    )
  }
}
