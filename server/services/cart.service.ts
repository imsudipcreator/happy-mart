import { CartItem } from "@/features/cart/types/cart-types";
import { Cart } from "../db/models";

type AddToCartServiceProps = {
  userId: string;
  productId: string;
  quantity: number;
};

type Response =
  | {
      success: true;
      data: CartItem;
    }
  | {
      success: false;
      message: string;
      error: "DB_ERROR";
    };

export const CartService = {
  addItem: async function ({
    userId,
    productId,
    quantity,
  }: AddToCartServiceProps): Promise<Response> {
    try {
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $push: { items: { productId, quantity } } },
        { new: true }
      );

      return {
        success: true,
        data: cart,
      };
    } catch (error) {
      console.error("Error adding to cart: ", error);
      return {
        success: false,
        message: "Error adding cart",
        error: "DB_ERROR",
      };
    }
  },
};
