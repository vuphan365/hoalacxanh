import React, { Component } from 'react'
import TextEditor from '../../../components/TextEditor';
class ProductPage extends Component {
  renderProductTypes = () => {
    let options = []
    for (var productType in this.props.productTypes) {
      options.push(
        <option key={this.props.productTypes[productType].typeID}
          value={this.props.productTypes[productType].typeID}>
          {this.props.productTypes[productType].typeName}</option>
      );
    }
    return options;
  }
  render() {
    return (
      <div>
          <h3>Quản lý sản phẩm</h3>
          <div className="form-group">
            <label htmlFor="name">Tên sản phẩm </label>
            <input disabled={this.props.loading} type="text" className="form-control" name="name"
              onChange={(event) => { this.props.updateName(event) }} value={this.props.product.name} 
              style={{width: '50%'}}/>
          </div>
          <div className="form-group">
            <label htmlFor="price">Giá </label>
            <input disabled={this.props.loading} type="number" className="form-control" name="price" value={this.props.product.price}
              onChange={(event) => { this.props.updatePrice(event) }} style={{width: '50%'}} />
          </div>
          <div className="form-group">
            <label htmlFor="productTypes">Chọn nhóm sản phẩm</label>
            <select disabled={this.props.loading} className="form-control" name="exampleFormControlSelect1"
              onChange={(event) => { this.props.updateTypeID(event) }} value={this.props.product.typeID} style={{width: '50%'}}>
              {this.renderProductTypes()}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">Chọn tệp
            <input disabled={this.props.loading} type="file" className="form-control" name="image" onChange={(event) => { this.props.updateImage(event) }} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="textEditor">Mô tả</label>
            {!this.props.loading && <TextEditor name="textEditor" content={this.props.product.content} 
            updateContent={this.props.updateContent} />}
            
          </div>
          <button style={{width: '10%'}} disabled={this.props.loading} type="button" className="btn btn-success" onClick={(event) => {this.props.saveProduct(event)}}>
            {this.props.loading ? "Đang lưu" : "Lưu"}
          </button>
      </div>
    )
  }
}


export default ProductPage;

