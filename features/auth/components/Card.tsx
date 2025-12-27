import { Loader } from 'lucide-react'
import React from 'react'
import { useAuth } from '../hooks/use-auth'

export default function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="border border-white/10 p-12 flex flex-col gap-2 rounded-xl shadow-2xl shadow-white/10">
            {children}
        </div>
    )
}

export function CardHeader({ title, desc }: { title: string, desc?: string }) {
    return (
        <div className="flex flex-col gap-1.5 mb-4">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className='text-white/60 w-[80%]'>{desc}</p>
        </div>
    )
}

interface CardInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string,
    label: string
}

export function CardInput({ placeholder, label, ...props }: CardInputProps) {
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={label} className=" ">{label}</label>
            <input
                id={label}
                className="border border-white/10 p-3 rounded-lg w-full min-w-sm"
                placeholder={placeholder}
                {...props}
            />
        </div>
    )
}

export function CardButton({ title, ...props }: { title: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { loading } = useAuth();
    return (
        <button {...props} className='rounded-md bg-white px-5 py-2 text-black hover:bg-white/70 cursor-pointer transition-colors duration-200'>
            {loading ? <Loader className="animate-spin" /> : title}
        </button>
    )
}
