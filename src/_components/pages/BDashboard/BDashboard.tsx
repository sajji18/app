"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/_components/Card";
import Chat from "@/_components/Chat";
import Link from "next/link";
import axios from "axios";

type Product = {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    specifications?:
        | {
              key: string;
              value: string;
          }[]
        | undefined;
};

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

const shortsIcon = "/shorts-icon.png";

const BDashboard = () => {
    const [products, setProducts] = useState<Product[]>([
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
        {
            id: 4,
            name: "Mita Parekh's Block Printed Silk Stole: Turquoise",
            price: "750.00",
            description:
                "Mita Parekh's Originals are defined by 'the traditional made contemporary' look. In 1974 Mita introduced the first ‘designer’ block printed coordinates and sarees in Bombay, using her signature wood block patterns and fresh colour palette. Limited edition experimentation with 'discharge' block-printing.",
            image: "/img4.jpg",
            specifications: [
                { key: "Colour", value: "Blue and Green" },
                { key: "Materials", value: "Silk" },
                { key: "SKU", value: "MIPA-24-ST-6-TUR" },
                { key: "Dimension", value: "69 X 20 INCH" },
            ],
        },
        {
            id: 5,
            name: "Vintage Vaghad Rajput Vintage Embroidered Chakla Cushion Cover",
            price: "1,100.00",
            description:
                "Vintage 'chakla' squares from Gujarat homes, converted into cushion covers for urban homes. Each piece represents cultural identity and is hand-embroidered by Ahir, Rabari, Sodha Rajput, and Meghwal women. Truly one-of-a-kind.",
            image: "/img5.jpg",
            specifications: [
                { key: "Colour", value: "Multicolour" },
                {
                    key: "Technique",
                    value: "Hand embroidery, mirror work, square chain, interlaced, herringbone, detached chain, couched, button hole",
                },
                {
                    key: "Materials",
                    value: "Printed and plain cotton cloth, cotton threads, wool, handmade mirrors",
                },
                { key: "Dimension", value: "16in x 16in / 40cm x 40cm" },
                { key: "SKU", value: "RKP-21-1-CC" },
                { key: "Care Instruction", value: "Dry Clean Only" },
                {
                    key: "Disclaimer",
                    value: "All our products are meticulously handmade by master artisans one piece at a time. Slight variations may occur, making each piece unique.",
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

    // const getProducts = async () => {
    //     try {
    //         const response = await axios.get(
    //             "https://bb5f5d71d2b6.ngrok-free.app/api/catalog/products"
    //         );
    //         console.log("API response:", response);
    //         setProducts(response.data.products || []);
    //     } catch (err) {
    //         console.error("Error fetching products:", err);
    //     }
    // };

    // useEffect(() => {
    //     getProducts();
    //     console.log(products);
    // }, []);

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
                    <h2 className="text-xl font-semibold text-[#6a1903]">
                        Listed Products
                    </h2>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-4">
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
            <Chat />
        </div>
    );
};

export default BDashboard;
