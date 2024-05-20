import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthorizationService } from '../services/AuthorizationService';
import { PagePaths } from '../utils/utils';

type ComponentProps = {
  children: React.ReactNode;
};

function PrivateRoute({ children }: ComponentProps) {
  if (AuthorizationService.getCustomerLogin().token) {
    return <Navigate to={PagePaths.Main} />;
  }
  return children;
}

export default PrivateRoute;
