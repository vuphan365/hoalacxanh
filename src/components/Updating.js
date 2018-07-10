import React, { Component } from 'react'
import fixing from '../assets/images/fixing.jpg';
export default class Updating extends Component {
  render() {
    return (
      <div>
        <div className="updating-container">
          <img src={fixing} style={{width : "80%", margin : "0 auto"}}/>
          <h3>Tính năng đang hoàn thiện, vui lòng quay lại sau</h3>
        </div>
        
      </div>
    )
  }
}
