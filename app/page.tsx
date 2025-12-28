"use client";

import { useAddToCart } from "@/features/cart/cart.mutations";
import { random } from "@/lib/utils";
import { fetchProducts } from "@/server/queries/products.queries";
import { Product } from "@/types/produt-types";
import Button from "@/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function Home() {
  const router = useRouter();
  const { mutate: addToCart } = useAddToCart();
  const { data: products, isLoading, isError, error } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const featuredProduct: Product | null = useMemo(() => {
    if (!products?.length) {
      return null
    }

    const index = random(10);
    return products[index];
  }, [products]);


  if (isLoading) {
    return (
      <main className="flex flex-col items-center justify-center w-full h-[calc(100vh-64px)]">
        <Loader className="animate-spin" />
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex flex-col items-center justify-center w-full h-[calc(100vh-64px)]">
        <p className="text-red-500">{error?.message}</p>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center w-full">
      {/** Hero section */}
      <section className="w-full h-[calc(100vh-128px)]  gap-2 flex items-center justify-center py-6 px-14 bg-white/20 m-4">
        {
          featuredProduct ? (
            <div className="flex-1 flex items-center justify-between ">
              <div className="flex flex-col gap-5 w-[50%]">
                <h1 className="text-5xl font-semibold">{featuredProduct.title}</h1>
                <p className="text-xl">{featuredProduct.description}</p>
                <p className="text-4xl font-medium">${featuredProduct.price} only</p>
                <div className="flex items-center gap-2">
                  <Button title="Check out this product" className="text-black" onClick={() => router.push(`/product/${featuredProduct.id}`)} />
                  <Button title="Add to cart" className="text-black bg-amber-200 hover:bg-amber-300" onClick={() => addToCart({ product: featuredProduct, quantity: 1 })} />
                </div>
              </div>
              <div className="w-[50%] flex items-center justify-center">
                <Image className="w-[40%] hover:scale-110 hover:rotate-6 transition-transform duration-100" src={featuredProduct.image} alt="alt" width={200} height={400} />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <h1>No featured product found</h1>
            </div>
          )
        }
      </section>
      {/** Product section  */}
      <section className="flex flex-col gap-2 p-8 w-full">
        <h1 className="text-3xl font-medium">Top picks for you</h1>
        <div className="grid grid-cols-5 gap-4">
          {
            products?.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="flex flex-col gap-2 col-span-1 min-h-96 p-4 hover:bg-white/20">
                <Image className="h-[66%] self-center object-contain" src={product.image} alt={product.title} width={200} height={200} />
                <h1 className="font-medium text-lg">{product.title}</h1>
                <p className="text-2xl">${product.price}</p>
              </Link>
            ))
          }
        </div>
      </section>
    </main>
  );
}
