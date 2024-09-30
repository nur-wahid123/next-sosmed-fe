import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
    cart: Cookies.get('cart')
        ? JSON.parse(Cookies.get('cart'))
        : { cartItems: [], paymentMethod: '' },
}
function reducer (state, action) {
    switch (action.type) {
        case "CART_ADD_ITEM": {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            );
            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                      item._id === existItem._id
                          ? newItem
                          : item
                  )
                : [...state.cart.cartItems, newItem];
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(
                (item) => item._id !== action.payload._id
            );
            Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case 'CART_CLEAR': {
            return { ...state, cart: { ...state.cart, cartItems: [] } };
        }

        case 'SAVE_PAYMENT_METHOD': {
            return {
                ...state,
                cart: { ...state.cart, paymentMethod: action.payload },
            };
        }

        default:
            return state;
    }
}

export function StoreProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;
}