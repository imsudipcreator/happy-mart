import { Product } from "@/types/produt-types";

/**
 * Fetches the products from the FakeStore API and returns them as a Promise.
 * @throws {Error} If there is an error fetching the products
 * @returns {Promise<Product[]>} The products fetched from the API
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

/**
 * Fetches a product from the FakeStore API by its id and returns it as a Promise.
 * @param {number} id - The id of the product to fetch
 * @throws {Error} If there is an error fetching the product
 * @returns {Promise<Product>} The product fetched from the API
 */
export async function getProduct(id: number): Promise<Product> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch product with id: ${id}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product: ", error);
    throw new Error(`Failed to fetch product with id: ${id}`);
  }
}
