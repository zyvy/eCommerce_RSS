import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './ctpClient.ts';
import { env } from '../utils/utils.ts';
import { AuthorizationService } from './AuthorizationService.ts';

const KEY_CART = 'cart';

type CartType = {
  id: string;
};

export class CartService {
  static getApiRoot() {
    return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${env.VITE_PROJECT_KEY}`,
    });
  }

  static async createCart(customerId?: string) {
    const response = await AuthorizationService.getApiRoot()
      .carts()
      .post({
        body: {
          currency: 'USD',
          customerId,
        },
      })
      .execute();
    return response.body;
  }

  static async addItemToCart(productId: string, quantity: number, variantId?: number) {
    const version = await CartService.getCartVersion();
    console.log('version', version);
    const response = await AuthorizationService.getApiRoot()
      .carts()
      .withId({ ID: CartService.getCartInfo().id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addLineItem',
              productId,
              variantId,
              quantity,
            },
          ],
        },
      })
      .execute();
    return response.body;
  }

  static async getCart() {
    const response = await AuthorizationService.getApiRoot()
      .carts()
      .withId({ ID: CartService.getCartInfo().id })
      .get()
      .execute();
    return response.body;
    /* "81ecf17e-8866-4cf7-908a-3711d9a35f79"
    "666eee26-6042-4b00-8713-c92333cb43b1"
    "7547dbb8-44c0-426a-b364-48e595d70a4c" */
  }

  static async getCartVersion() {
    const data = await CartService.getCart();
    return data.version;
  }

  static updateCartInfo<K extends keyof CartType>(key: K, value: CartType[K]) {
    const cart = CartService.getCartInfo();
    cart[key] = value;
    localStorage.setItem(KEY_CART, JSON.stringify(cart));
  }

  static getCartInfo(): CartType {
    const cart = localStorage.getItem(KEY_CART);
    return cart ? JSON.parse(cart) : { id: '' };
  }
}
