import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthorizationService } from '../services/AuthorizationService.ts';
import { PagePaths } from '../utils/utils.ts';

type ComponentProps = {
  children: React.ReactNode;
};

function PrivateRouteForAuthUser({ children }: ComponentProps) {
  if (AuthorizationService.getCustomerInfo().token) {
    return <Navigate to={PagePaths.Main} />;
  }
  return children;
}

export default PrivateRouteForAuthUser;
