"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

/* export const metadata: Metadata = {
  title: "SCMS Web",
  description:
    "Supply Chain Management System Frontend By Mushfiqur Rahman Abir. Make your supply management easy with SCMS.",
}; */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const isLoggedIn = !!storedEmail;

    const protectedRoutes = [
      "/lm/dashboard",
      "/lm/shipments",
      "/lm/transports",
      "/lm/drivers",
      "/lm/drivers/search",
    ];

    if (protectedRoutes.includes(pathname) && !isLoggedIn) {
      router.push("/login");
    }
  }, [pathname, router]);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
