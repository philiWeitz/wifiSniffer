
import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import AppView from '../modules/app/AppView';

const Routes = ({ history }) => {

  return (
    <Router history={history}>
      <Route path="/" component={AppView} />
    </Router>
  );

};

/* eslint-disable */
Routes.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Routes;
