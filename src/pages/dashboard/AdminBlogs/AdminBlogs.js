import React, { Component } from 'react'
import { connect } from "react-redux";
import { actions as blogsActions } from '../../../reducers/blogs/actions';
import toastr from 'toastr';
import { Link } from 'react-router';

const tableStyle = {
  marginTop: '2%',
  width : '90%'
}

class AdminBlogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      loading: false
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
  deleteBlog = (blog) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không")) {
      this.setState({ loading: true });
      this.props.deleteBlogToStore(blog).then(() => {
        toastr.success("Xóa sản phẩm thành công");
        this.setState({ loading: false, blogs : this.props.blogs });
      }).catch(() => {
        toastr.error("Xóa sản phẩm thất bại");
        this.setState({ loading: false, blogs : this.props.blogs });
      })
    }
  }
  renderBlog = () => {
    let table = []
    for (var blog in this.state.blogs) {
      table.push(
        <tr key={this.state.blogs[blog].blogID}>
          <td>{this.state.blogs[blog].blogID}</td>
          <td>{this.state.blogs[blog].name.substring(0, 30)}...</td>
          <td>{this.state.blogs[blog].content.substring(0, 60)}...</td>
          <td><Link to={"/admin/blogs/" + this.state.blogs[blog].blogID}><button className="btn btn-warning">Sửa</button></Link></td>
          <td><button onClick={() => { this.deleteBlog(this.state.blogs[blog]) }} className="btn btn-danger">Xóa</button></td>
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
          <Link to="/admin/blogs/add"><button className="btn btn-success">Thêm bài viết</button></Link>
          <table className="table table-striped" style={tableStyle}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên bài viết</th>
                <th>Nội dung</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {this.renderBlog()}
            </tbody>
          </table>
        </div>
        :<div></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  blogs: state.blogs.blogs
});

const mapDispatchToProps = {
  loadAllBlogs: blogsActions.loadAllBlogs,
  deleteBlogToStore: blogsActions.deleteBlogToStore
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminBlogs);