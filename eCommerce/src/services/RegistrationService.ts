import {
  Customer,
  CustomerDraft,
  // CustomerUpdate,
  createApiBuilderFromCtpClient,
  CustomerUpdateAction,
  BaseAddress,
} from '@commercetools/platform-sdk';
import { ctpClient } from './ctpClient.ts';
import { env } from '../utils/utils.ts';
import { AuthorizationService } from './AuthorizationService.ts';

type CustomerResponse = {
  error: boolean;
  customer: Customer | null;
  errorDescription: string;
};

type CustomerUpdateType = {
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
};

type AddressUpdateType = {
  country: string;
  streetName?: string;
  city?: string;
  postalCode?: string;
};

function createCustomerResponse(
  error: boolean = false,
  customer: Customer | null = null,
  errorDescription: string = '',
): CustomerResponse {
  return {
    error,
    customer,
    errorDescription,
  };
}

function getActions(customer: CustomerUpdateType): CustomerUpdateAction[] {
  const { email, firstName, lastName, dateOfBirth } = { ...customer };
  const actions: CustomerUpdateAction[] = [];
  if (email) {
    actions.push({
      action: 'changeEmail',
      email,
    });
  }
  if (firstName) {
    actions.push({
      action: 'setFirstName',
      firstName,
    });
  }
  if (lastName) {
    actions.push({
      action: 'setLastName',
      lastName,
    });
  }
  if (dateOfBirth) {
    actions.push({
      action: 'setDateOfBirth',
      dateOfBirth,
    });
  }
  return actions;
}

