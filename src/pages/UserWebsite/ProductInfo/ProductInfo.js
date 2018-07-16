import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { actions as productsActions } from '../../../reducers/products/actions';
import Footer from '../../../components/layouts/Footer';
import SimpleSlider from '../../../components/SimpleSlider';
import { routeHistory } from '../../../store';
import { actions as cartActions } from '../../../reducers/carts/actions';
import Cookies from "js-cookie";
import toastr from 'toastr';
class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: { name: '', image: '', content: '', price: '', productID: '' },
      quantity: 0,
      products: [],
      productID: null,
      carts: [],
      loading: false
    }
  }
  componentWillMount() {
    console.log('load')
    if (this.props.productID != null) {
      this.props.loadProduct(this.props.productID).then((result) => {
        this.setState({ product: this.props.product, productID: this.props.productID });
      }).catch(err => {
        this.setState({ loading: false });
        routeHistory.push("/products");
      })
    }
    if (typeof this.props.products[0] === "undefined") {
      this.setState({ loading: true });
      console.log("load product");
      this.props.loadAllProducts().then(() => {
        console.log("ok")
        this.setState({ products: this.props.products, loading: false });
        console.log(this.state.products);
      }).catch((err) => {
        this.setState({ loading: false });
      })
    } else {
      this.setState({ products: this.props.products });
    }
    if (Object.keys(this.props.carts).length == 0) {
      console.log(this.props.carts);
      this.props.loadCarts().then(() => {
        this.setState({ carts: this.props.carts });
      }).catch((err) => {
        console.log(err);
      })
    } else {
      this.setState({ carts: this.props.carts });
    }
  }
  renderBestProduct = () => {
    let bestProducts = [];
    if (Object.keys(this.state.products).length > 0) {
      for (var type = 0; type < 7; type++) {
        let id = this.state.products[type].productID;
        bestProducts.push(
          <div key={id} className="render-best-product">
            <div className="product-image">
              <Link to={"/product/" + id}>
                <img src={this.state.products[type].image} style={{ width: '80%', height: 'auto' }} />
              </Link>
            </div>
          </div>
        );
      }
    }
    return bestProducts;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ productID: nextProps.productID, carts: nextProps.carts });
  }
  addProductToCart = () => {
    this.setState({ loading: true });
    if (!Cookies.get("accessToken")) {
      toastr.error("Vui lòng đăng nhập trước khi mua hàng");
      this.setState({ loading: false });
    } else {
      if (this.state.quantity <= 0) {
        toastr.error("Vui lòng nhập số lượng sản phẩm");
        this.setState({ loading: false });
      } else {
        console.log(this.state.carts);
        if (Object.keys(this.state.carts).length > 0) {
          let userID = this.props.userID;
          let productID = this.state.productID;
          let quantity = Number(this.state.quantity);
          let isProductInCart = this.findProductInCart();
          if (isProductInCart != null) {
            quantity += Number(isProductInCart.quantity);
            this.props.updateCartToStore(userID, productID, quantity).then(() => {
              toastr.success("Thêm sản phẩm vào giỏ hàng thành công");
              this.setState({ loading: false });
            }).catch(err => {
              toastr.error("Thêm sản phẩm vào giỏ hàng thất bại");
              console.log(err);
              this.setState({ loading: false });
            });
          } else {
            this.props.addCartToStore(userID, productID, quantity).then(() => {
              toastr.success("Thêm sản phẩm vào giỏ hàng thành công");
              this.setState({ loading: false });
            }).catch(err => {
              toastr.error("Thêm sản phẩm vào giỏ hàng thất bại");
              console.log(err);
              this.setState({ loading: false });
            });
          }
        } else {
          let userID = this.props.userID;
          let productID = this.state.productID;
          let quantity = this.state.quantity;
          let cart = JSON.stringify({ userID, productID, quantity });
          this.props.addCartToStore(userID, productID, quantity).then(() => {
            toastr.success("Thêm sản phẩm vào giỏ hàng thành công");
            this.setState({ loading: false });
          }).catch(err => {
            toastr.error("Thêm sản phẩm vào giỏ hàng thất bại");
            console.log(err);
            this.setState({ loading: false });
          });
        }
      }

    }
  }
  findProductInCart = () => {
    if (Object.keys(this.state.carts).length > 0) {
      for (var i = 0; i < Object.keys(this.state.carts).length; i++) {
        if (this.state.carts[i].productID == this.state.productID) {
          return this.state.carts[i];
        }
      }
    } return null;
  }
  renderProduct = () => {
    let product = [];
    if (this.state.product.productID != this.state.productID) {
      this.props.loadProduct(this.props.productID).then((result) => {
        this.setState({ product: this.props.product, productID: this.props.productID });
      }).catch(err => {
        routeHistory.push("/products");
      })
    }
    product.push(<div key={this.state.productID} className="product-content">
      <div className="product-image">
        <img src={this.state.product.image} style={{ width: '80%', height: 'auto' }} />
      </div>
      <div className="product-description">
        <div className="product-name"><h3><strong>{this.state.product.name}</strong></h3></div>
        <strong><div className="product-text" dangerouslySetInnerHTML={{ __html: this.state.product.content }}></div></strong>
      </div>
      <div className="product-action">
        <div className="quantity-input form-group" style={{ fontSize: '18px' }}>
          <strong>Số lượng</strong>
          <input disabled={this.props.loading} type="number" className="form-control" name="price"
            onChange={(event) => { this.setState({ quantity: event.target.value }) }}
            value={this.state.quantity} style={{ width: '30%', fontSize: '20px' }} />
          <div className="button-input">
            <button disabled={this.state.loading} className="btn btn-success"><strong style={{ fontSize: "20px" }}
              onClick={() => { this.addProductToCart() }}>THÊM VÀO GIỎ</strong></button>
          </div>
          <div className="more-info">
            <strong>
              <p>Liên hệ</p>
              <p><span className="glyphicon glyphicon-earphone"></span> 01698336834</p>
              <p><span className="glyphicon glyphicon-envelope"></span>Hoalacxanh@gmail.com</p>
              <p><span className="glyphicon glyphicon-map-marker"></span>Trường Đại học FPT, Hà Nội</p>
            </strong>
          </div>
        </div>
      </div>
      <br />

    </div>);
    return product;
  }
  render() {
    let name = this.state.product.name.toUpperCase();
    return (
      <div>
        <div className="product-info-page">
          <div className="header-name"><h3>{name}</h3></div>
          {this.renderProduct()}
          <div className="best-product-content">
            <hr />
            <h3><strong>SẢN PHẨM NỔI BẬT</strong></h3>
            <SimpleSlider slidesToShow={3} speed={500} items={this.renderBestProduct} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const productID = ownProps.params.id;
  return {
    productID: productID,
    product: state.products.product,
    products: state.products.products,
    carts: state.carts.carts,
    userID: state.authUser.userID
  }
}

const mapDispatchToProps = {
  loadProduct: productsActions.loadProduct,
  loadAllProducts: productsActions.loadAllProducts,
  loadCarts: cartActions.loadCarts,
  addCartToStore: cartActions.addCartToStore,
  updateCartToStore: cartActions.updateCartToStore
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);