import { Product } from "@/types/produt-types";

/**
 * Fetches the products from the FakeStore API and returns them as a Promise.
 * @throws {Error} If there is an error fetching the products
 * @returns {Promise<Product>} The products fetched from the API
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}
