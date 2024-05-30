import { ProductProjection, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './ctpClient.ts';
import { env } from '../utils/utils.ts';

export class ProductsService {
  static getApiRoot() {
    return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${env.VITE_PROJECT_KEY}`,
    });
  }
  static async getProducts(key: string): Promise<ProductProjection> {
    const apiRoot = ProductsService.getApiRoot();
    const responseTest = await apiRoot.productProjections().withKey({ key }).get().execute();
    console.log('Products:', responseTest.body);
    return responseTest.body;
  }
}
