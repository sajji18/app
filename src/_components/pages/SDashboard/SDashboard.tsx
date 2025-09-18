"use client";
import { useState } from "react";
import ProductCard from "@/_components/Card";
import Chat from "@/_components/Chat";

const Dashboard = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Handmade Vase",
            price: "₹1200",
            description: "A beautiful handcrafted vase perfect for home decor.",
            image: "/image.png",
        },
        {
            id: 2,
            name: "Wooden Chair",
            price: "₹4500",
            description:
                "Comfortable wooden chair made from premium teak wood.",
            image: "/image.png",
        },
        {
            id: 3,
            name: "Woolen Scarf",
            price: "₹800",
            description: "Soft woolen scarf, keeps you warm in winters.",
            image: "/image.png",
        },
    ]);

    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProducts([...products, { id: Date.now(), ...form }]);
        setForm({ name: "", description: "", price: "", image: "" });
        setIsOpen(false);
    };

    return (
        <div className="mt-20 px-10">
            <h2 className="text-2xl font-medium mb-6">My Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {/* Create Card */}
                <div
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-blue-300 to-purple-400 rounded-xl shadow-md p-6 flex items-center justify-center text-white font-semibold text-lg transition-transform transform hover:scale-105 cursor-pointer"
                >
                    + Create
                </div>

                {/* Product Cards */}
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        image={p.image}
                        name={p.name}
                        price={p.price}
                        description={p.description}
                    />
                ))}
            </div>

            {/* Modal */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
                    >
                        <h3 className="text-xl font-semibold mb-4">
                            Add Product
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                            <input
                                type="text"
                                name="price"
                                placeholder="Price"
                                value={form.price}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                            <input
                                type="text"
                                name="image"
                                placeholder="Image URL"
                                value={form.image}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Chat />
        </div>
    );
};

export default Dashboard;
