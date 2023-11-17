import React from 'react';
import { Navigate, Route, RouteProps, useLocation } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  isAuth: boolean;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuth,
  redirectTo,
  ...rest
}) => {
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={`${redirectTo}?from=${location.pathname}`} />;
  }

  return <Route {...rest} />;
};

export default ProtectedRoute;
