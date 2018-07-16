import React, { Component } from 'react'
import AdminAvatar from '../assets/images/succulent2.jpg';
import { connect } from "react-redux";
import { actions as authAdminActions } from '../reducers/authAdmin/actions';
import { routeHistory } from '../store';
import { Link } from 'react-router';
import toastr from 'toastr';

class AdminBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      username: ''
    }
  }
  logOut() {
    this.props.logOut();
    routeHistory.push("/admin/login");
  }
  componentWillMount() {
    if (this.props.username === undefined) {
      this.props.loadAdminInfo().then(() => {
        this.setState({ image: this.props.image, username: this.props.username });
      }).catch(err => {
        toastr.error("Lỗi, vui lòng thử lại")
      })
    } else {
      this.setState({ image: this.props.image, username: this.props.username });
    }
  }

  render() {
    return (
      <div>
        <div className="sidenav">
          {this.state.image ? <img src={this.state.image} className="admin-avatar" />
            : <img src={AdminAvatar} className="admin-avatar" />}
          <div className="center">
            <h3>{this.state.username ? this.state.username : 'ADMIN'}</h3>
            <button className="btn btn-danger" onClick={() => { this.logOut() }}>Đăng xuất</button>
          </div>

          <Link to="/admin/products">Sản phẩm</Link>
          <Link to="/admin/orders">Đơn hàng</Link>
          <Link to="/admin/blogs">Bài viết</Link>
          {/* <Link to="/admin/password">Đổi mật khẩu</Link>
          <Link to="/admin/add">Thêm quản trị</Link> */}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  image: state.authAdmin.image,
  username: state.authAdmin.username,
  adminID: state.authAdmin.adminID
});

const mapDispatchToProps = {
  logOut: authAdminActions.logOutAsyns,
  loadAdminInfo: authAdminActions.loadAdminInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminBar);