export class RegistrationService {
  static async registration(customerDraft: CustomerDraft): Promise<CustomerResponse> {
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

      return createCustomerResponse(false, customer);
    } catch (error) {
      if (error instanceof Error) {
        return createCustomerResponse(true, null, error.message);
      }
      return createCustomerResponse();
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
        .withId({ ID: AuthorizationService.getCustomerInfo().id })
        .get()
        .execute();
      return createCustomerResponse(false, body);
    } catch (error) {
      if (error instanceof Error) {
        return createCustomerResponse(true, null, error.message);
      }
    }
    return createCustomerResponse();
  }

  static async updateCustomer(customer: CustomerUpdateType): Promise<CustomerResponse> {
    const apiRoot = RegistrationService.getApiRoot();

    try {
      const data = await apiRoot
        .customers()
        .withId({ ID: AuthorizationService.getCustomerInfo().id })
        .post({
          body: {
            version: Number(AuthorizationService.getCustomerInfo().version),
            actions: getActions(customer),
          },
        })
        .execute();

      AuthorizationService.saveVersion(data.body!.version);
      return createCustomerResponse(false, data.body);
    } catch (error) {
      if (error instanceof Error) {
        return createCustomerResponse(true, null, error.message);
      }
      return createCustomerResponse();
    }
  }

  static async addAddress(address: BaseAddress, billing: boolean, defaultAddress: boolean): Promise<CustomerResponse> {
    const apiRoot = RegistrationService.getApiRoot();

    try {
      const data = await apiRoot
        .customers()
        .withId({ ID: AuthorizationService.getCustomerInfo().id })
        .post({
          body: {
            version: Number(AuthorizationService.getCustomerInfo().version),
            actions: [
              {
                action: 'addAddress',
                address,
              },
            ],
          },
        })
        .execute();

      AuthorizationService.saveVersion(data.body.version);
      const addressId = data.body.addresses.at(-1)?.id;

      const res = await RegistrationService.setAddressType(addressId || '', billing);
      if (res.error) {
        return createCustomerResponse(true, null, res.errorDescription);
      }

      if (defaultAddress) {
        const resSetDef = await RegistrationService.setDefaultAddress(addressId || '', billing);
        return createCustomerResponse(false, resSetDef.customer);
      }

      return createCustomerResponse(false, res.customer);
    } catch (error) {
      if (error instanceof Error) {
        return createCustomerResponse(true, null, error.message);
      }
      return createCustomerResponse();
    }
  }

  static async setAddressType(addressId: string, billing: boolean): Promise<CustomerResponse> {
    const apiRoot = RegistrationService.getApiRoot();

    try {
      const data = await apiRoot
        .customers()
        .withId({ ID: AuthorizationService.getCustomerInfo().id })
        .post({
          body: {
            version: Number(AuthorizationService.getCustomerInfo().version),
            actions: [
              {
                action: billing ? 'addBillingAddressId' : 'addShippingAddressId',
                addressId,
              },
            ],
          },
        })
        .execute();

      AuthorizationService.saveVersion(data.body!.version);

      return createCustomerResponse(false, data.body);
    } catch (error) {
      if (error instanceof Error) {
        return createCustomerResponse(true, null, error.message);
      }
      return createCustomerResponse();
    }
  }

  static async setDefaultAddress(addressId: string, billing: boolean): Promise<CustomerResponse> {
    const apiRoot = RegistrationService.getApiRoot();

    try {
      const data = await apiRoot
        .customers()
        .withId({ ID: AuthorizationService.getCustomerInfo().id })
        .post({
          body: {
            version: Number(AuthorizationService.getCustomerInfo().version),
            actions: [
              {
                action: billing ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress',
                addressId,
              },
            ],
          },
        })
        .execute();

      AuthorizationService.saveVersion(data.body!.version);

      return createCustomerResponse(false, data.body);
    } catch (error) {
      if (error instanceof Error) {
        return createCustomerResponse(true, null, error.message);
      }
      return createCustomerResponse();
    }
  }

  static async changeAddress(addressId: string, address: AddressUpdateType): Promise<CustomerResponse> {
    const apiRoot = RegistrationService.getApiRoot();

    try {
      const data = await apiRoot
        .customers()
        .withId({ ID: AuthorizationService.getCustomerInfo().id })
        .post({
          body: {
            version: Number(AuthorizationService.getCustomerInfo().version),
            actions: [
              {
                action: 'changeAddress',
                addressId,
                address,
              },
            ],
          },
        })
        .execute();

      AuthorizationService.saveVersion(data.body!.version);

      return createCustomerResponse(false, data.body);
    } catch (error) {
      if (error instanceof Error) {
        return createCustomerResponse(true, null, error.message);
      }
      return createCustomerResponse();
    }
  }

  static async removeAddress(addressId: string, billing: boolean): Promise<CustomerResponse> {
    const apiRoot = RegistrationService.getApiRoot();

    try {
      const customer = await apiRoot
        .customers()
        .withId({ ID: AuthorizationService.getCustomerInfo().id })
        .post({
          body: {
            version: Number(AuthorizationService.getCustomerInfo().version),
            actions: [
              {
                action: billing ? 'removeBillingAddressId' : 'removeShippingAddressId',
                addressId,
              },
            ],
          },
        })
        .execute();

      AuthorizationService.saveVersion(customer.body!.version);

      const data = await apiRoot
        .customers()
        .withId({ ID: AuthorizationService.getCustomerInfo().id })
        .post({
          body: {
            version: Number(AuthorizationService.getCustomerInfo().version),
            actions: [
              {
                action: 'removeAddress',
                addressId,
              },
            ],
          },
        })
        .execute();

      AuthorizationService.saveVersion(data.body!.version);

      return createCustomerResponse(false, customer.body);
    } catch (error) {
      if (error instanceof Error) {
        return createCustomerResponse(true, null, error.message);
      }
      return createCustomerResponse();
    }
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<CustomerResponse> {
    const apiRoot = RegistrationService.getApiRoot();

    try {
      const data = await apiRoot
        .customers()
        .password()
        .post({
          body: {
            id: AuthorizationService.getCustomerInfo().id,
            version: Number(AuthorizationService.getCustomerInfo().version),
            currentPassword,
            newPassword,
          },
        })
        .execute();

      AuthorizationService.saveVersion(data.body!.version);
      return createCustomerResponse(false, data.body);
    } catch (error) {
      if (error instanceof Error) {
        return createCustomerResponse(true, null, error.message);
      }
      return createCustomerResponse();
    }
  }
}
