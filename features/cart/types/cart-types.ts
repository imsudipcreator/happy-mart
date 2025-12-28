import { Product } from "@/types/produt-types";

export type CartItem = {
  product: Product;
  quantity: number;
};

export interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
}
