import { Dispatch, SetStateAction, createContext, useState, useContext, useMemo, ReactNode } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import { CartService, ProductCart } from '../services/CartService.ts';

export interface CartState {
  id: string;
  products: ProductCart[];
  total: number;
  totalPrice: number;
  totalDiscount: number;
}

export type CartContextType = CartState & {
  setCart: Dispatch<SetStateAction<CartState>>;
};

export const initialCartState: CartState = {
  id: '',
  products: [],
  total: 0,
  totalPrice: 0,
  totalDiscount: 0,
};

const CartContext = createContext<CartContextType>({
  ...initialCartState,
  setCart: () => {},
});

const calculateTotalDiscount = (cart: Cart) => {
  let totalDiscount = 0;

  cart.lineItems.forEach((item) => {
    const itemDiscount = item.discountedPricePerQuantity.reduce((acc, discounts) => {
      const lineItemDiscount = discounts.discountedPrice.includedDiscounts.reduce(
        (acc2, discount) => acc2 + discount.discountedAmount.centAmount * discounts.quantity,
        0,
      );
      return acc + lineItemDiscount;
    }, 0);

    totalDiscount += itemDiscount;
  });

  return totalDiscount;
};

export async function loadCart(cart: CartContextType, setCart: Dispatch<SetStateAction<CartState>>) {
  try {
    const newCart = await CartService.getCart();
    cart.id = newCart.id;
    cart.total = newCart.totalLineItemQuantity ?? 0;
    const totalPrice = newCart.totalPrice.centAmount;
    cart.products = [];
    const totalDiscount2 = calculateTotalDiscount(newCart);
    const totalDiscount = newCart.discountOnTotalPrice?.discountedAmount.centAmount ?? 0;
    newCart.lineItems.forEach((item) => {
      cart.products.push({
        id: item.productId,
        variantId: item.variant.id,
        quantity: item.quantity,
        centAmount: item.price.value.centAmount,
        lineItemId: item.id,
      });
    });
    setCart({ ...cart, totalPrice, totalDiscount: totalDiscount + totalDiscount2 });
  } catch (error) {
    return null;
  }
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
