import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Routes from './routes';
import DevTools from './devTools';


const Root = ({ store, history }) => {

  const renderDevelopmentProvider = () => {
    return (
      <Provider store={store}>
        <div>
          <Routes history={history} />
          <DevTools />
        </div>
      </Provider>
    );
  };

  const renderProductionProvider = () => {
    return (
      <Provider store={store}>
        <Routes history={history} />
      </Provider>
    );
  };

  const renderProvider = () => {
    if (process.env.NODE_ENV !== 'production') {
      return renderDevelopmentProvider();
    }
    return renderProductionProvider();
  };

  return renderProvider();

};


Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};


export default Root;
