import { ProductProjectionPagedSearchResponse, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './ctpClient.ts';
import { env } from '../utils/utils.ts';

export class ProductsService {
  static getApiRoot() {
    return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${env.VITE_PROJECT_KEY}`,
    });
  }
  
  static async getProducts(): Promise<ProductProjectionPagedSearchResponse> {
    const apiRoot = ProductsService.getApiRoot();
    const response = await apiRoot.productProjections().search().get().execute();
    console.log('Products:', response.body.results);
    return response.body;
  }
}
