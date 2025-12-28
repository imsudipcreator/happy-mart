import { Product } from "@/types/produt-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCartStore } from "./cart.store";

type AddToCartInput = {
  product: Product;
  quantity: number;
};

export function useAddToCart() {
  const queryClient = useQueryClient();
  const addToCart = useCartStore((s) => s.addToCart);
  const setCart = useCartStore((s) => s.setCart);

  return useMutation({
    mutationFn: async ({ product, quantity }: AddToCartInput) => {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      return res.json();
    },

    // ⚡ instant UI
    onMutate: ({ product, quantity }) => {
      addToCart({ product, quantity });
    },

    // 🔐 server wins
    onSuccess: (data) => {
      console.log("Success: ", data);
      setCart(data.cart);
    },

    // 🔁 rollback
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
