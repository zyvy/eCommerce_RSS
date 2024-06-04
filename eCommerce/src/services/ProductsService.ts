import {
  ProductProjectionPagedSearchResponse,
  createApiBuilderFromCtpClient,
  ProductProjection,
} from '@commercetools/platform-sdk';
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
    return response.body;
  }

  static async getProductByKey(key: string): Promise<ProductProjection> {
    const apiRoot = ProductsService.getApiRoot();
    const responseTest = await apiRoot.productProjections().withKey({ key }).get().execute();
    return responseTest.body;
  }
  static async performSearch(searchQuery: string): Promise<ProductProjectionPagedSearchResponse> {
    const apiRoot = ProductsService.getApiRoot();
    const responseTest = await apiRoot.productProjections().search().get({
      queryArgs: {
        'text.en-US': searchQuery,
        fuzzy: true,
      },
    }).execute();
    return responseTest.body;
  }
}
