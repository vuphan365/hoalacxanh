import { connect } from 'react-redux';
import { routeHistory } from '../../../store';
import React, { Component } from 'react'
import { actions as cartActions } from '../../../reducers/carts/actions';
import { actions as orderActions } from '../../../reducers/orders/actions';
import Cookies from "js-cookie";
import toastr from 'toastr';
class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carts: [],
      loading: false
    }
  }
  componentWillMount() {
    if (!Cookies.get("accessToken")) {
      routeHistory.push("/");
    } else {
      if (Object.keys(this.state.carts).length == 0) {
        this.props.loadCarts().then(() => {
          this.setState({ carts: this.props.carts });
        }).catch((err) => {
          console.log(err);
        })
      } else {
        this.setState({ carts: this.props.carts });
      }
    }
  }
  changeQuantity = (index, event) => {
    let carts = this.state.carts;
    carts[index].quantity = event.target.value;
    this.setState({ carts: carts });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ carts: nextProps.carts });
  }
  checkCartOut = () => {
    if (Object.keys(this.state.carts).length == 0) {
      toastr.error("Không có sản phẩm nào trong giỏ hàng");
    } else {
      let address = this.props.address;
      let phone = this.props.phone;
      if (!phone ||!address) {
        toastr.error("Vui lòng bổ sung đầy đủ thông tin trước khi mua hàng");
        routeHistory.push("/me/info");
      }
      let itemList = this.state.carts;
      let userID = this.state.carts[0].userID;
      this.props.addOrderToStore(userID, itemList).then(() => {
        this.props.loadOrdersOfUser().then(() => {
          this.props.deleteAllCartToStore(userID).then(() => {
            this.setState({ loading: false, carts: this.props.carts });
            toastr.success("Thanh toán giỏ hàng thành công", );
            routeHistory.push("/me/follow");
          }).catch(() => {
            toastr.error("Thanh toán giỏ hàng thất bại");
            this.setState({ loading: false, carts: this.props.carts });
          })
        }).catch(() => {
          toastr.error("Thanh toán giỏ hàng thất bại");
          this.setState({ loading: false, carts: this.props.carts });
        })
      }).catch(() => {
        toastr.error("Thanh toán giỏ hàng thất bại");
        this.setState({ loading: false, carts: this.props.carts });
      })
    }

  }
  removeACart = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không")) {
      this.setState({ loading: true });
      this.props.deleteCartToStore(this.state.carts[id].userID, this.state.carts[id].productID).then(() => {
        toastr.success("Xóa sản phẩm thành công");
        this.setState({ loading: false, carts: this.props.carts });
      }).catch(() => {
        toastr.error("Xóa sản phẩm thất bại");
        this.setState({ loading: false, carts: this.props.carts });
      })
    }
  }
  renderCarts = () => {
    let products = [];
    if (Object.keys(this.state.carts).length > 0) {
      let length = Object.keys(this.state.carts).length;
      for (var number = 0; number < length; number++) {
        let id = this.state.carts[length - 1 - number].productID;
        let index = length - 1 - number;
        products.push(
          <div key={number} className="row product">
            <div className="col-md-3">
              <img src={this.state.carts[length - 1 - number].image} style={{ width: '100%' }} />
            </div>
            <div className="col-md-4 product-info">
              <div className="product-name">
                <h3><strong>{this.state.carts[length - 1 - number].productName}</strong></h3>
              </div>
              <div className="product-price">
                <h4><strong>{this.state.carts[length - 1 - number].price} VNĐ</strong></h4>
              </div>
            </div>
            <div className="col-md-5 cart-info">
              <input type="number" className="form-control" name="phone"
                onChange={(event) => { this.changeQuantity(index, event) }}
                value={this.state.carts[length - 1 - number].quantity}
                style={{ marginLeft: '60%', marginTop: '5%', width: '40%', fontSize: '20px' }} />
              <button className="btn btn-danger" onClick={() => { this.removeACart(index) }}
                style={{ width: '40%', margin: '15% 0 0 60%', fontSize: '16px' }}>
                <strong>Xóa</strong>
              </button>
            </div>
          </div >
        );
      }
    }
    return products;
  }
  renderBill = () => {
    let bill = [];
    if (Object.keys(this.state.carts).length > 0) {
      let length = Object.keys(this.state.carts).length;
      var total = 0;
      let discount = 0
      for (var number = 0; number < length; number++) {
        total += this.state.carts[number].quantity * this.state.carts[number].price;
      }
      bill.push(
        <div key={100} className="bill" >
          <h4>
            <div style={{ fontSize: '20px' }}>Thông tin đơn hàng</div>
            <div className="bill-info-temp row" style={{ marginTop: '5%', fontSize: '25px' }}>
              <div className="col-md-6" style={{ textAlign: 'left', }}>Tạm tính</div>
              <div className="col-md-6" style={{ textAlign: 'right' }}>{total} VNĐ</div>
            </div>
            <div className="bill-info-discount row" style={{ marginTop: '5%', fontSize: '25px' }} >
              <div className="col-md-6" style={{ textAlign: 'left' }}>Giảm giá</div>
              <div className="col-md-6" style={{ textAlign: 'right' }}>{discount} VNĐ</div>
            </div>
            <hr />
            <div className="bill-info-total row" style={{ marginTop: '5%', fontSize: '25px' }} >
              <div className="col-md-6" style={{ textAlign: 'left' }}>Tổng cộng</div>
              <div className="col-md-6" style={{ textAlign: 'right' }}>{total - discount} VNĐ</div>
            </div>
          </h4>
          <button disabled={this.state.loading} style={{ width: '40%', margin: '5% 30%', fontSize: '25px' }}
            onClick={() => { this.checkCartOut() }}
            className="btn btn-warning">THANH TOÁN</button>
        </div >
      );
    }
    return bill;
  }
  render() {
    let isCartExist = (Object.keys(this.props.carts).length > 0);
    return (
      <div>
        <div className="cart-page">
          <div className="header-name"><h3>GIỎ HÀNG</h3></div>
          {isCartExist ?
            <div className="cart-container">
              <div className="cart-list">
                {this.renderCarts()}
              </div>
              <div className="cart-information">
                {this.renderBill()}
              </div>
            </div>
            : <div><h3><strong>Không có sản phẩm nào trong giỏ hàng</strong></h3></div>
          }


        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  carts: state.carts.carts,
  address: state.authUser.address,
  phone: state.authUser.phone
});

const mapDispatchToProps = {
  loadCarts: cartActions.loadCarts,
  deleteCartToStore: cartActions.deleteCartToStore,
  deleteAllCartToStore: cartActions.deleteAllCartToStore,
  loadOrdersOfUser: orderActions.loadOrdersOfUser,
  addOrderToStore: orderActions.addOrderToStore
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);