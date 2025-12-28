import { CartItem } from "@/features/cart/types/cart-types";
import { connectDb } from "../db/init";
import { Cart } from "../db/models";

type AddToCartServiceProps = {
  userId: string;
  productId: number;
  quantity: number;
};

type AddItemResponse =
  | {
      success: true;
      data: CartItem;
    }
  | {
      success: false;
      message: string;
      error: "DB_ERROR";
    };

type GetCartItemsResponse =
  | {
      success: true;
      data: CartItem[];
    }
  | {
      success: false;
      message: string;
      error: "NOT_FOUND" | "DB_ERROR";
    };

export const CartService = {
  addItem: async function ({
    userId,
    productId,
    quantity,
  }: AddToCartServiceProps): Promise<AddItemResponse> {
    try {
      await connectDb();
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

  getCartItems: async function (userId: string): Promise<GetCartItemsResponse> {
    try {
      await connectDb();
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        console.error(`Cart not found with the userId: ${userId}`);
        return {
          success: false,
          message: "Cart not found",
          error: "NOT_FOUND",
        };
      }
      // debug
      console.log("Cart Items: ", cart.items);
      return {
        success: true,
        data: cart.items,
      };
    } catch (error) {
      console.error("Error getting cart items: ", error);
      return {
        success: false,
        message: "Error getting cart items",
        error: "DB_ERROR",
      };
    }
  },
};
