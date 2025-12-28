type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type Response =
  | {
      success: boolean;
      data: Product | null;
    }
  | {
      success: boolean;
      message: string;
      error: "PRODUCT_FETCHING";
    };

/**
 * Fetches all products from the API.
 *
 * @returns {Promise<Response>} A promise containing a response object.
 * The response object contains a boolean success property, and either a data property containing the fetched products, or a message and error property if an error occurred.
 */
export async function fetchProducts(): Promise<Response> {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Product fetching error: ", error);
    return {
      success: false,
      message: "Error occured during product fetching",
      error: "PRODUCT_FETCHING",
    };
  }
}
