import React, { Component } from 'react'
import { connect } from 'react-redux';
import toastr from 'toastr';
import { actions as productsActions } from '../../../reducers/products/actions';
import { actions as productTypesActions } from '../../../reducers/productTypes/actions';
import { Link } from 'react-router';
import Footer from '../../../components/layouts/Footer';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productTypes: [],
      products: [],
      typeID: null,
      foundNumber: 0
    }
  }
  componentWillMount() {
    if (typeof this.props.products[0] === "undefined") {
      this.setState({ loading: true });
      console.log("load product");
      this.props.loadAllProducts().then(() => {
        console.log("ok")
        this.setState({ products: this.props.products, loading: false });
        console.log(this.state.products);
      }).catch((err) => {
        this.setState({ loading: false });
        toastr.error('Lỗi tải dữ liệu, vui lòng thử lại');
      })
    } else {
      this.setState({ products: this.props.products });
    }
    if (typeof this.props.productTypes[0] === "undefined") {
      this.setState({ loading: true });
      console.log("load product types");
      this.props.loadAllProductTypes().then(() => {
        this.setState({ productTypes: this.props.productTypes, loading: false })
        console.log(this.state.productTypes);
      }).catch((err) => {
        this.setState({ loading: false });
        toastr.error('Lỗi tải dữ liệu, vui lòng thử lại');
      })
    } else {
      this.setState({ productTypes: this.props.productTypes });
    }
    if (this.props.typeID != null) {
      this.setState({ typeID: this.props.typeID })
    }
  }
  renderProductTypes = () => {
    let types = []
    if (Object.keys(this.state.productTypes).length > 0) {
      for (var type = 0; type < Object.keys(this.state.productTypes).length; type++) {
        let id = this.state.productTypes[type].typeID;
        let name = this.state.productTypes[type].typeName[0];
        for (var i = 1; i < this.state.productTypes[type].typeName.length; i++) {
          if (this.state.productTypes[type].typeName[i - 1] === ' ') {
            name += this.state.productTypes[type].typeName[i].toUpperCase();
          } else name += this.state.productTypes[type].typeName[i];
        }
        types.push(
          <li key={id}><Link style={{ textDecoration: 'none', color: '#000000' }}
            to={"/categories/" + id}><strong>{name}</strong></Link></li>
        );
      }
    }
    return types;
  }

  renderProducts = () => {
    let products = [];
    let number = 0;
    if (Object.keys(this.state.products).length > 0) {
      let length = Object.keys(this.state.products).length;
      if (this.state.typeID != null) {
        if (this.state.typeID != null && this.state.productTypes[this.state.typeID - 1] != null) {
          products.push(<div className="type-content" key={1000}>
            <strong>" {this.state.productTypes[this.state.typeID - 1].content} "</strong>
          </div>);
        }
        for (var type = 0; type < length; type++) {
          let id = this.state.products[length - 1 - type].productID;
          if (this.state.products[length - 1 - type].typeID == this.state.typeID) {
            number++;
            products.push(
              <div key={id} className="col-md-3 product">
                <div className="product-image">
                  <img src={this.state.products[length - 1 - type].image} style={{ width: '80%' }} />
                  <div className="text-view transition">
                    <Link to={"/product/" + id} style={{ textDecoration: 'none', color: '#ffffff' }} >
                      <h3><strong>View Details</strong></h3>
                    </Link>
                  </div>

                </div>
                <div className="product-name"><h3>{this.state.products[length - 1 - type].name}</h3></div>
              </div>
            );
          }
        }
      } else {
        for (var type = 0; type < length; type++) {
          let id = this.state.products[length - 1 - type].productID;
          number++;
          products.push(
            <div key={id} className="col-md-3 product">
              <div className="product-image">
                <img src={this.state.products[length - 1 - type].image} style={{ width: '80%' }} />
                <div className="text-view transition">
                  <Link to={"/product/" + id} style={{ textDecoration: 'none', color: '#ffffff' }} >
                    <h3><strong>View Details</strong></h3>
                  </Link>
                </div>
              </div>
              <div className="product-name"><h3>{this.state.products[length - 1 - type].name}</h3></div>
            </div>
          );
        }
      }

      products.push(<div key={"Tổng cộng"} className="col-md-12" style={{ textAlign: 'center', fontSize: '20px' }}>
        <strong>Có tổng cộng {number} sản phẩm trong nhóm</strong>
      </div>);
    }
    return products;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ typeID: nextProps.typeID });
  }
  render() {
    return (
      <div>
        <div className="categories-page">
          <div className="header-name"><h3>SẢN PHẨM</h3></div>
          <div className="productTypes-nav">
            <ul className="list-inline">
              <li key={"Tất cả"}><Link style={{ textDecoration: 'none', color: '#000000' }}
                to="/categories"><strong>Tất cả</strong></Link></li>
              {this.renderProductTypes()}
            </ul>
          </div>
          <div className="product-list">
            {this.renderProducts()}
          </div>
        </div>
        <Footer />
      </div>

    )
  }
}
function mapStateToProps(state, ownProps) {
  const typeID = ownProps.params.id;
  return {
    typeID: typeID,
    products: state.products.products,
    productTypes: state.productTypes.productTypes
  }
}

const mapDispatchToProps = {
  loadAllProducts: productsActions.loadAllProducts,
  loadAllProductTypes: productTypesActions.loadAllProductTypes
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);