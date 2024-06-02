import {
  FacetResult,
  ProductProjectionPagedSearchResponse,
  ProductType,
  createApiBuilderFromCtpClient,
  CategoryPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ctpClient } from './ctpClient.ts';
import { env } from '../utils/utils.ts';

interface ProductFilterParams {
  selectedCategory?: string;
  priceRange?: Record<number, number>;
  season?: string;
  fabric?: string;
  size?: number;
  brand?: string;
  color?: string;
}

export class ProductsService {
  static getApiRoot() {
    return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${env.VITE_PROJECT_KEY}`,
    });
  }
  static async getProducts(params: ProductFilterParams): Promise<ProductProjectionPagedSearchResponse> {
    const apiRoot = ProductsService.getApiRoot();
    let queryArgs: { filter?: string[] } = {};
    queryArgs.filter = [];
    if (params.selectedCategory) {
      queryArgs.filter.push(`categories.id:"${params.selectedCategory}"`);
    }
    if (params.priceRange) {
      queryArgs.filter.push(`variants.price.centAmount:range(${params.priceRange})`);
    }
    if (params.season) {
      queryArgs.filter.push(`season:"${params.season}"`);
    }
    if (params.fabric) {
      queryArgs.filter.push(`fabric:"${params.fabric}"`);
    }
    if (params.size) {
      queryArgs.filter.push(`size:"${params.size}"`);
    }
    if (params.brand) {
      queryArgs.filter.push(`brand:"${params.brand}"`);
    }
    if (params.color) {
      queryArgs.filter.push(`color:"${params.color}"`);
    }
    const request = apiRoot.productProjections().search().get({ queryArgs });
    const response = await request.execute();
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
  static async getCategories(): Promise<CategoryPagedQueryResponse> {
    const apiRoot = ProductsService.getApiRoot();
    let limit = 100;
    const response = await apiRoot.categories().get({ queryArgs: { limit } }).execute();
    /* const categoriesResponse: CategoryPagedQueryResponse = response.body;

      const categories: Record<string, string> = {};
      categoriesResponse.results.forEach((category) => {
        if (!category.ancestors[0]) {
          categories[category.name['en-US']] = category.id;
        }
      }); */

    return response.body;
  }
}
