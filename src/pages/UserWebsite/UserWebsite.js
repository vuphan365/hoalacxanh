import React, { Component } from 'react'
import NavBar from '../../components/NavBar';

export default class UserWebsite extends Component {
  render() {
    return (
      <div>
        <div className="user-page">
        <div className="user-sidebar"><NavBar /></div>
        <div className="user-content">
          {this.props.children}
        </div>
      </div>
      </div>
    )
  }
}
