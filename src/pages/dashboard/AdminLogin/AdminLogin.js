import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { actions as authAdminActions } from '../../../reducers/authAdmin/actions';
import loadingIcon from "../../../assets/images/loading-icon.gif";
import Footer from "../../../components/layouts/Footer";
import Cookies from "js-cookie";
import '../../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './AdminLogin.css';
import './util.css';

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  render() {
    return (
      <div className="admin-login">
        <h4>ĐĂNG NHẬP</h4>
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50 login-form">
          <form className="login100-form validate-form">
            <div>
              <div>
                <label>Tên đăng nhập * </label>
                <div className="wrap-input100">
                  <input className="input100" type="text" name="username" 
                  placeholder="Vui lòng nhập tên đăng nhập của bạn" required />
                  <span className="focus-input100-1"></span>
                  <span className="focus-input100-2"></span>
                </div>
              </div>
              
              <div>
                <label>Mật khẩu * </label>
                <div className="wrap-input100" >
                  <input className="input100" type="password" name="password" 
                  placeholder="Vui lòng nhập tên đăng nhập của bạn" required />
                  <span className="focus-input100-1"></span>
                  <span className="focus-input100-2"></span>
                </div>
              </div>
            </div>

            <div className="container-login100-form-btn m-t-20 login-button">
              <button className="login100-form-btn">
                <h5>Đăng nhập</h5>
              </button>
            </div>
          </form>
			  </div>
        <Footer></Footer>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  status: state.authAdmin.status
});

const mapDispatchToProps = {
  login: authAdminActions.getLoginAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);