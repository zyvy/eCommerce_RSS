import { Dispatch, SetStateAction, createContext, useState, useContext, useMemo, ReactNode } from 'react';
import { CartService, ProductCart } from '../services/CartService.ts';

/* export type ProductCart = {
  id: string;
  variantId: number;
  quantity: number;
  centAmount: number;
}; */

export interface CartState {
  id: string;
  products: ProductCart[];
  total: number;
  totalPrice: number;
}

export type CartContextType = CartState & {
  setCart: Dispatch<SetStateAction<CartState>>;
};

export const initialCartState: CartState = {
  id: '',
  products: [],
  total: 0,
  totalPrice: 0,
};

const CartContext = createContext<CartContextType>({
  ...initialCartState,
  setCart: () => {},
});

export async function loadCart(cart: CartContextType, setCart: Dispatch<SetStateAction<CartState>>) {
  CartService.getCart().then((newCart) => {
    cart.id = newCart.id;
    cart.total = newCart.totalLineItemQuantity ?? 0;
    cart.totalPrice = newCart.totalPrice.centAmount;
    cart.products = [];
    newCart.lineItems.forEach((item) => {
      cart.products.push({
        id: item.productId,
        variantId: item.variant.id,
        quantity: item.quantity,
        centAmount: item.price.value.centAmount,
        lineItemId: item.id,
      });
    });
    setCart({ ...cart });
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(initialCartState);

  const cartMemo = useMemo(
    () => ({
      ...cart,
      setCart,
    }),
    [cart],
  );

  return <CartContext.Provider value={cartMemo}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
