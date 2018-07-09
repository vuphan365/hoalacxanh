import React from 'react';
import {Route, IndexRoute} from 'react-router';
import { Redirect} from "react-router-dom";
import { AdminLogin, AdminProducts, ProductPage, AdminRedirect, UpdateProduct } from './routes';
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
        </Route>
      
    </Route>
  );