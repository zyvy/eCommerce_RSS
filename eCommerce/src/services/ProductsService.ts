import {
  ProductProjectionPagedSearchResponse,
  createApiBuilderFromCtpClient,
  ProductProjection,
} from '@commercetools/platform-sdk';
import { ctpClient } from './ctpClient.ts';
import { env, getSortingString } from '../utils/utils.ts';

interface SearchParams {
  [key: string]: string | boolean | string[];
}

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

  static async getProductById(id: string): Promise<ProductProjection> {
    const apiRoot = ProductsService.getApiRoot();
    const responseTest = await apiRoot.productProjections().withId({ ID: id }).get().execute();
    return responseTest.body;
  }

  static async performSearch(
    searchQuery: string,
    sortingParams: string,
    priceFilter: string[],
    season: string,
  ): Promise<ProductProjectionPagedSearchResponse> {
    const searchParams: SearchParams = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'text.en-US': searchQuery,
      fuzzy: true,
      sort: getSortingString(sortingParams),
    };

    if (priceFilter[0] !== '' && priceFilter[1] !== '') {
      searchParams.filter = [
        `variants.prices.value.centAmount:range(${String(Number(priceFilter[0]) * 100)} to ${String(Number(priceFilter[1]) * 100)})`,
      ];
    }
    if (season.length > 3) {
      searchParams['filter.query'] = [`variants.attributes.Season:"${season}"`];
    }
    const apiRoot = ProductsService.getApiRoot();
    const responseTest = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: searchParams,
      })
      .execute();
    return responseTest.body;
  }
}
