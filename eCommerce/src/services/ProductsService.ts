import {
  FacetResult,
  ProductProjectionPagedSearchResponse,
  ProductType,
  createApiBuilderFromCtpClient,
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

  static async getProductTypes(): Promise<ProductType[]> {
    const apiRoot = ProductsService.getApiRoot();
    try {
      const response = await apiRoot.productTypes().get().execute();
      return response.body.results;
    } catch (error) {
      console.error('Error fetching products types:', error);
      return [];
    }
  }
  static async getAttributesValues(attributeName: string): Promise<string> {
    const apiRoot = ProductsService.getApiRoot();
    try {
      const response = await apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            facet: `variants.attributes.${attributeName}`,
          },
        })
        .execute();
      return response.body.facets[`variants.attributes.${attributeName}`].type;
    } catch (error) {
      console.error(`Error fetching values for attribute ${attributeName}:`, error);
      return '';
    }
  }
}
