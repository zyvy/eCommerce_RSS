/* eslint-disable @typescript-eslint/naming-convention */

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

type AnswerAccessToket = {
  error: boolean;
  accessToken: string;
  errorDescription: string;
};

type AuthData = {
  email: string;
  password: string;
};

const KEY_CUSTOMER_TOKEN = 'customerToken';
const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com';
const PROJECT_KEY = 'rs-ecommerce-5348424';
const CLIENT_ID = '7EyqlqolfuhMn_2EQWURRqdM';
const CLIENT_SECRET = 'QE6vCqcgW43BjLE9IYOJpbjfFdLrnFyu';

function authenticateUser() {
  const token = `${CLIENT_ID}:${CLIENT_SECRET}`;
  const hash = btoa(token);
  return `Basic ${hash}`;
}

export class AuthorizationService {
  static async getAccessTokenByPassword({ email, password }: AuthData): Promise<AnswerAccessToket> {
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
      response = await fetch(`${AUTH_URL}/oauth/${PROJECT_KEY}/customers/token?${params}`, requestOptions);
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

  static saveCustomerToken(token: string) {
    localStorage.setItem(KEY_CUSTOMER_TOKEN, token);
  }

  static removeCustomerToken() {
    localStorage.removeItem(KEY_CUSTOMER_TOKEN);
  }

  static getCustomerToken() {
    return localStorage.getItem(KEY_CUSTOMER_TOKEN);
  }
}
