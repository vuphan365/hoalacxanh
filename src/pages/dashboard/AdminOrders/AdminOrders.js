import React, { Component } from 'react'
import { connect } from "react-redux";
import { actions as ordersActions } from '../../../reducers/orders/actions';
import toastr from 'toastr';

const tableStyle = {
  marginTop: '2%',
  width : '90%'
}

class AdminOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      orders: [],
      statusOrders: [],
      viewOrders: [],
      orderID: null
    }
  }
  componentWillMount() {
    if (typeof this.props.orders[0] === "undefined") {
      this.setState({ loading: true });
      console.log("load order");
      this.props.loadAllOrders().then(() => {
        console.log("ok")
        this.setState({ orders: this.props.orders, loading: false });
        console.log(this.state.orders);
      }).catch((err) => {
        console.log(err);
        this.setState({ loading: false });
        console.log("error");
        toastr.error('Lỗi tải dữ liệu, vui lòng thử lại');
      })
    } else {
      this.setState({ orders: this.props.orders });
    }
    if (typeof this.props.statusOrders[0] === "undefined") {
      this.setState({ loading: true });
      console.log("load status order");
      this.props.loadAllStatusOrders().then(() => {
        console.log(this.props.statusOrders);
        this.setState({ statusOrders: this.props.statusOrders, loading: false })
        console.log(this.state.statusOrders);
      }).catch((err) => {
        console.log(err);
        this.setState({ loading: false });
        console.log("error");
        toastr.error('Lỗi tải dữ liệu, vui lòng thử lại');
      })
    } else {
      this.setState({ statusOrders: this.props.statusOrders });
    }
    if (typeof this.props.viewOrders[0] === "undefined") {
      this.setState({ loading: true });
      console.log("load status order");
      this.props.loadViewOrders().then(() => {
        console.log(this.props.viewOrders);
        this.setState({ viewOrders: this.props.viewOrders, loading: false })
        console.log(this.state.viewOrders);
      }).catch((err) => {
        console.log(err);
        this.setState({ loading: false });
        console.log("error");
        toastr.error('Lỗi tải dữ liệu, vui lòng thử lại');
      })
    } else {
      this.setState({ viewOrders: this.props.viewOrders });
    }
  }
  renderOption = () => {
    let options = [];
    for (var status in this.state.statusOrders) {
      options.push(
        <option key={this.state.statusOrders[status].statusID}
          value={this.state.statusOrders[status].statusID}
        >{this.state.statusOrders[status].statusName}</option>
      )
    }
    return options;
  }
  saveOrder = (order) => {
    this.setState({ loading: true })
    this.props.updateOrderToStore(order).then(() => {
      toastr.success("Lưu trạng thái thành công");
      this.setState({ viewOrders: this.props.viewOrders, loading: false })
    }).catch(() => {
      toastr.error("Lưu trạng thái thành công");
      this.setState({ loading: false });
    })
  }
  changeStatus = (event, number) => {
    console.log(this.state.viewOrders[number].statusID);
    let viewOrders = this.state.viewOrders;
    viewOrders[number].statusID = event.target.value;
    this.setState({ viewOrders: viewOrders });
    console.log(this.state.viewOrders[number].statusID);
  }
  renderOrderDetail = () => {
    let orderDetail = [];
    let total = 0;
    for (var detail = 0; detail < Object.keys(this.state.orders).length; detail++) {
      let id = this.state.orders[detail].orderID;
      if (id === this.state.orderID) {
        let money = this.state.orders[detail].price * this.state.orders[detail].quantity;
        total += money;
        orderDetail.push(
          <tr key={detail}>
            <td>{this.state.orders[detail].orderID}</td>
            <td>{this.state.orders[detail].name}</td>
            <td>{this.state.orders[detail].price}</td>
            <td>{this.state.orders[detail].quantity}</td>
            <td>{money}</td>
          </tr>
        );
      }
    }
    if (Object.keys(orderDetail).length > 0) orderDetail.push(
      <tr key={Object.keys(orderDetail).length}>
        <td></td><td></td><td></td><td><strong>Tổng cộng</strong></td><td><strong>{total}</strong></td>
      </tr>); else {
      orderDetail.push(
        <tr key={Object.keys(orderDetail).length}>
          <td colSpan="5" style={{ textAlign: "center" }}>Không có mặt hàng trong đơn hàng</td>
        </tr>);
    }
    return orderDetail;
  }
  seeDetailAnOrder = (id) => {
    this.setState({ orderID: id });
  }
  renderOrder = () => {
    let table = []
    for (var view in this.state.viewOrders) {
      let number = view;
      table.push(
        <tr key={view}>
          <td>{this.state.viewOrders[view].orderID}</td>
          <td>{this.state.viewOrders[view].username}</td>
          <td>{this.state.viewOrders[view].address}</td>
          <td>{this.state.viewOrders[view].phone}</td>
          <td><select onChange={(event) => { this.changeStatus(event, number); }}
            value={this.state.viewOrders[view].statusID} >
            {this.renderOption()}
          </select></td>
          <td><button className="btn btn-success" onClick={() => { this.saveOrder(this.state.viewOrders[number]) }}>Lưu</button></td>
          <td><button type="button" className="btn btn-primary"
            onClick={() => { this.seeDetailAnOrder(this.state.viewOrders[number].orderID) }}>Xem</button></td>
        </tr>
      );
    }
    return table;
  }
  renderInformationOfOrder = () => {
    let info = this.state.orderID;
    for (var number = 0; number < Object.keys(this.state.viewOrders).length; number++) {
      let id = this.state.viewOrders[number].orderID;
      if (id === info) {
        return (
          <div>
            <p>Khách hàng: <strong>{this.state.viewOrders[number].username}</strong></p>
            <p>Địa chỉ: <strong>{this.state.viewOrders[number].address}</strong></p>
            <p>Số điện thoại: <strong>{this.state.viewOrders[number].phone}</strong></p>
            <p>Trạng thái: <strong>{this.state.statusOrders[this.state.viewOrders[number].statusID - 1].statusName}</strong></p>
          </div>
        );
      }
    }  
  }
  render() {
    return (
      <div>
        {this.state.loading ?
          <div className="loader-container"><div className="loader"></div></div>
          :
          <div></div>
        }
        <div className="container">
          <table className="table table-striped" style={tableStyle}>
            <thead>
              <tr>
                <th>Số đơn hàng</th>
                <th>Khách hàng</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Trạng thái</th>
                <th>Lưu</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {this.renderOrder()}
            </tbody>
          </table>
          {this.state.orderID ? <div>
            <h3>Thông tin đơn hàng</h3>
            {this.renderInformationOfOrder()}
            <table className="table table-bordered" style={tableStyle}>
              <thead>
                <tr>
                  <th>Số đơn hàng</th>
                  <th>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orderID ? this.renderOrderDetail() : <tr></tr>}
              </tbody>
            </table>
          </div> : <div></div>}

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  viewOrders: state.orders.viewOrders,
  orders: state.orders.orders,
  statusOrders: state.orders.statusOrders
});

const mapDispatchToProps = {
  loadViewOrders: ordersActions.loadViewOrders,
  loadAllOrders: ordersActions.loadAllOrders,
  loadAllStatusOrders: ordersActions.loadAllStatusOrders,
  updateOrderToStore: ordersActions.updateOrderToStore
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders);