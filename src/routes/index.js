import React from 'react';
import {Route, IndexRoute} from 'react-router';
import { AdminLogin, AdminProducts, AdminRedirect, UpdateProduct,AdminOrders, AdminBlogs, 
          UpdateBlog, Updating, HomePage, Categories, Blogs, BlogPage, ProductInfo,
          UserInformation, CartPage} from './routes';
import Admin from '../pages/dashboard/Admin';
import UserWebsite from '../pages/UserWebsite/UserWebsite';
export default (
    <Route>
        <Route component={UserWebsite}>
          <Route path="/" component={HomePage} />
          <Route path="/categories" component={Categories} />
          <Route path="/categories/:id" component={Categories} />
          <Route path="/blogs" component={Blogs} />
          <Route path="/blog/:id" component={BlogPage} />
          <Route path="/product/:id" component={ProductInfo} />
          <Route path="/me/:info" component={UserInformation} />
          <Route path="/cart" component={CartPage} />
        </Route>
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={AdminRedirect} />

        <Route component={Admin}>
          <Route exact path="/admin/products" component={AdminProducts} />
          <Route path="/admin/products/add" component={UpdateProduct } />
          <Route path="/admin/products/:id" component={UpdateProduct } />
          <Route exact path="/admin/orders" component={AdminOrders} />
          <Route exact path="/admin/blogs" component={AdminBlogs} />
          <Route path="/admin/blogs/add" component={UpdateBlog} />
          <Route path="/admin/blogs/:id" component={UpdateBlog } />
          <Route path="/admin/add" component={Updating } />
          <Route path="/admin/password" component={Updating } />
        </Route>
      
    </Route>
  );