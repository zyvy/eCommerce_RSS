/* eslint-disable @typescript-eslint/naming-convention */

export enum PagePaths {
  Main = '/',
  Login = '/login',
  Register = '/registration',
  NotFound = '/404',
}

export type SizeOfInput = 'small' | 'medium';

export type AddressType = 'billing' | 'shipping';

interface Env {
  readonly VITE_PROJECT_KEY: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_CLIENT_SECRET: string;
  readonly VITE_SCOPE: string;
  readonly VITE_REGION: string;
}

export const env: Env = {
  VITE_PROJECT_KEY: 'rs-ecommerce-5348424',
  VITE_CLIENT_ID: '7EyqlqolfuhMn_2EQWURRqdM',
  VITE_CLIENT_SECRET: 'QE6vCqcgW43BjLE9IYOJpbjfFdLrnFyu',
  VITE_SCOPE: 'manage_project:rs-ecommerce-5348424',
  VITE_REGION: 'europe-west1.gcp',
};