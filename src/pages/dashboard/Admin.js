import React, { Component } from 'react'
import AdminBar from '../../components/AdminBar';
import PropTypes from 'prop-types';
import Cookies from "js-cookie";
import {routeHistory} from '../../store';
export default class Admin extends Component {
  componentWillMount() {
    if (!Cookies.get("AdminToken")) routeHistory.push("/admin/login"); 
  }
  render() {
    console.log("AdminRoute");
    return (
      <div className="admin-page">
        <div className="admin-sidebar"><AdminBar /></div>
        <div className="admin-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}
Admin.propTypes = {
  children: PropTypes.object.isRequired
}
