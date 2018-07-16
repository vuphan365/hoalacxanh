import React, { Component } from 'react'
import { connect } from "react-redux";
import { actions as authAdminActions } from '../../../reducers/authAdmin/actions';
import loadingIcon from "../../../assets/images/loading-icon.gif";
import Cookies from "js-cookie";
import '../../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './AdminLogin.css';
import './util.css';
import {routeHistory} from '../../../store';
class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleLogin = () => {
    this.props.login(this.state.username, this.state.password);
  }
  componentWillMount() {
    if (Cookies.get("AdminToken")) {
      routeHistory.push("/admin")
    }
  }

  render() {
    let loginButtonContent = "Đăng nhập";
    let isLoading = this.props.status === "loading";
    let isSuccess = this.props.status === "success";
    let isError = this.props.status === "error";
    if (isSuccess) {
        routeHistory.push("/admin")
    } else if (isLoading) {
      loginButtonContent = (
        <img src={loadingIcon} alt="loading" style={{ width: "50px" }} />
      );
    }
    
    return (
      <div className="admin-login">
        <h4>ĐĂNG NHẬP</h4>
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50 login-form">
          <div className="login100-form validate-form">
            <div>
              <div>
                <label>Tên đăng nhập * </label>
                <div className="wrap-input100">
                  <input className="input100" type="text" name="username" 
                  placeholder="Vui lòng nhập tên đăng nhập của bạn" required 
                  onChange ={(event) =>this.setState({username : event.target.value}) }/>
                  <span className="focus-input100-1"></span>
                  <span className="focus-input100-2"></span>
                </div>
              </div>
              
              <div>
                <label>Mật khẩu * </label>
                <div className="wrap-input100" >
                  <input className="input100" type="password" name="password" 
                  placeholder="Vui lòng nhập mật khẩu của bạn" required 
                  onChange ={(event) =>this.setState({password : event.target.value}) }/>
                  <span className="focus-input100-1"></span>
                  <span className="focus-input100-2"></span>
                </div>
              </div>
              {isError && <div className="login-error">{this.props.message}</div>}
            </div>

            <div className="container-login100-form-btn m-t-20 login-button">
              <button className="login100-form-btn" onClick={() => this.handleLogin()}>
                <h5>{loginButtonContent}</h5>
              </button>
            </div>
          </div>
			  </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  status: state.authAdmin.status,
  message : state.authAdmin.message
});

const mapDispatchToProps = {
  login: authAdminActions.getLoginAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);