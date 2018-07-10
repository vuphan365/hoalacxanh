import React, { Component } from 'react'
import { connect } from 'react-redux';
import {routeHistory} from '../../../store';
import {actions as productsActions} from '../../../reducers/products/actions';
import { actions as productTypesActions } from '../../../reducers/productTypes/actions';
import toastr from 'toastr';
import ProductPage from './ProductPage';
class UpdateProduct extends Component {
  constructor(props) {
      super(props);
      this.state = {
          productTypes : [],
          product: { name: '', productID : '', price: '', content: '', typeID: '1', image : '' },
          changeImage : false,
          loading : false
      }
  }

  componentWillMount() {
    if (typeof this.props.products[0] === "undefined") {
      this.setState({loading : true});
      console.log("load product");
      this.props.loadAllProducts().then(() => {
        console.log("ok")
        this.setState({products : this.props.products, loading : false});
      }).catch((err) => {
        this.setState({loading : false});
        toastr.error('Lỗi tải dữ liệu, vui lòng thử lại');
      })
    } else {
      this.setState({products : this.props.products});
    }
    if (this.props.productId != null) {
      this.setState({loading : true});
        this.props.loadProduct(this.props.productId).then((result) => {
          console.log(this.props.product);
          this.setState({product : this.props.product, loading : false});
        }).catch(err => {
          this.setState({loading : false});
          toastr.error('Đường dẫn này không tồn tại');
          routeHistory.push("/admin/products");
        })
    }
    if (typeof this.props.productTypes[0] === "undefined") {
      this.setState({loading : true});
      console.log("load product types");
      this.props.loadAllProductTypes().then(() => {
        this.setState({ productTypes: this.props.productTypes, loading : false })
      }).catch((err) => {
        this.setState({loading : false});
        console.log(err);
        toastr.error('Lỗi tải dữ liệu, vui lòng thử lại');
      })
    }else {
      this.setState({ productTypes: this.props.productTypes });
    }
  }
  updateName = (event) => {
    let product = this.state.product
    product.name = event.target.value;
    this.setState({ product: product });
  }
  updatePrice = (event) => {
    let product = this.state.product
    product.price = event.target.value;
    this.setState({ product: product });
  }
  updateTypeID = (event) => {
    let product = this.state.product
    product.typeID = event.target.value;
    this.setState({ product: product });
  }
  updateContent = (event) => {
    let product = this.state.product
    product.content = event;
    this.setState({ product: product });
  }
  updateImage = (event) => {
    let product = this.state.product
    product.image = event.target.files[0];
    this.setState({ product: product, changeImage : true });
  }
  saveProduct = (event) => {
    console.log(this.state.product);
    event.preventDefault();
    let product = this.state.product;
    if (!product.name || !product.price || !product.typeID || !product.content) {
      toastr.error('Vui lòng điền đầy đủ thông tin');
    } else {
      this.setState({ loading: true });
      if (this.state.changeImage) {
        this.props.uploadImage(product.image).then((url) => {
          product.image = url;
          if (product.productID === "") {
            this.props.addProductToStore(product).then(() => {
              this.setState({loading : false});
              toastr.success("Thêm sản phẩm thành công");
              routeHistory.push('/admin/products')
            }).catch(() => {
              toastr.error("Thêm sản phẩm không thành công");
              this.setState({loading : false});
            })
          } else {
            this.props.editProductToStore(product).then(() => {
              this.setState({loading : false});
              toastr.success("Sửa sản phẩm thành công");
              routeHistory.push('/admin/products')
            }).catch(() => {
              toastr.error("Sửa sản phẩm không thành công");
              this.setState({loading : false});
            })
          }
        }).catch(err => {
          this.setState({ loading: false });
        });
      } else {
        if (product.productID === "") {
          this.props.addProductToStore(product).then(() => {
            this.setState({loading : false});
            toastr.success("Thêm sản phẩm thành công");
            routeHistory.push('/admin/products')
          }).catch(err => {
            toastr.error("Thêm sản phẩm không thành công");
            this.setState({loading : false});
          })
        } else {
          console.log(product.productID);
          this.props.editProductToStore(product).then(() => {
            this.setState({loading : false});
            toastr.success("Sửa sản phẩm thành công");
            routeHistory.push('/admin/products')
          }).catch(err => {
            toastr.error("Sửa sản phẩm không thành công");
            this.setState({loading : false});
          })
        }
      }
    }
  }
  render() {
    return (
      <div>
        <ProductPage productTypes={this.state.productTypes} product={this.state.product} updateName={this.updateName} updateContent={this.updateContent}
          updateImage={this.updateImage} updatePrice={this.updatePrice} updateTypeID={this.updateTypeID}
          saveProduct={this.saveProduct} updateContent={this.updateContent} loading = {this.state.loading}/>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const productId = ownProps.params.id;
  return {
     products: state.products.products,
     productId : productId,
     product : state.products.product,
     productTypes: state.productTypes.productTypes
  }
}
const mapDispatchToProps = {
  loadAllProducts: productsActions.loadAllProducts,
  loadProduct: productsActions.loadProduct,
  uploadImage : productsActions.uploadImage,
  addProductToStore : productsActions.addProductToStore,
  editProductToStore : productsActions.editProductToStore,
  loadAllProductTypes: productTypesActions.loadAllProductTypes
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);