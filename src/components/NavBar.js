import React, { Component } from 'react'
import { connect } from "react-redux";
import FbLogin from '../assets/images/fblogin.png';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';
import { actions as authUserActions } from '../reducers/authUser/actions';
import * as firebase from 'firebase';
import { routeHistory } from '../store';
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      image: '',
      phone: '',
      address: '',
      userID: ''
    }
  }
  componentWillMount() {
    if (this.props.name === "") {
      firebaseApp.auth().onAuthStateChanged(user => {
        if (user) {
          console.log('user has signed in or up', user);
          let { email, displayName, photoURL } = user;
          photoURL += "?type=large";
          this.props.getLoginAsync(email, displayName, photoURL).then(() => {
            this.props.loadUserInfo().then(() => {
              this.setState({
                email: this.props.email, name: this.props.name, userID: this.props.userID,
                image: this.props.image
              });
              
              if (this.props.address !== "") {
                this.setState({ address: this.props.address });
              }
              if (this.props.phone !== "") {
                this.setState({ phone: this.props.phone });
              }
              
            }).catch(err => console.log(err))
          }).catch(err => console.log(err));
        }
      });
    }
  }
  signOut = () => {
    firebaseApp.auth().signOut().then(() => {
      this.props.logOutAsyns();
      routeHistory.push("/");
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ email: nextProps.email, name: nextProps.name, userID: nextProps.userID,
      image: nextProps.image, address: nextProps.address, phone: nextProps.phone});
  }
  signInWithFacebook = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      let { email, displayName } = result;
      this.setState({ name: displayName, email: email });
      this.props.getLoginAsync(email);
    }).catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="user-menu menu">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/"><span className="glyphicon glyphicon-home"></span></Link>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/">TRANG CHỦ</Link></li>
              <li><Link to="/categories">SẢN PHẨM</Link></li>
              <li><Link to="/blogs">BLOG</Link></li>
              {this.state.name ? <li><Link to="/cart">
                <span className="glyphicon glyphicon-shopping-cart" style={{fontSize : '17px'}}></span> GIỎ HÀNG
              </Link></li> : <li></li>}
            </ul>
            <ul className="nav navbar-nav navbar-right" style={{marginRight : '3%', marginTop: '0.5%'}}>
              <li style={{marginTop : '2%'}}>
                <span >
                  {this.state.name ?
                    <div className="user-login">
                      Xin chào <Link className="user-name" style={{ color: '#ffffff' }}
                        to="/me/info">{this.state.name}</Link>
                    </div> :
                    <div>
                      <img style={{cursor : 'pointer'}} onClick={() => { this.signInWithFacebook() }} src={FbLogin} />
                    </div>}
                </span>
              </li>
              <li>{this.state.name ? <button onClick={() => {this.signOut()}} style={{ marginLeft: '10%' }} className="btn btn-danger">
              <strong>Đăng xuất</strong>
              </button> : <span></span>}</li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  status: state.authUser.status,
  name: state.authUser.name,
  userID: state.authUser.userID,
  address: state.authUser.address,
  email: state.authUser.email,
  phone: state.authUser.phone,
  image: state.authUser.image
});

const mapDispatchToProps = {
  getLoginAsync: authUserActions.getLoginAsync,
  loadUserInfo: authUserActions.loadUserInfo,
  logOutAsyns : authUserActions.logOutAsyns
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);