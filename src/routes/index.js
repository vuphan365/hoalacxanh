import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { history } from '../store';
import { AdminLogin } from './routes';
import index from '../pages/index';

const Routes = () => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={AdminLogin} />
        {/* <Route exact path ="/" component={index} /> */}
      </div>
    </ConnectedRouter>
  );
}
export default Routes;