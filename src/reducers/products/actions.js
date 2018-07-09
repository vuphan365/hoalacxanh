import { types } from "./constants";
import * as adminFetch from '../../utils/adminFetch';
import { BACKEND_URL } from '../../config/constants';
import { storage } from '../../firebase';
function loadAllProducts() {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/product/detail`;
      adminFetch.get(url).then(res => {
        res.json().then(json => {
          if (json.length > 0) {
            dispatch(actions.setProducts(json));
            resolve(true);
          }else reject();
        }).catch(() => reject());
      });
    });
    
  }
}
function loadProduct(productID) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/product/detail/${productID}`;
      adminFetch.get(url).then(res => {
        res.json().then(json => {
          if (json.length > 0) {
            dispatch(actions.setProduct(json));
            resolve(true);
          }else reject();
        }).catch(() => reject());
      })
    });
    
  }
}
function addProductToStore(product) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/product/add/`;
      const { productID, name, image, price, content, typeID } = product;
      const body = JSON.stringify({ productID, name, image, price, content, typeID })
      adminFetch.post(url, body).then(res => {
        res.json().then(json => {
          console.log(json);
          if (json.rowsAffected.length > 0) {
            let productID = json.recordset[0].productID;
            console.log(productID);
            product.productID = productID;
            dispatch(actions.addProduct(product));
            resolve(true);
          }else reject();
        }).catch(err => {
          console.log(err);
          reject(err);
        });
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    });
    
  }
}
function editProductToStore(product) {
  return dispatch => {
    console.log('edit');
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/product/edit/${product.productID}`;
      const { productID, name, image, price, content, typeID } = product;
      const body = JSON.stringify({ productID, name, image, price, content, typeID })
      adminFetch.post(url, body).then(res => {
        res.json().then(json => {
          console.log(json)
          if (json.rowsAffected.length > 0) {
            console.log(json.rowsAffected[0]);
            dispatch(actions.updateProduct(product));
            console.log('resolve true');
            resolve(true);
          }else reject();
        }).catch(err => {
          console.log(err);
          reject(err);
        });
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    });
    
  }
}

function uploadImage(image) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      var storageRef = storage.ref('images/' + image.name);
      storageRef.put(image).then((snapshot) => {
        console.log(snapshot);
        storageRef.getDownloadURL().then(url => {
          console.log(url);
          resolve(url);
        }).catch((err) =>{
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
}
function deleteProductToStore(product){
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/product/delete/${product.productID}`;
      const { productID } = product;
      const body = JSON.stringify({ productID});
      adminFetch.post(url, body).then(res => {
        res.json().then(json => {
          console.log(json);
          if (json.rowsAffected.length > 0) {
            console.log(json.rowsAffected[0]);
            dispatch(actions.deleteProduct(product));
            resolve(true);
          }else reject();
        }).catch(err => {
          console.log(err);
          reject(err);
        });
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    })
  }
}

export const actions = {
  setProducts: (products, content) => ({
    type: types.SET_PRODUCTS,
    payload: { products, content }
  }),
  setProduct: (product, content) => ({
    type: types.SET_PRODUCT,
    payload: { product, content }
  }),
  addProduct: (product, content) => ({
    type: types.ADD_PRODUCT,
    payload: { product, content }
  }),
  updateProduct: (product, content) => ({
    type: types.UPDATE_PRODUCT,
    payload: { product, content }
  }),
  deleteProduct: (product, content) => ({
    type: types.DELETE_PRODUCT,
    payload: { product, content }
  }),
  loadAllProducts,
  loadProduct,
  uploadImage,
  addProductToStore,
  editProductToStore,
  deleteProductToStore
};