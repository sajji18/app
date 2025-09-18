"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Buyer = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email submitted:", email);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-sm">
                <h2 className="text-3xl font-medium text-center">
                    Log in or Sign up
                </h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your Email"
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer"
                    >
                        Continue
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <div className="space-y-3">
                    <button className="flex items-center w-full border rounded-xl py-3 px-4 hover:bg-gray-100 cursor-pointer">
                        <FcGoogle className="text-xl mr-3" />
                        Continue with Google
                    </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-8">
                    Terms of Use · Privacy Policy
                </p>
            </div>
        </div>
    );
};

export default Buyer;
