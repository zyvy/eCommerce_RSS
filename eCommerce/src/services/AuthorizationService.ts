/* eslint-disable @typescript-eslint/naming-convention */
import { Customer, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './ctpClient.ts';

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

type CustomerLogin = {
  id: string;
  token: string;
};

const KEY_CUSTOMER = 'customer';

function authenticateUser() {
  const token = `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`;
  const hash = btoa(token);
  return `Basic ${hash}`;
}

export class AuthorizationService {
  static async login({ email, password }: AuthData): Promise<LoginResponse> {
    const apiRoot = AuthorizationService.getApiRoot();

    try {
      const {
        body: { customer },
      } = await apiRoot
        .me()
        .login()
        .post({
          body: {
            email,
            password,
          },
        })
        .execute();

      return {
        error: false,
        customer,
        errorDescription: '',
      };
    } catch (error) {
      return {
        error: true,
        customer: null,
        errorDescription: error.message,
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
        `https://auth.${import.meta.env.VITE_REGION}.commercetools.com/oauth/${import.meta.env.VITE_PROJECT_KEY}/customers/token?${params}`,
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
      console.log('token', data);
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
      console.log(body);
      return body;
    } catch (error) {
      return null;
    }
  }

  static getApiRoot() {
    return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${import.meta.env.VITE_PROJECT_KEY}`,
    });
  }

  static removeCustomerLogin() {
    localStorage.removeItem(KEY_CUSTOMER);
  }

  static updateCustomerLogin(key: keyof CustomerLogin, value: string) {
    const customer = AuthorizationService.getCustomerLogin();
    customer[key] = value;
    localStorage.setItem(KEY_CUSTOMER, JSON.stringify(customer));
  }

  static getCustomerLogin() {
    const customer = localStorage.getItem(KEY_CUSTOMER);
    if (customer) {
      return <CustomerLogin>JSON.parse(customer);
    }
    return {
      id: '',
      token: '',
    };
  }
}
