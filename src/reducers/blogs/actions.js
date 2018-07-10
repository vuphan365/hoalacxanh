import * as adminFetch from '../../utils/adminFetch';
import { BACKEND_URL } from '../../config/constants';
import { types } from "./constants";
import { storage } from '../../firebase';

function loadAllBlogs() {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/blog/detail`;
      adminFetch.get(url).then(res => {
        res.json().then(json => {
          console.log(json);
          if (json.length > 0) {
            dispatch(actions.setBlogs(json));
            resolve(true);
          }else reject();
        }).catch(() => reject());
      });
    });
  }
}

function loadBlog(blogID) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/blog/detail/${blogID}`;
      adminFetch.get(url).then(res => {
        res.json().then(json => {
          if (json.length > 0) {
            dispatch(actions.setBlog(json));
            resolve(true);
          }else reject();
        }).catch(() => reject());
      })
    });
  }
}

function addBlogToStore(blog) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/blog/add/`;
      const { name, image, content } = blog;
      const body = JSON.stringify({ name, image, content })
      adminFetch.post(url, body).then(res => {
        res.json().then(json => {
          console.log(json);
          if (json.rowsAffected.length > 0) {
            let blogID = json.recordset[0].blogID;
            console.log(blogID);
            blog.blogID = blogID;
            dispatch(actions.addBlog(blog));
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

function editBlogToStore(blog) {
  return dispatch => {
    console.log('edit');
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/blog/edit/${blog.blogID}`;
      const { name, image, content } = blog;
      const body = JSON.stringify({ name, image, content })
      adminFetch.post(url, body).then(res => {
        res.json().then(json => {
          console.log(json)
          if (json.rowsAffected.length > 0) {
            console.log(json.rowsAffected[0]);
            dispatch(actions.updateBlog(blog));
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
function deleteBlogToStore(blog){
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/blog/delete/${blog.blogID}`;
      const { blogID } = blog;
      const body = JSON.stringify({ blogID});
      adminFetch.post(url, body).then(res => {
        res.json().then(json => {
          console.log(json);
          if (json.rowsAffected.length > 0) {
            console.log(json.rowsAffected[0]);
            dispatch(actions.deleteBlog(blog));
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
  setBlogs: (blogs, content) => ({
    type: types.SET_BLOGS,
    payload: { blogs, content }
  }),
  setBlog: (blog, content) => ({
    type: types.SET_BLOG,
    payload: { blog, content }
  }),
  addBlog: (blog, content) => ({
    type: types.ADD_BLOG,
    payload: { blog, content }
  }),
  updateBlog: (blog, content) => ({
    type: types.UPDATE_BLOG,
    payload: { blog, content }
  }),
  deleteBlog: (blog, content) => ({
    type: types.DELETE_BLOG,
    payload: { blog, content }
  }),
  loadAllBlogs,
  loadBlog,
  addBlogToStore,
  editBlogToStore,
  uploadImage,
  deleteBlogToStore
};