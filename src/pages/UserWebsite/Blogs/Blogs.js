import React, { Component } from 'react'
import { connect } from 'react-redux';
import toastr from 'toastr';
import { Link } from 'react-router';
import Footer from '../../../components/layouts/Footer';
import { actions as blogsActions } from '../../../reducers/blogs/actions';
class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: []
    }
  }
  componentWillMount() {
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
  renderBlogs = () => {
    let blogs = [];
    if (Object.keys(this.state.blogs).length > 0) {
      let length = Object.keys(this.state.blogs).length;
      for (var blog = 0; blog < length; blog++) {
        let id = this.state.blogs[length - 1 - blog].blogID;
        let strong = this.state.blogs[length - 1 - blog].content.indexOf("</strong></p>")
        let content = this.state.blogs[length - 1 - blog].content.substring(0, strong + 13);
        blogs.push(
          <div key={id} className="blog" >
            <div className="blog-image">
              <img src={this.state.blogs[length - 1 - blog].image} style={{ width: '80%', height: 'auto' }} />
            </div>
            <div className="blog-content">
              <div className="blog-name"><h3><strong>{this.state.blogs[length - 1 - blog].name}</strong></h3></div>
              <div className="blog-description" dangerouslySetInnerHTML={{ __html: content }}></div>
              <Link to={"/blog/" + id}>
              <span className="glyphicon glyphicon-hand-right" aria-hidden="true"></span> ĐỌC THÊM 
              </Link>
            </div>
          </div>
        );
      }
    }
    return blogs;
  }
  render() {
    return (
      <div>
        <div className="blogs-page">
          <div className="header-name"><h3>BLOG</h3></div>
          <div className="blogs-content">
            <div className="blogs-list">
              {this.renderBlogs()}
            </div>
          </div>
        </div>
        <Footer />
      </div>


    )
  }
}
const mapStateToProps = state => ({
  blogs: state.blogs.blogs
});

const mapDispatchToProps = {
  loadAllBlogs: blogsActions.loadAllBlogs
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);