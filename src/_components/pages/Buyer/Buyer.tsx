"use client";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password, remember });
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
            {/* <div className="absolute top-0 left-0 w-full h-full bg-[rgba(60,40,25,0.4)] z-[-1]" /> */}

            {/* Login Card */}
            <div className="bg-white p-8 md:p-12 lg:p-16 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg z-10 transition-all duration-300 ease-in-out">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-gray-800 mb-8 tracking-wide">
                        LOGIN
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

                    {/* Remember me */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="h-4 w-4 text-[#D96B5B] border-gray-300 rounded focus:ring-2 focus:ring-[#D96B5B] cursor-pointer"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-lg text-white font-medium bg-[#f88d77] hover:bg-[#c64e36] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E5735B] focus:ring-offset-2 tracking-wider"
                    >
                        LOGIN
                    </button>
                </form>

                {/* Signup link */}
                <div className="mt-8 text-center">
                    <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-[#D96B5B] transition-colors"
                    >
                        Not a member? Sign up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
