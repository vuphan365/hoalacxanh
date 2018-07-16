import React, { Component } from 'react'
import { connect } from 'react-redux';
import hoalacxanhLogo from '../../assets/images/hoalacxanhLogo.jpg';
import { actions as productsActions } from '../../reducers/products/actions';
import { actions as blogsActions } from '../../reducers/blogs/actions';
import SimpleSlider from '../../components/SimpleSlider';
import { actions as productTypesActions } from '../../reducers/productTypes/actions';
import toastr from 'toastr';
import { Link } from 'react-router';
import Footer from '../../components/layouts/Footer';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productTypes: [],
      blogs: [],
      products: [],
      productID : null
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
    if (typeof this.props.blogs[0] === "undefined") {
      this.setState({ loading: true });
      console.log("load blog");
      this.props.loadAllBlogs().then(() => {
        console.log("ok")
        this.setState({ blogs: this.props.blogs, loading: false });
        console.log(this.state.blogs);
      }).catch((err) => {
        console.log(err);
        this.setState({ loading: false });
        console.log("error");
        toastr.error('Lỗi tải dữ liệu, vui lòng thử lại');
      })
    } else {
      this.setState({ blogs: this.props.blogs });
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
              <Link to = {"/product/" + id}>
                <img src={this.state.products[type].image} style={{ width: '80%', height: 'auto' }} />
              </Link>  
            </div>
          </div>
        );
      }
    }
    return bestProducts;
  }
  renderProductTypes = (from, to) => {
    let types = []
    if (Object.keys(this.state.productTypes).length > 0) {
      for (var type = from; type < to; type++) {
        let id = this.state.productTypes[type].typeID;
        types.push(
          <div key={id} className="col-md-3 product">
            <div className="product-name"><h3>{this.state.productTypes[type].typeName}</h3></div>
            <Link to={"/categories/" + id}>
              <div className="product-image">
                <img src={this.state.productTypes[type].image} style={{ width: '80%' }} />
                <div className="text-view transition">
                  <h3><strong>View Details</strong></h3>
                </div>
              </div>
            </Link>
            <div className="product-content"><strong>{this.state.productTypes[type].content.substring(0, 80)}..
            <Link to={"/categories/" + id}> Xem thêm </Link></strong>
            </div>
          </div>
        );
      }
    }
    return types;
  }
  renderBlogs = () => {
    let blogs = [];
    if (Object.keys(this.state.blogs).length > 0) {
      for (var blog = 0; blog < Object.keys(this.state.blogs).length; blog++) {
        let id = this.state.blogs[blog].blogID;
        let strong = this.state.blogs[blog].content.indexOf("</strong></p>")
        let content = this.state.blogs[blog].content.substring(0, strong + 13);
        blogs.push(
          <div key={id} className="blog">
            <div className="blog-image">
              <img src={this.state.blogs[blog].image} style={{ width: '80%', height: 'auto' }} />
            </div>
            <div className="blog-content">
              <div className="blog-name"><h3><strong>{this.state.blogs[blog].name}</strong></h3></div>
              <div className="blog-description" dangerouslySetInnerHTML={{ __html: content }}></div>
              <Link to={"/blog/" + id}><span className="glyphicon glyphicon-hand-right" aria-hidden="true"></span> ĐỌC THÊM </Link>
            </div>
          </div>
        );
      }
    }
    return blogs;
  }
  render() {
    return (
      <div className="homepage-container">
        <div className="logo-panel"><img src={hoalacxanhLogo} /></div>
        <div className="homepage-content">
          <div className="products-content">
            <hr />
            <Link style={{ textDecoration: 'none', color: '#000000' }}
              to="/categories"><h3><strong>DANH MỤC SẢN PHẨM</strong></h3></Link>
            <div className="row product-list">
              {this.renderProductTypes(0, 3)}
            </div>
            <div className="row product-list">
              {this.renderProductTypes(3, 6)}
            </div>
          </div>
          <div className="best-product-content">
            <hr />
            <h3><strong>SẢN PHẨM NỔI BẬT</strong></h3>
            <SimpleSlider slidesToShow={3} speed={500} items={this.renderBestProduct} />
          </div>
          <div className="blogs-content">
            <hr />
            <Link style={{ textDecoration: 'none', color: '#000000' }}
              to="/blogs"><h3><strong>BLOGS</strong></h3></Link>
            <SimpleSlider slidesToShow={1} speed={1000} items={this.renderBlogs} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  products: state.products.products,
  productTypes: state.productTypes.productTypes,
  blogs: state.blogs.blogs
});

const mapDispatchToProps = {
  loadAllProducts: productsActions.loadAllProducts,
  loadAllProductTypes: productTypesActions.loadAllProductTypes,
  loadAllBlogs: blogsActions.loadAllBlogs
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);