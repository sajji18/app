"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
    const { token, role } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [remember_me, setRememberMe] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        const response = await axios.post(
            "https://bb5f5d71d2b6.ngrok-free.app/api/auth/signup/email",
            {
                email,
                password,
                name,
                user_type: "buyer",
            }
        );
        if (response.status !== 201) {
            alert("Signup failed. Please check your credentials.");
            return;
        }
        const { token, role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        role === "seller"
            ? router.push("/sdashboard")
            : router.push("/bdashboard");
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative p-6 font-[Inter,sans-serif] overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-2]"
                style={{
                    backgroundImage:
                        "url('https://i.postimg.cc/1X8GBQmY/IMG-20250920-WA0004.jpg')",
                    filter: "blur(0.01px) brightness(0.7) sepia(0.8) hue-rotate(-20deg) saturate(1.2)",
                }}
            />

            {/* Signup Card */}
            <div className="bg-white p-8 md:p-12 lg:p-16 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg z-10 transition-all duration-300 ease-in-out">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-gray-800 mb-8 tracking-wide">
                        SIGN UP
                    </h1>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                            placeholder="yourname@example.com"
                            aria-label="Email Address"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                            placeholder="••••••••"
                            aria-label="Password"
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label
                            htmlFor="confirm-password"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                            placeholder="••••••••"
                            aria-label="Confirm Password"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                            placeholder="Your Name"
                            aria-label="Name"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-lg text-white font-medium bg-[#f88d77] hover:bg-[#c64e36] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E5735B] focus:ring-offset-2 tracking-wider"
                    >
                        SIGN UP
                    </button>
                </form>

                {/* Login link */}
                <div className="mt-8 text-center">
                    <Link
                        href="/buyer"
                        className="text-sm text-gray-600 hover:text-[#D96B5B] transition-colors"
                    >
                        Already a member? Login
                    </Link>
                </div>
                <div className="mt-2 text-center">
                    <Link
                        href="/seller"
                        className="text-sm text-gray-600 hover:text-[#D96B5B] transition-colors"
                    >
                        Become a Seller? Click Here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
