import React, { Component } from 'react'
import { connect } from 'react-redux';
import Cookies from "js-cookie";
import toastr from 'toastr';
import { routeHistory } from '../../../store';
import { Link } from 'react-router';
import { actions as authUserActions } from '../../../reducers/authUser/actions';
import { actions as ordersActions } from '../../../reducers/orders/actions';
class UserInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      image: '',
      phone: '',
      address: '',
      userID: '',
      info: '',
      loading: false,
      orderOfUser: []
    }
  }
  componentWillMount() {
    if (!Cookies.get("accessToken") || !((this.props.info == "info") 
    || (this.props.info == "order") ||(this.props.info == "follow"))) {
      routeHistory.push("/");
    }
    this.props.loadUserInfo().then(() => {
      console.log(this.props.phone);
      this.setState({
        email: this.props.email, name: this.props.name, userID: this.props.userID,
        image: this.props.image, info: this.props.info, address: this.props.address, phone: this.props.phone
      });
    }).catch(err => console.log(err))
    if (typeof this.props.orderOfUser[0] === "undefined") {
      this.setState({ loading: true });
      console.log("load order");
      this.props.loadOrdersOfUser().then(() => {
        console.log("ok")
        this.setState({ orderOfUser: this.props.orderOfUser, loading: false });
        console.log(this.state.orderOfUser);
      }).catch((err) => {
        console.log(err);
        this.setState({ loading: false });
        console.log("error");
      })
    } else {
      this.setState({ orderOfUser: this.props.orderOfUser });
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ info: nextProps.info, orderOfUser : nextProps.orderOfUser });
  }
  saveUserInformation = (phone, name, address) => {
    if (!phone || !name || !address) {
      toastr.error("Vui lòng nhập đầy đủ thông tin");  
    } else {
      this.setState({loading : true});
      this.props.updateUserInfo(phone, name, address).then(result => {
        this.setState({loading : false, email: this.props.email, name: this.props.name, userID: this.props.userID,
          image: this.props.image, info: this.props.info, phone : this.props.phone});
          toastr.success("Thay đổi thông tin thành công");  
      }).catch(err => {
        console.log(err);
        this.setState({loading : false})
        toastr.success("Thay đổi thông tin thất bại");
      })
    }
  }
  renderContent = () => {
    let content = [];
    if (this.state.info == "info") {
      content.push(
        <div key="info">
          <h3>Thông tin tài khoản</h3>
          <div className="user-information">
            <div className="form-group">
              <label htmlFor="name" className="col-sm-3 control-label">Họ và tên</label>
              <div className="col-sm-9">
                <input disabled={this.props.loading} type="text" className="form-control" name="name"
                  onChange={(event) => { this.setState({ name: event.target.value }) }} value={this.state.name}
                  style={{ width: '70%', fontSize: '20px' }} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="col-sm-3 control-label">Số điện thoại</label>
              <div className="col-sm-9">
                <input disabled={this.props.loading} type="number" className="form-control" name="phone"
                  onChange={(event) => { this.setState({ phone: event.target.value }) }} value={this.state.phone}
                  style={{ width: '70%', fontSize: '20px' }} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address" className="col-sm-3 control-label">Địa chỉ</label>
              <div className="col-sm-9">
                <textarea disabled={this.props.loading} type="text" className="form-control" name="address"
                  onChange={(event) => { this.setState({ address: event.target.value }) }} value={this.state.address}
                  style={{ width: '70%', fontSize: '20px' }} ></textarea>
              </div>
            </div>
            <button className="btn btn-success" disabled={this.props.loading}
             onClick={() => {this.saveUserInformation(this.state.phone, this.state.name, this.state.address)}}> 
              {this.props.loading ? "Đang lưu" : "Lưu"}
            </button>
          </div>
        </div>
      );
    } else if (this.state.info == "follow") {
      content.push(
        <div key="follow">
          <h3>Theo dõi đơn hàng</h3>
          <div className="user-information">
            <div className="unfinishOrder">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderItemOfUnFinishOrder(1, 4)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else if (this.state.info == "order") {
      content.push(
        <div key="follow">
          <h3>Lịch sử mua hàng</h3>
          <div className="user-information">
            <div className="unfinishOrder">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderItemOfUnFinishOrder(5, 6)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
    return content;
  }
  renderItemOfUnFinishOrder = (from, to) => {
    let items = [];
    if (Object.keys(this.state.orderOfUser).length > 0) {
      let length = Object.keys(this.state.orderOfUser).length;
      for (var order = 0; order < length; order++) {
        if (this.state.orderOfUser[order].statusID >= from && this.state.orderOfUser[order].statusID <= to) {
          let id = order;
          let total = this.state.orderOfUser[order].quantity * this.state.orderOfUser[order].price;
          items.push(
            <tr key={order} className="order-item">
              <td>{this.state.orderOfUser[order].name}</td>
              <td style={{ textAlign: 'center' }}>{this.state.orderOfUser[order].quantity}</td>
              <td style={{ textAlign: 'center' }}>{this.state.orderOfUser[order].price}</td>
              <td style={{ textAlign: 'center' }}>{total}</td>
              <td>{this.state.orderOfUser[order].statusName}</td>
            </tr>
          );
        }
      }
    }
    return items;
  }

  render() {
    return (
      <div>
        <div className="user-info-page">
          <div className="user-verbar">
            <div className="header-name">
              <img src={this.state.image} />
              <h4> Tài khoản của<p style={{ fontSize: '25px' }}>{this.state.name}</p></h4>
            </div>
            <div className="vertical-menu">
              <Link to="/me/info">Thông tin của tôi</Link>
              <Link to="/me/follow">Theo dõi đơn hàng</Link>
              <Link to="/me/order">Lịch sử mua hàng</Link>
            </div>
          </div>
          <div className="user-content">
            {this.renderContent()}
          </div>
        </div>
      </div>

    )
  }
}

function mapStateToProps(state, ownProps) {
  const info = ownProps.params.info;
  return {
    info: info,
    name: state.authUser.name,
    userID: state.authUser.userID,
    address: state.authUser.address,
    email: state.authUser.email,
    phone: state.authUser.phone,
    image: state.authUser.image,
    orderOfUser: state.orders.orderOfUser
  }
}
const mapDispatchToProps = {
  updateUserInfo : authUserActions.updateUserInfo,
  loadUserInfo: authUserActions.loadUserInfo,
  loadOrdersOfUser: ordersActions.loadOrdersOfUser,
  updateOrderToStoreByUser: ordersActions.updateOrderToStoreByUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInformation);