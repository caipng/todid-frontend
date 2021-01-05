import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export function PrivateRoute(props: RouteProps) {
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('user') ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
}
