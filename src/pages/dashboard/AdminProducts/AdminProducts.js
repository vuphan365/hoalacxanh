import React, { Component } from 'react'
import { connect } from "react-redux";
import { actions as productsActions } from '../../../reducers/products/actions';
import { actions as productTypesActions } from '../../../reducers/productTypes/actions';
import { routeHistory } from '../../../store';
import { Link } from 'react-router';
import toastr from 'toastr';

const tableStyle = {
  marginTop: '2%',
  width : '90%'
}

class AdminProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productTypes: [],
      products: [],
      loading: false
    }
  }

  componentWillMount() {
    if (typeof this.props.products[0] === "undefined") {
      this.setState({ loading: true });
      console.log("load product");
      this.props.loadAllProducts().then(() => {
        console.log("ok")
        this.setState({ products: this.props.products, loading: false });
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
  }
  addNewProduct = () => {
    console.log("/admin/products/add");
    routeHistory.push("/admin/products/add");
  }
  deleteProduct = (product) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không")) {
      this.setState({ loading: true });
      this.props.deleteProductToStore(product).then(() => {
        toastr.success("Xóa sản phẩm thành công");
        this.setState({ loading: false, products : this.props.products });
      }).catch(() => {
        toastr.error("Xóa sản phẩm thất bại");
        this.setState({ loading: false, products : this.props.products });
      })
    }
  }
  renderProduct = () => {
    let table = []
    for (var product in this.state.products) {
      let id = this.state.products[product].typeID;
      table.push(
        <tr key={this.state.products[product].productID}>
          <td>{this.state.products[product].productID}</td>
          <td>{this.state.products[product].name}</td>
          <td>{this.state.products[product].content.substring(0, 30)}...</td>
          <td>{this.state.products[product].price}</td>
          <td>
            {Object.keys(this.state.productTypes).length > 0 ? this.state.productTypes[id - 1].typeName : ""}
          </td>
          <td><Link to={"/admin/products/" + this.state.products[product].productID}><button className="btn btn-warning">Sửa</button></Link></td>
          <td><button onClick={() => { this.deleteProduct(this.state.products[product]) }} className="btn btn-danger">Xóa</button></td>
        </tr>
      );
    }
    return table;
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
            <Link to="/admin/products/add"><button className="btn btn-success">Thêm sản phẩm</button></Link>
            <table className="table table-striped" style={tableStyle}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên sản phẩm</th>
                  <th>Mô tả</th>
                  <th>Giá</th>
                  <th>Nhóm</th>
                  <th>Sửa</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {this.renderProduct()}
              </tbody>
            </table>
          </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  products: state.products.products,
  productTypes: state.productTypes.productTypes
});

const mapDispatchToProps = {
  loadAllProducts: productsActions.loadAllProducts,
  deleteProductToStore: productsActions.deleteProductToStore,
  loadAllProductTypes: productTypesActions.loadAllProductTypes
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);