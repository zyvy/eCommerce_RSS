/* eslint-disable @typescript-eslint/naming-convention */
import { BaseAddress, Customer, CustomerDraft, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './ctpClient.ts';


type ReistrationResponse = {
  error: boolean;
  customer: Customer | null;
  errorDescription: string;
};

// type RegData = {
//     // key?: string;
//     email: string;
//     password: string;
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string;
//     addresses?: BaseAddress[];
//     defaultShippingAddress?: number;
//     shippingAddresses?: number[];
//     defaultBillingAddress?: number;
//     billingAddresses?: number[];
// };


// const KEY_CUSTOMER = 'customer';

// function authenticateUser() {
//   const token = `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`;
//   const hash = btoa(token);
//   return `Basic ${hash}`;
// }
// email, password, firstName, lastName

export class RegistrationService {
  static async registration(customerDraft: CustomerDraft): Promise<ReistrationResponse> {
    const apiRoot = RegistrationService.getApiRoot();

    try {
      const {
        body: { customer },
      } = await apiRoot
        .customers()
        .post({
            body: customerDraft
        })
        .execute();

      return {
        error: false,
        customer,
        errorDescription: '',
      };
    } catch (error) {
      console.log('error', error);
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

  static getApiRoot() {
    return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${import.meta.env.VITE_PROJECT_KEY}`,
    });
  }

}