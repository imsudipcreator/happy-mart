"use client";

import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-screen h-16 flex items-center justify-between p-5 bg-[#1d1d1f]">
            <Link href={"/"}>
                <Image src="/logo.svg" alt="logo" width={32} height={32} className="hover:rotate-6 transition-transform duration-100" />
            </Link>
            <div className="flex items-center justify-center gap-2">
                {
                    ROUTES.map((route) => (
                        <Link href={route.path} key={route.name} className="mx-4 hover:brightness-75">
                            <route.icon />
                        </Link>
                    ))
                }
            </div>
        </nav>
    )
}
