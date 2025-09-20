"use client";
import { useState } from "react";
import ProductCard from "@/_components/Card";
import Chat from "@/_components/Chat";
import Link from "next/link";

const searchIcon = "/search-icon.png";
const shorts = [
    {
        id: 1,
        title: "Craft Short 1",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "img1.jpg",
    },
    {
        id: 2,
        title: "Craft Short 2",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        thumbnail: "img2.jpg",
    },
    {
        id: 3,
        title: "Craft Short 3",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        thumbnail: "img3.jpg",
    },
];

const BDashboard = () => {
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
        // setProducts([...products, { id: Date.now(), ...form }]);
        setForm({ name: "", description: "", price: "", image: "" });
        setIsOpen(false);
    };

    return (
        <div className="mt-30 px-10">
            <div className="flex flex-col items-center mb-6">
                {/* Search Bar */}
                <div className="flex items-center relative">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="bg-white border border-gray-300 rounded-lg py-2 px-4 w-150 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <img
                        src={searchIcon}
                        alt="Search"
                        className="w-5 h-5 absolute right-3 top-2.5 transition cursor-pointer hover:opacity-70"
                    />
                </div>
                <div className="flex w-full items-center">
                    <h2 className="text-xl font-semibold">Listed Products</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {products.map((p) => (
                    <Link key={p.id} href={`/product/${p.id}`}>
                        <ProductCard
                            image={p.image}
                            name={p.name}
                            price={p.price}
                            description={p.description}
                        />
                    </Link>
                ))}
            </div>
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Craft Shorts</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {shorts.map((s) => (
                        <Link key={s.id} href={`/shorts/${s.id}`}>
                            <div
                                className="w-48 h-80 flex-shrink-0 rounded-xl overflow-hidden bg-black cursor-pointer relative"
                                style={{
                                    backgroundImage: `url(${s.thumbnail})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <video
                                    src={s.video}
                                    className="w-full h-full object-cover transition-opacity duration-300"
                                    muted
                                    loop
                                    playsInline
                                    onMouseEnter={(e) => {
                                        const video = e.currentTarget;
                                        video.style.opacity = "1";
                                        video.play();
                                    }}
                                    onMouseLeave={(e) => {
                                        const video = e.currentTarget;
                                        video.pause();
                                        video.currentTime = 0;
                                        video.style.opacity = "0";
                                    }}
                                    style={{
                                        opacity: 0,
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                    }}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Chat />
        </div>
    );
};

export default BDashboard;
