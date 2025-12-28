'use client'
import { useCartStore } from '@/features/cart/cart.store';
import { getProduct } from '@/server/queries/products.queries';
import Button from '@/ui/Button';
import { useQuery } from '@tanstack/react-query';
import { Loader, Star } from 'lucide-react';
import Image from 'next/image';
import { use } from 'react';

export default function ProductPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = use(params);
    const addToCart = useCartStore(state => state.addToCart);
    const { data: product, isLoading, isError } = useQuery({ queryKey: ["products", id], queryFn: () => getProduct(id) });
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                <Loader className="animate-spin" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                <p className="text-red-500">Error fetching product</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                <p className="text-red-500">Product not found</p>
            </div>
        )
    }
    return (
        <main className='flex items-center justify-between gap-5 w-full h-[calc(100vh-128px)] p-16'>
            <section className='w-[40%] h-full flex flex-col items-center justify-center gap-8 '>
                <div className='flex-1 bg-white/10 flex items-center justify-center w-full'>
                    <Image src={product.image} alt={product.title} width={500} height={500} className='w-[60%] object-contain' />
                </div>
                <div className='grid grid-cols-2 w-full gap-4'>
                    <Button className='col-span-1' title='Buy now' />
                    <Button className='col-span-1' title='Add to cart' onClick={() => addToCart({ product, quantity: 1 })} />
                </div>
            </section>
            <section className='w-[60%] h-full flex flex-col gap-4 px-5'>
                <h1 className='text-4xl'>{product.title}</h1>
                <p className='text-white/70 text-xl'>{product.description}</p>
                <div className='flex items-center gap-1'>
                    <p className='flex items-center gap-1'>
                        {
                            Array(Math.floor(product.rating.rate)).fill(0).map((_, index) => (
                                <Star key={index} fill='orange' color='orange' />
                            ))
                        }
                        {
                            Array(5 - Math.floor(product.rating.rate)).fill(0).map((_, index) => (
                                <Star key={index} />
                            ))
                        }
                    </p>
                    <span className='text-lg pt-0.5 pl-2'>{product.rating.rate}</span>
                    <span className='text-white/60 '>({product.rating.count})</span>
                </div>
                <p className='text-4xl'>${product.price}</p>
            </section>
        </main>
    )
}
