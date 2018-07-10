import { types } from "./constants";

// declare initial state of state
const initialState = {
  blogs : [],
  blog : null
};

const blogs = (state = initialState, action) => {
  // handle action type
  switch (action.type) {
    case types.SET_BLOGS:
      // set status from action and return it
      return { ...state, blogs: Object.assign({}, action.payload.blogs) };
    case types.ADD_BLOG:
      // set status from action and return it
      state.blogs[Object.keys(state.blogs).length] = action.payload.blog;
      return { ...state, blogs: state.blogs };
    case types.UPDATE_BLOG:
      // set status from action and return it
      for (let blog in state.blogs) {
        if (state.blogs[blog].blogID === action.payload.blog.blogID) {
          state.blogs[blog] = action.payload.blog;
          break;
        }
      }
      return { ...state, blogs: state.blog }; 
    case types.DELETE_BLOG:
      // set status from action and return it
      let newBlogs = [];
      for (let blog in state.blogs) {
        let isFind = false;
        if (state.blogs[blog].blogID === action.payload.blog.blogID) {
          isFind = true;
        }
        if (!isFind) newBlogs[Object.keys(newBlogs).length] = state.blogs[blog]; 
      }
      state.blogs = newBlogs;
      return { ...state, blogs: state.blogs} ;               
    case types.SET_BLOG:
      // set status from action and return it
      return { ...state, blog: Object.assign({}, action.payload.blog)[0] };   
    default:
      // return state
      return { ...state };
  }
};

export default blogs;

