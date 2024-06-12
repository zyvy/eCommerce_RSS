/* eslint-disable @typescript-eslint/naming-convention */
import { v4 as uuidv4 } from 'uuid';

export enum PagePaths {
  Main = '/',
  Catalog = '/catalog',
  Login = '/login',
  Register = '/registration',
  NotFound = '*',
  Profile = '/profile',
  Cart = '/cart',
  About ='/about-us'
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

export function addKeyToArray<T extends { key: string }>(arr: T[]) {
  arr.forEach((el) => {
    if (!el.key) {
      el.key = uuidv4();
    }
  });
}

export function getSortingString(sortOption: string) {
  let sortParameter: string = '';
  switch (sortOption) {
    case 'price-asc':
      sortParameter = 'price asc';
      break;
    case 'price-desc':
      sortParameter = 'price desc';
      break;
    case 'name-asc':
      sortParameter = 'name.en-US asc';
      break;
    case 'name-desc':
      sortParameter = 'name.en-US desc';
      break;
    default:
      sortParameter = 'name.en-US asc';
      break;
  }
  return sortParameter;
}
