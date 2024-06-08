import fetch from 'node-fetch';
import {
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { env } from '../utils/utils.ts';

const projectKey = env.VITE_PROJECT_KEY;
const scopes = [env.VITE_SCOPE];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${env.VITE_REGION}.commercetools.com`,
  projectKey,
  credentials: {
    clientId: env.VITE_CLIENT_ID,
    clientSecret: env.VITE_CLIENT_SECRET,
  },
  scopes,
  fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${env.VITE_REGION}.commercetools.com`,
  fetch,
};

export const authMiddlewareForPasswordFlow = (user: UserAuthOptions): PasswordAuthMiddlewareOptions => ({
  host: `https://auth.${env.VITE_REGION}.commercetools.com`,
  projectKey,
  credentials: {
    clientId: env.VITE_CLIENT_ID,
    clientSecret: env.VITE_CLIENT_SECRET,
    user,
  },
  scopes,
  fetch,
});

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
