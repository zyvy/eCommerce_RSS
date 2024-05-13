/* eslint-disable @typescript-eslint/naming-convention */

import { Customer, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './ctpClient.ts';

/* type Token = {
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
}; */

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

/* interface InvalidCredentials {
  code: number;
  message: string;
} */

const KEY_CUSTOMER = 'customer';

export class AuthorizationService {
  static async login({ email, password }: AuthData): Promise<LoginResponse> {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${import.meta.env.VITE_PROJECT_KEY}`,
    });

    try {
      const {
        body: { customer },
      } = await apiRoot
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

  static async getCustomerToken(customerId: string, ttlMinutes = 60) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${import.meta.env.VITE_PROJECT_KEY}`,
    });

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
      console.log(error);
      return null;
    }
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
