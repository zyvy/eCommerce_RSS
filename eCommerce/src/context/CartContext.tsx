import { Dispatch, SetStateAction, createContext, useState, useContext, useMemo, ReactNode } from 'react';
import { CartService } from '../services/CartService.ts';

export type ProductCart = {
  id: string;
  variantId: number;
  quantity: number;
  centAmount: number;
};

export interface CartState {
  id: string;
  products: ProductCart[];
  total: number;
  totalPrice: number;
}

export type CartContextType = CartState & {
  setCart: Dispatch<SetStateAction<CartState>>;
};

const initialCartState: CartState = {
  id: '',
  products: [],
  total: 0,
  totalPrice: 0,
};

const CartContext = createContext<CartContextType>({
  ...initialCartState,
  setCart: () => {},
});

export async function loadCart(cartContext: CartContextType, setCart: Dispatch<SetStateAction<CartState>>) {
  CartService.getCart().then((cart) => {
    cartContext.id = cart.id;
    cartContext.total = cart.totalLineItemQuantity ?? 0;
    cartContext.totalPrice = cart.totalPrice.centAmount;
    cartContext.products = [];
    cart.lineItems.forEach((item) => {
      cartContext.products.push({
        id: item.productId,
        variantId: item.variant.id,
        quantity: item.quantity,
        centAmount: item.price.value.centAmount,
      });
    });
    setCart({ ...cartContext });
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
