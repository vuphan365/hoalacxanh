import React from 'react';
import store from './store';
import {Router} from 'react-router';
import {routeHistory} from './store'
import routes from './routes/index';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Router onUpdate={() => window.scrollTo(0, 0)} routes={routes} history={routeHistory}/>
    </Provider>
  );
}

export default App;
