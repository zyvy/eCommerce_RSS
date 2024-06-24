/* eslint-disable @typescript-eslint/naming-convention */
import { Customer, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './ctpClient.ts';
import { env } from '../utils/utils.ts';
import { CartService } from './CartService.ts';

type Token = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type BadResponse = {
  error: string;
  error_description: string;
  message: string;
  statusCode: number;
};

type AccessToketResponse = {
  error: boolean;
  accessToken: string;
  errorDescription: string;
};

type LoginResponse = {
  error: boolean;
  customer: Customer | null;
  errorDescription: string;
};

type AuthData = {
  email: string;
  password: string;
};

type CustomerInfo = {
  id: string;
  token: string;
  version: string;
};

interface SigninParams {
  email: string;
  password: string;
  updateProductData?: boolean;
  anonymousCartId?: string;
  anonymousCartSignInMode?: string;
}

const KEY_CUSTOMER = 'customer';

function authenticateUser() {
  const token = `${env.VITE_CLIENT_ID}:${env.VITE_CLIENT_SECRET}`;
  const hash = btoa(token);
  return `Basic ${hash}`;
}

export class AuthorizationService {
  static async login({ email, password }: AuthData): Promise<LoginResponse> {
    const apiRoot = AuthorizationService.getApiRoot();
    const anonimCartId = CartService.getCartInfo()?.id;
    const requestBody: SigninParams = {
      email,
      password,
    };
    if (anonimCartId) {
      requestBody.updateProductData = true;
      requestBody.anonymousCartId = anonimCartId;
      requestBody.anonymousCartSignInMode = 'MergeWithExistingCustomerCart';
    }

    try {
      const {
        body: { customer },
      } = await apiRoot
        .me()
        .login()
        .post({
          body: requestBody,
        })
        .execute();

      return {
        error: false,
        customer,
        errorDescription: '',
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: true,
          customer: null,
          errorDescription: error.message,
        };
      }
      return {
        error: true,
        customer: null,
        errorDescription: '',
      };
    }
  }

  static async getCustomerTokenById(customerId: string, ttlMinutes = 3600): Promise<string | null> {
    const apiRoot = AuthorizationService.getApiRoot();
    try {
      const {
        body: { value },
      } = await apiRoot
        .customers()
        .emailToken()
        .post({ body: { id: customerId, ttlMinutes } })
        .execute();

      return value;
    } catch (error) {
      return null;
    }
  }

  static async getAccessToken({ email, password }: AuthData): Promise<AccessToketResponse> {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', authenticateUser());

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: '',
    };

    const params = new URLSearchParams({
      grant_type: 'password',
      username: email,
      password,
    }).toString();

    let response = null;
    try {
      response = await fetch(
        `https://auth.${env.VITE_REGION}.commercetools.com/oauth/${env.VITE_PROJECT_KEY}/customers/token?${params}`,
        requestOptions,
      );
    } catch (error: unknown) {
      const message = typeof error === 'string' ? error : '';
      return {
        error: true,
        accessToken: '',
        errorDescription: message,
      };
    }
    if (response.status === 200) {
      const data: Token = await response.json();
      return {
        error: false,
        accessToken: data.access_token,
        errorDescription: '',
      };
    }
    const data: BadResponse = await response.json();
    return {
      error: true,
      accessToken: '',
      errorDescription: data.error_description,
    };
  }

  static async getAnonymousToken(): Promise<AccessToketResponse> {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', authenticateUser());

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: '',
    };

    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      scope: `view_published_products:${env.VITE_PROJECT_KEY} manage_my_orders:${env.VITE_PROJECT_KEY} manage_my_profile:${env.VITE_PROJECT_KEY}`,
    }).toString();

    let response = null;
    try {
      response = await fetch(
        `https://auth.${env.VITE_REGION}.commercetools.com/oauth/${env.VITE_PROJECT_KEY}/anonymous/token?${params}`,
        requestOptions,
      );
    } catch (error: unknown) {
      const message = typeof error === 'string' ? error : '';
      return {
        error: true,
        accessToken: '',
        errorDescription: message,
      };
    }
    if (response.status === 200) {
      const data: Token = await response.json();
      localStorage.setItem('AnonymousToken', JSON.stringify(data.access_token));
      return {
        error: false,
        accessToken: data.access_token,
        errorDescription: '',
      };
    }
    const data: BadResponse = await response.json();
    return {
      error: true,
      accessToken: '',
      errorDescription: data.error_description,
    };
  }

  static async getCustomerPasswordToken(email: string) {
    const apiRoot = AuthorizationService.getApiRoot();
    try {
      const body = await apiRoot.customers().passwordToken().post({ body: { email } }).execute();
      return body;
    } catch (error) {
      return null;
    }
  }

  static getApiRoot() {
    return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${env.VITE_PROJECT_KEY}`,
    });
  }

  static removeCustomerInfo() {
    localStorage.removeItem(KEY_CUSTOMER);
  }

  static updateCustomerInfo(key: keyof CustomerInfo, value: string) {
    const customer = AuthorizationService.getCustomerInfo();
    customer[key] = value;
    localStorage.setItem(KEY_CUSTOMER, JSON.stringify(customer));
  }

  static getCustomerInfo() {
    const customer = localStorage.getItem(KEY_CUSTOMER);
    if (customer) {
      return <CustomerInfo>JSON.parse(customer);
    }
    return {
      id: '',
      token: '',
      version: '0',
    };
  }

  static saveVersion(version: number) {
    AuthorizationService.updateCustomerInfo('version', String(version));
  }
}
