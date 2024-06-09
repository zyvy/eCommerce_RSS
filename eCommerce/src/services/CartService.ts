import { AuthorizationService } from './AuthorizationService.ts';

const KEY_CART = 'cart';

type CartType = {
  id: string;
};

type ProductCart = {
  id: string;
  variantId: number;
  quantity: number;
  lineItemId: string;
};

async function getCartByCustomerId(customerId: string) {
  try {
    const response = await AuthorizationService.getApiRoot().carts().withCustomerId({ customerId }).get().execute();
    return response.body;
  } catch {
    return null;
  }
}

async function getLineItemId(productId: string, variantId: number) {
  // eslint-disable-next-line no-use-before-define
  const products = await CartService.getProducts();
  const product = products.find((item) => item.id === productId && item.variantId === variantId);
  if (product) {
    return product.lineItemId;
  }
  return null;
}

export class CartService {
  static async createCart() {
    const customerId = AuthorizationService.getCustomerInfo().id;
    if (customerId) {
      const cart = await getCartByCustomerId(customerId);
      if (cart) {
        CartService.updateCartInfo('id', cart.id);
        return cart;
      }
    }
    const response = await AuthorizationService.getApiRoot()
      .carts()
      .post({
        body: {
          currency: 'USD',
          customerId,
        },
      })
      .execute();
    CartService.updateCartInfo('id', response.body.id);
    return response.body;
  }

  static async getProducts(): Promise<ProductCart[]> {
    const cart = await CartService.getCart();
    return cart.lineItems.map((item) => ({
      id: item.productId,
      variantId: item.variant.id,
      quantity: item.quantity,
      lineItemId: item.id,
    }));
  }

  static async addItemToCart(productId: string, quantity: number, variantId?: number) {
    const version = await CartService.getCartVersion();
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

  static async removeItemFromCart(productId: string, variantId: number, quantity?: number) {
    const lineItemId = await getLineItemId(productId, variantId);
    if (!lineItemId) {
      throw new Error(`Don't find lineItemId`);
    }
    const version = await CartService.getCartVersion();
    try {
      const response = await AuthorizationService.getApiRoot()
        .carts()
        .withId({ ID: CartService.getCartInfo().id })
        .post({
          body: {
            version,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId,
                quantity,
              },
            ],
          },
        })
        .execute();
      return response.body;
    } catch {
      return null;
    }
  }

  static async getCart() {
    const cardId = CartService.getCartInfo().id;
    const customerId = AuthorizationService.getCustomerInfo().id;
    if (!cardId && customerId) {
      const response = await AuthorizationService.getApiRoot().carts().withCustomerId({ customerId }).get().execute();
      return response.body;
    }
    const response = await AuthorizationService.getApiRoot().carts().withId({ ID: cardId }).get().execute();
    return response.body;
  }

  static async getAllCarts() {
    const response = await AuthorizationService.getApiRoot().carts().get().execute();
    return response.body;
  }

  static async deteleCart(cardId?: string, version?: number) {
    if (!cardId) {
      cardId = CartService.getCartInfo().id;
    }
    if (!version) {
      version = await CartService.getCartVersion();
    }
    try {
      const response = await AuthorizationService.getApiRoot()
        .carts()
        .withId({ ID: cardId })
        .delete({
          queryArgs: {
            version,
          },
        })
        .execute();

      if (CartService.getCartInfo().id === response.body.id) {
        CartService.updateCartInfo('id', '');
      }
      return response.body;
    } catch {
      return null;
    }
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
