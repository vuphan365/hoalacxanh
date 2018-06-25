import React from 'react';
import store from './store';
import Routes from './routes/index';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
