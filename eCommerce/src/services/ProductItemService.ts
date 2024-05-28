import { ProductProjection, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './ctpClient.ts';
import { env } from '../utils/utils.tsx';


export class ProductsService {
  static getApiRoot() {
    return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${env.VITE_PROJECT_KEY}`,
    });
  }
  static async getProducts(ID: string): Promise<ProductProjection> {
    const apiRoot = ProductsService.getApiRoot();


    const responseTest = await apiRoot.productProjections().withId({ID}).get().execute();
    console.log('Products:', responseTest.body);
    return responseTest.body;
  }
}