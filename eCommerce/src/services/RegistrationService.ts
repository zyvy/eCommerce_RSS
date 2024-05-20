import { Customer, CustomerDraft, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './ctpClient.ts';
import { env } from '../utils/utils.tsx';

type ReistrationResponse = {
  error: boolean;
  customer: Customer | null;
  errorDescription: string;
};

export class RegistrationService {
  static async registration(customerDraft: CustomerDraft): Promise<ReistrationResponse> {
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
}
