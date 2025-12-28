"use client";

import { useCartStore } from "@/features/cart/store/cart-store";
import Button from "@/ui/Button";
import Image from "next/image";

export default function CartPage() {
    const { cart } = useCartStore(state => state);
    if (!cart.length) {
        return (
            <main className="w-full h-[calc(100vh-64px)] flex items-center justify-center">
                Cart is empty
            </main>
        )
    }
    return (
        <main className="w-full min-h-[calc(100vh-64px)] flex items-start justify-center gap-4 px-24 py-12">
            {/** Cart Items Section */}
            <section className="w-[70%] flex flex-col items-start justify-center">
                {
                    cart.map(({ product, quantity }) => (
                        <div key={product.id} className="w-full p-4 bg-white/30 flex items-start gap-4">
                            <div>
                                <Image src={product.image} alt={product.title} width={150} height={150} />
                            </div>
                            <div>
                                <h1 className="text-xl">{product.title}</h1>
                                <p className="text-2xl">${product.price}</p>
                                <p>x{quantity}</p>
                            </div>
                        </div>
                    ))
                }
                <Button title="Place order" className="w-full mt-4" />
            </section>
            {/** Total Section */}
            <section className="w-[30%] bg-white/30 h-96">

            </section>
        </main>
    )
}
