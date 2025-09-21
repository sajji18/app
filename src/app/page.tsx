"use client";

import Navbar from "@/_components/Navbar";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const shortsIcon = "/shorts-icon.png";
const searchIcon = "/search-icon.png";
const shorts = [
    {
        id: 1,
        title: "Craft Short 2",
        video: "/vid2.mp4",
        thumbnail: "img2.jpg",
        description:
            "Decorative necklace with green and yellow patterns on a white background. Created by Pradipta, a fiber artist from Odisha, as part of a craft revival project.",
    },
    {
        id: 2,
        title: "Craft Short 3",
        video: "/vid3.mp4",
        thumbnail: "img3.jpg",
        description:
            "Madhubani artist Moti Satyanarayan Karn creates exquisite Dasavatar paintings, continuing a fourth-generation artistic legacy from Madhubani, Bihar.",
    },
    {
        id: 3,
        title: "Craft Short 1",
        video: "/vid1.mp4",
        thumbnail: "img1.jpg",
        description:
            "Handwoven in Bhujodi, India's first GI-conferred village. Cotton warp and kala cotton weft, crafted by Meghwal Weavers of Kutch.",
    },
    {
        id: 4,
        title: "Craft Short 4",
        video: "/vid2.mp4",
        thumbnail: "img5.jpg",
        description:
            "Decorative necklace with green and yellow patterns on a white background. Created by Pradipta, a fiber artist from Odisha, as part of a craft revival project.",
    },
    {
        id: 5,
        title: "Craft Short 5",
        video: "/vid3.mp4",
        thumbnail: "img4.jpg",
        description:
            "Vibrant hand-block printed patterns inspired by traditional Indian motifs, brought to life in a modern, playful style.",
    },
    {
        id: 6,
        title: "Craft Short 6",
        video: "/vid3.mp4",
        thumbnail: "img3.jpg",
        description:
            "Exquisite embroidery work showcasing intricate cultural designs, highlighting the skill and heritage of master artisans.",
    },
];

const products = [
    {
        id: 1,
        name: "Bhujodi Cotton Stole: Red and Black",
        price: "3,200.00",
        description:
            "Handwoven in Bhujodi, India's first GI-conferred village. Features extra-weft designs on a traditional 4-shaft pit loom. Cotton warp and kala cotton weft, crafted by Meghwal Weavers of Kutch.",
        image: "/img1.jpg",
    },
    {
        id: 2,
        name: "Beaded Necklace: Red and Black",
        price: "2,000.00",
        description:
            "Decorative necklace with green and yellow patterns on a white background. Created by Pradipta, a fiber artist from Odisha.",
        image: "/img2.jpg",
    },
    {
        id: 3,
        name: "Madhubani Art | Dasavatar",
        price: "15,000.00",
        description:
            "Madhubani artist Moti Satyanarayan Karn creates exquisite Dasavatar paintings.",
        image: "/img3.jpg",
    },
    {
        id: 5,
        name: "Vintage Vaghad Rajput Vintage Embroidered Chakla Cushion Cover",
        price: "1,100.00",
        description:
            "Vintage 'chakla' squares from Gujarat homes, converted into cushion covers for urban homes. Each piece represents cultural identity and is hand-embroidered by Ahir, Rabari, Sodha Rajput, and Meghwal women. Truly one-of-a-kind.",
        image: "/img5.jpg",
    },
];

export default function Home() {
    const { token, role } = useAuth();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (token && role) {
            role === "seller"
                ? (window.location.href = "/sdashboard")
                : (window.location.href = "/bdashboard");
        }
        setLoaded(true);
    }, []);

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section
                className="relative w-full h-[100vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('/hero-bg.jpg')" }}
            >
                <div
                    className={`bg-opacity-50 p-8 rounded-lg text-center text-white transform transition-all duration-1000 ${
                        loaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Discover Unique Handcrafted Art
                    </h1>
                    <p className="text-lg md:text-2xl">
                        Explore authentic products crafted by talented artisans
                        from across India
                    </p>
                </div>
            </section>

            {/* Trending Products */}
            <section className="my-16 px-6 md:px-16">
                <hr className="my-10 border-gray-300" />
                <h2
                    className={`text-2xl font-semibold mb-6 transform transition-all duration-1000 delay-200 ${
                        loaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}
                >
                    Trending Products
                </h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
                    {products.map((p, i) => (
                        <div
                            key={p.id}
                            className={`w-[300px] bg-white rounded-xl shadow-lg flex-shrink-0 p-3 transform transition-all duration-1000 delay-${
                                300 + i * 100
                            } ${
                                loaded
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            }`}
                        >
                            <div className="relative w-full h-48 mb-3">
                                <Image
                                    src={p.image}
                                    alt={p.name}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <h3 className="font-bold text-md mb-1 truncate">
                                {p.name}
                            </h3>
                            <p className="text-gray-600 mb-1 text-sm">
                                ₹{p.price}
                            </p>
                            <p className="text-xs text-gray-500">
                                {p.description.length > 80
                                    ? p.description.slice(0, 80) + "..."
                                    : p.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="my-16 px-6 md:px-16">
                <hr className="my-10 border-gray-300" />
                <div className="mt-10">
                    <div className="mt-10 flex items-center gap-2 mb-4">
                        <img
                            src={shortsIcon}
                            alt="Shorts Icon"
                            className="w-6 h-6"
                        />
                        <h2 className="text-xl font-semibold text-[#6a1903]">
                            Craft Shorts
                        </h2>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {shorts.map((s) => (
                            <Link key={s.id} href={`/shorts/${s.id}`}>
                                <div className="w-48 flex-shrink-0 cursor-pointer">
                                    <div
                                        className="h-80 rounded-xl overflow-hidden bg-black relative"
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
                                    <p className="mt-1 text-md font-semibold text-[#6a1903] line-clamp-2">
                                        {s.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <hr className="my-10 border-gray-300" />
            </section>

            {/* Footer */}
            <footer className="bg-[#F9E9D9] text-[#6a1903] py-8 mt-16 text-center">
                &copy; {new Date().getFullYear()} CraftBuddy. All rights
                reserved.
            </footer>
        </>
    );
}
