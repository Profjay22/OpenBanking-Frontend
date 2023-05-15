import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      element={
        authenticated ? <Component {...rest} /> : <Navigate to="/login" replace />
      }
    />
  );
}
