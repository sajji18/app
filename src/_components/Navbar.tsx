"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const logo = "/cbuddy.png";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navLinks: { href: string; label: string }[] = [];

    if (pathname === "/") {
        navLinks.push(
            { href: "/buyer", label: "Buy Now" },
            { href: "/seller", label: "Become a Seller" }
        );
    } else if (pathname.startsWith("/seller")) {
        navLinks.push({ href: "/buyer", label: "Are You a Buyer?" });
    } else if (pathname.startsWith("/buyer")) {
        navLinks.push({ href: "/seller", label: "Become a Seller" });
    } else if (pathname.startsWith("/sdashboard")) {
        navLinks.push({ href: "/", label: "Logout" });
    } else if (pathname.startsWith("/bdashboard")) {
        navLinks.push({ href: `/shorts/1`, label: "CraftReels" });
        navLinks.push({ href: "/", label: "Logout" });
    } else if (pathname.startsWith("/shorts")) {
        navLinks.push({ href: "/", label: "Logout" });
    } else if (pathname.startsWith("/product")) {
        navLinks.push({ href: "/", label: "Logout" });
    }

    return (
        <nav className="fixed top-0 left-0 w-full shadow z-50 flex items-center justify-between px-6 py-3 bg-[#F9E9D9]">
            <div
                className="flex items-center cursor-pointer"
                onClick={() => router.push("/")}
            >
                <img
                    src={logo}
                    alt="CraftBuddy Logo"
                    className="h-14 w-14 rounded-full"
                />
                <div className="text-2xl font-bold">
                    <span className="text-[#aa3410]">Craft</span>
                    <span className="text-[#6a1903]">Buddy</span>
                </div>
            </div>

            <div className="flex items-center gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-[#7C1D00] hover:text-black transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
