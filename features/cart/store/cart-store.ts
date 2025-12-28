import { create } from "zustand";
import { CartState } from "../types/cart-types";

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) => {
    set((state) => {
      const existing = state.cart.find((i) => i.product.id === item.product.id);

      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.product.id === item.product.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }

      // item does not exist → ADD it
      return {
        cart: [...state.cart, item],
      };
    });
  },
  removeFromCart: ({ product }) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== product.id),
    }));
  },
  clearCart: () => {
    set(() => ({
      cart: [],
    }));
  },
}));
