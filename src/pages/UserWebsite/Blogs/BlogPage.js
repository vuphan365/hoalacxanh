import React, { Component } from 'react'
import { connect } from 'react-redux';
import {actions as blogsActions} from '../../../reducers/blogs/actions';
import Footer from '../../../components/layouts/Footer';
import {routeHistory} from '../../../store';
class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog : {blogID : '', name : '', content : '', image: ''}
    }
  }
  componentWillMount() {
    if (this.props.blogId != null) {
      this.setState({loading : true});
        this.props.loadBlog(this.props.blogId).then((result) => {
          console.log(this.props.blog);
          this.setState({blog : this.props.blog, loading : false});
          console.log(this.state.blog);
        }).catch(err => {
          this.setState({loading : false});
          routeHistory.push("/blogs");
        })
    }
  }
  render() {
    return (
      <div>
        <div className="blogs-page">
          <div className="header-name"><h3>BLOG</h3></div>
          <div className="blog-info">
            <div className="blog-name"><h3><strong>{this.state.blog.name}</strong></h3><hr /></div>
            <div className="blog-image">
              <img src={this.state.blog.image} style={{ width: '60%', height: 'auto' }} />
            </div>
            <div className="blog-description"  dangerouslySetInnerHTML={{ __html: this.state.blog.content }}></div>
            <hr/>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const blogId = ownProps.params.id;
  return {
    blogId : blogId,
    blog: state.blogs.blog
  }
}

const mapDispatchToProps = {
  loadBlog: blogsActions.loadBlog
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);