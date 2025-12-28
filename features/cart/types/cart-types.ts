import { Product } from "@/types/produt-types";

export type CartItem = {
  product: Product;
  quantity: number;
};

export interface CartState {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
}
