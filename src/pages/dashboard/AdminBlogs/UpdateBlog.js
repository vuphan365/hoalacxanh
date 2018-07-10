import React, { Component } from 'react'
import { connect } from 'react-redux';
import {routeHistory} from '../../../store';
import {actions as blogsActions} from '../../../reducers/blogs/actions';
import toastr from 'toastr';
import BlogPage from './BlogPage';
class UpdateBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog : {blogID : '', name : '', content : '', image: ''},
      changeImage : false,
      loading : false
    }
  }
  componentWillMount() {
    if (typeof this.props.blogs[0] === "undefined") {
      this.setState({loading : true});
      console.log("load blog");
      this.props.loadAllBlogs().then(() => {
        console.log("ok")
        this.setState({loading : false});
      }).catch((err) => {
        this.setState({loading : false});
        toastr.error('Lỗi tải dữ liệu, vui lòng thử lại');
      })
    }
    if (this.props.blogId != null) {
      this.setState({loading : true});
        this.props.loadBlog(this.props.blogId).then((result) => {
          console.log(this.props.blog);
          this.setState({blog : this.props.blog, loading : false});
        }).catch(err => {
          this.setState({loading : false});
          toastr.error('Đường dẫn này không tồn tại');
          routeHistory.push("/admin/blogs");
        })
    }
  }
  updateName = (event) => {
    let blog = this.state.blog
    blog.name = event.target.value;
    this.setState({ blog: blog });
  }
  updateContent = (event) => {
    let blog = this.state.blog
    blog.content = event;
    this.setState({ blog: blog });
  }
  updateImage = (event) => {
    let blog = this.state.blog
    blog.image = event.target.files[0];
    this.setState({ blog: blog, changeImage : true });
  }
  saveBlog = (event) => {
    console.log(this.state.blog);
    event.preventDefault();
    let blog = this.state.blog;
    if (!blog.name || !blog.content) {
      toastr.error('Vui lòng điền đầy đủ thông tin');
    } else {
      this.setState({ loading: true });
      if (this.state.changeImage) {
        this.props.uploadImage(blog.image).then((url) => {
          blog.image = url;
          if (blog.blogID === "") {
            this.props.addBlogToStore(blog).then(() => {
              this.setState({loading : false});
              toastr.success("Thêm bài viết thành công");
              routeHistory.push('/admin/blogs')
            }).catch(() => {
              toastr.error("Thêm bài viết không thành công");
              this.setState({loading : false});
            })
          } else {
            this.props.editBlogToStore(blog).then(() => {
              this.setState({loading : false});
              toastr.success("Sửa bài viết thành công");
              routeHistory.push('/admin/blogs')
            }).catch(() => {
              toastr.error("Sửa bài viết không thành công");
              this.setState({loading : false});
            })
          }
        }).catch(err => {
          this.setState({ loading: false });
        });
      } else {
        if (blog.blogID === "") {
          this.props.addBlogToStore(blog).then(() => {
            this.setState({loading : false});
            toastr.success("Thêm bài viết thành công");
            routeHistory.push('/admin/blogs')
          }).catch(() => {
            toastr.error("Thêm bài viết không thành công");
            this.setState({loading : false});
          })
        } else {
          this.props.editBlogToStore(blog).then(() => {
            this.setState({loading : false});
            toastr.success("Sửa bài viết thành công");
            routeHistory.push('/admin/blogs')
          }).catch(() => {
            toastr.error("Sửa bài viết không thành công");
            this.setState({loading : false});
          })
        }
      }
    }

  }
  render() {
    return (
      <div>
        <BlogPage loading={this.state.loading} blog={this.state.blog} updateName={this.updateName} updateContent={this.updateContent}
          updateImage={this.updateImage} saveBlog={this.saveBlog} />
      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  const blogId = ownProps.params.id;
  return {
    blogs: state.blogs.blogs,
    blogId : blogId,
    blog: state.blogs.blog
  }
}
const mapDispatchToProps = {
  loadAllBlogs: blogsActions.loadAllBlogs,
  loadBlog: blogsActions.loadBlog,
  addBlogToStore: blogsActions.addBlogToStore,
  editBlogToStore: blogsActions.editBlogToStore,
  uploadImage: blogsActions.uploadImage
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateBlog);