import { Customer, CustomerDraft, CustomerUpdate, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './ctpClient.ts';
import { env } from '../utils/utils.ts';
import { AuthorizationService } from './AuthorizationService.ts';

type RegistrationResponse = {
  error: boolean;
  customer: Customer | null;
  errorDescription: string;
};

type CustomerResponse = {
  error: boolean;
  customer: Customer | null;
  errorDescription: string;
};

export class RegistrationService {
  static async registration(customerDraft: CustomerDraft): Promise<RegistrationResponse> {
    const apiRoot = RegistrationService.getApiRoot();

    try {
      const {
        body: { customer },
      } = await apiRoot
        .customers()
        .post({
          body: customerDraft,
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

  static getApiRoot() {
    return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${env.VITE_PROJECT_KEY}`,
    });
  }

  static async getCustomer(): Promise<CustomerResponse> {
    const apiRoot = RegistrationService.getApiRoot();
    try {
      const { body } = await apiRoot
        .customers()
        .withId({ ID: AuthorizationService.getCustomerLogin().id })
        .get()
        .execute();
      return {
        error: false,
        customer: body,
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
    }
    return {
      error: true,
      customer: null,
      errorDescription: '',
    };
  }

  static async updateCustomer(customer: CustomerUpdate) {
    const apiRoot = RegistrationService.getApiRoot();
    try {
      const data = await apiRoot
        .customers()
        .withId({ ID: AuthorizationService.getCustomerLogin().id })
        .post({
          body: customer,
        })
        .execute();
      console.log(data);
    } catch (e: unknown) {
      console.log(e);
    }
  }
}
