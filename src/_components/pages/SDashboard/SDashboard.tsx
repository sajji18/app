"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/_components/Card";
import Chat from "@/_components/Chat";
import Link from "next/link";
import axios from "axios";

const Dashboard = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Bhujodi Cotton Stole: Red and Black",
            price: "3,200.00",
            description:
                "Handwoven in Bhujodi, India's first GI-conferred village. Features extra-weft designs on a traditional 4-shaft pit loom. Cotton warp and kala cotton weft, crafted by Meghwal Weavers of Kutch.",
            image: "/img1.jpg",
            specifications: [
                { key: "Colour", value: "Red and Black" },
                {
                    key: "Technique",
                    value: "Extra-weft hand weaving on a pit loom, with cotton warp, and kala cotton weft",
                },
                {
                    key: "Materials",
                    value: "Warp: Cotton, Weft: Cotton, Extra Weft: Cotton",
                },
                { key: "Dimension", value: "23in x 80in / 58cm x 203cm" },
                { key: "SKU", value: "DAKU-22-112-ST" },
                { key: "Care Instruction", value: "Dry Clean Only" },
                {
                    key: "Disclaimer",
                    value: "Meticulously handmade by master artisans. Slight variations may occur, making each piece truly one of a kind.",
                },
            ],
        },
        {
            id: 2,
            name: "Beaded Necklace: Red and Black",
            price: "2,000.00",
            description:
                "Decorative necklace with green and yellow patterns on a white background. Created by Pradipta, a fiber artist from Odisha, as part of a craft revival project at the Living and Learning Design Centre (LLDC), Kutch.",
            image: "/img2.jpg",
            specifications: [
                {
                    key: "Colour",
                    value: "Red and Black",
                },
                {
                    key: "Materials",
                    value: "Delicate glass beads, seed beads and thread",
                },
                {
                    key: "Dimension",
                    value: "14 inches centre length",
                },
            ],
        },
        {
            id: 3,
            name: "Madhubani Art | Dasavatar",
            price: "15,000.00",
            description:
                "Madhubani artist Moti Satyanarayan Karn, continuing the legacy of her late husband Satyanarayan, creates exquisite Dasavatar paintings. Satyanarayan, a fourth-generation artist from Madhubani, Bihar, learned the art from his mother Jagdamba Devi, the first Madhubani painter to receive a Padmashree. Moti carries forward this rich artistic tradition with unique contributions to the craft.",
            image: "/img3.jpg",
            specifications: [
                {
                    key: "Artist",
                    value: "Moti Satyanarayan Karn",
                },
                {
                    key: "Origin",
                    value: "Madhubani, Bihar",
                },
                {
                    key: "Style",
                    value: "Dasavatar Madhubani Painting",
                },
                {
                    key: "Lineage",
                    value: "Fourth-generation artist, learned from mother-in-law Jagdamba Devi",
                },
                {
                    key: "Recognition",
                    value: "National award winner (2001)",
                },
            ],
        },
    ]);

    const [isOpen, setIsOpen] = useState(false);
    const [telegramModal, setTelegramModal] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
    });

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.post("https://api.example.com/data", {
                body: JSON.stringify({ key: "value" }),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.data;
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // setProducts([...products, { id: Date.now(), ...form }]);
        setForm({ name: "", description: "", price: "", image: "" });
        setIsOpen(false);
    };

    return (
        <div className="mt-30 px-10">
            <h2 className="text-2xl font-medium text-[#6a1903]">My Products</h2>

            <div className="flex w-full justify-center">
                <div className="inline-flex justify-center items-center mb-6 text-[#6a1903] bg-[#F9E9D9] p-4 rounded-lg">
                    You can now add products from Telegram.&nbsp;
                    <span
                        onClick={() => setTelegramModal(true)}
                        className="underline cursor-pointer font-semibold hover:text-[#aa3410]"
                    >
                        Check Out!
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
                {/* Create Card */}
                <div
                    onClick={() => setIsOpen(true)}
                    className="border border-[#6a1903] rounded-xl shadow-md p-6 flex items-center justify-center text-white font-semibold text-lg transition-transform transform hover:scale-105 hover:bg-[#f1d5cc] cursor-pointer"
                >
                    <span className="text-[#6a1903]">+ Create</span>
                </div>

                {/* Product Cards */}
                {products.map((p) => (
                    <Link key={p.id} href={`/product/${p.id}?seller=true`}>
                        <ProductCard
                            image={p.image}
                            name={p.name}
                            price={p.price}
                            description={p.description}
                        />
                    </Link>
                ))}
            </div>

            {/* Add Product Modal */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
                    >
                        <h3 className="text-xl font-semibold mb-4 text-[#6a1903]">
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
                                    className="px-4 py-2 rounded-lg border border-[#6a1903] hover:bg-gray-100 text-[#6a1903] cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#6a1903] text-white rounded-lg hover:opacity-90 cursor-pointer"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Telegram QR Modal */}
            {telegramModal && (
                <div
                    onClick={() => setTelegramModal(false)}
                    className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center"
                    >
                        <h3 className="text-xl font-semibold mb-4 text-[#6a1903]">
                            Scan the QR Below
                        </h3>
                        <img
                            src="/qr.jpg"
                            alt="Telegram QR"
                            className="mx-auto w-80 h-100 rounded-xl"
                        />
                        <div className="mt-4 flex flex-col">
                            <Link
                                href="https://t.me/CraftsBuddyBot"
                                target="_blank"
                            >
                                <span className="underline cursor-pointer font-semibold hover:text-[#aa3410]">
                                    https://t.me/CraftsBuddyBot
                                </span>
                            </Link>
                            <button
                                onClick={() => setTelegramModal(false)}
                                className="mt-4 px-4 py-2 bg-[#6a1903] text-white rounded-lg hover:opacity-90 cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
