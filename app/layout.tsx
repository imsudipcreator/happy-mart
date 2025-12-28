import Navbar from "@/ui/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const InterFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Happy Mart - Online Ecommerce Platform",
  description: "A online ecommerce platform for buying products",
  icons: {
    icon: "/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${InterFont.variable} antialiased overflow-x-clip`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
