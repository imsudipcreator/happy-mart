"use client";

import Button from "@/ui/Button";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Home() {
  const { } = useQuery({ queryKey: ["products"] });
  return (
    <main className="flex flex-col items-center justify-center w-full">
      {/** Hero section */}
      <section className="w-full h-[calc(100vh-128px)] flex items-center justify-between gap-2 py-6 px-14 bg-white/20 m-4">
        <div className="flex flex-col gap-5 w-[50%]">
          <h1 className="text-5xl font-semibold">Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</h1>
          <p className="text-xl">Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday</p>
          <div className="flex items-center gap-2">
            <Button title="Check out this product" className="text-black" />
            <Button title="Add to cart" className="text-black bg-amber-200 hover:bg-amber-300" />
          </div>
        </div>
        <div className="w-[50%] flex items-center justify-center">
          <Image className="w-[40%] hover:scale-110 hover:rotate-6" src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png" alt="alt" width={200} height={400} />
        </div>
      </section>
    </main>
  );
}
