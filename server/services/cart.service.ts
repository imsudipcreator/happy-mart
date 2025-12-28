import { Cart } from "../db/models";

type AddToCartServiceProps = {
  userId: string;
  productId: string;
  quantity: number;
};

type Response = {
  success: boolean;
  // data: any;
};

export async function addToCartService({
  userId,
  productId,
  quantity,
}: AddToCartServiceProps) {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $push: { items: { productId, quantity } } },
      { new: true }
    );

    if (cart) {
      return {
        success: true,
        data: cart,
      };
    }
  } catch (error) {}
}
