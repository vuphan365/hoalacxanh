import React, { Component } from 'react'
import TextEditor from '../../../components/TextEditor';

class BlogPage extends Component {
  render() {
    return (
      <div>
          <h3>Quản lý bài viết</h3>
          <div className="form-group">
            <label htmlFor="name">Tên bài viết </label>
            <input disabled={this.props.loading} type="text" className="form-control" name="name"
              onChange={(event) => { this.props.updateName(event) }} value={this.props.blog.name} 
              style={{width: '70%'}}/>
          </div>
          <div className="form-group">
            <label htmlFor="image">Chọn tệp
            <input disabled={this.props.loading} type="file" className="form-control" name="image"
             onChange={(event) => { this.props.updateImage(event) }} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="textEditor">Mô tả</label>
            {!this.props.loading && <TextEditor name="textEditor" content={this.props.blog.content} 
            updateContent={this.props.updateContent} />}
            
          </div>
          <button style={{width: '10%'}} disabled={this.props.loading} type="button" className="btn btn-success" 
          onClick={(event) => {this.props.saveBlog(event)}}>
            {this.props.loading ? "Đang lưu" : "Lưu"}
          </button>
      </div>
    )
  }
}


export default BlogPage;

