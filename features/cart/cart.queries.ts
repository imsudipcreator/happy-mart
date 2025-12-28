import { useQuery } from "@tanstack/react-query";

export function useGetCartItems() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to get cart items");
      }

      return res.json();
    },
  });
}
