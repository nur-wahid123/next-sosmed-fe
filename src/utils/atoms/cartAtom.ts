// atoms/cartAtoms.ts
import { atom } from 'jotai';
import Cookies from 'js-cookie';

// Define the cart atom
export const cartAtom = atom(
  Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart') as string)
    : { cartItems: [], paymentMethod: '' }
);

export const cartItemsAtom = atom(
  (get) => get(cartAtom).cartItems,
  (get, set, newItem) => {
    const cart = get(cartAtom);
    const existItem = cart.cartItems.find((item) => item._id === newItem._id);
    const cartItems = existItem
      ? cart.cartItems.map((item) =>
          item._id === existItem._id ? newItem : item
        )
      : [...cart.cartItems, newItem];

    const updatedCart = { ...cart, cartItems };
    Cookies.set('cart', JSON.stringify(updatedCart));
    set(cartAtom, updatedCart);
  }
);

// Atom for managing payment method
export const paymentMethodAtom = atom(
  (get) => get(cartAtom).paymentMethod,
  (get, set, newPaymentMethod) => {
    const cart = get(cartAtom);
    const updatedCart = { ...cart, paymentMethod: newPaymentMethod };
    set(cartAtom, updatedCart);
  }
);
