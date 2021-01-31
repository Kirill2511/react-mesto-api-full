import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ loggingIn, ...props }) => (
  <Route>
    {
      () => (loggingIn ? <Route {...props} /> : <Redirect to="/signin" />)
    }
  </Route>
);

export default ProtectedRoute;
