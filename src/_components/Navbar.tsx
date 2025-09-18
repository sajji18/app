"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navLinks: { href: string; label: string }[] = [];

    if (pathname === "/") {
        navLinks.push(
            { href: "/buyer", label: "Are You a Buyer?" },
            { href: "/seller", label: "Become a Seller" }
        );
    } else if (pathname.startsWith("/seller")) {
        navLinks.push({ href: "/buyer", label: "Are You a Buyer?" });
    } else if (pathname.startsWith("/buyer")) {
        navLinks.push({ href: "/seller", label: "Become a Seller" });
    } else if (pathname.startsWith("/sdashboard")) {
        navLinks.push({ href: "/", label: "Logout" });
    }

    return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow z-50 flex items-center justify-between px-6">
            <div
                className="text-xl font-bold cursor-pointer"
                onClick={() => router.push("/")}
            >
                <span>Craft</span>
                <span>Buddy</span>
            </div>

            <div className="flex gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-gray-700 hover:text-black transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
