import React from 'react';
import {Route, IndexRoute} from 'react-router';
import { AdminLogin, AdminProducts, AdminRedirect, UpdateProduct,
          AdminOrders, AdminBlogs, UpdateBlog, Updating } from './routes';
import index from '../pages/index';
import Admin from '../pages/dashboard/Admin';

export default (
    <Route>
        <Route path="/">
          <IndexRoute component={index} /> 
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