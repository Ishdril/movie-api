import React from 'react';
import { Route, Router } from 'react-router-dom';

const withRoute = (ui, { history, path = '/' }) => {
  if (history.location.pathname.split('/').length !== path.split('/').length)
    throw new Error('history and path must match');
  return (
    <Router history={history}>
      <Route path={path}>{ui}</Route>
    </Router>
  );
};

export default withRoute;
