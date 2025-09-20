"use client";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import Navbar from "@/_components/Navbar";
import Product from "@/_components/pages/Product/Product";

const products = [
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
];

const Page = () => {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const isSeller = searchParams.get("seller") === "true";

    const product = products.find((p) => p.id === Number(id));

    if (!product) return <div>Product not found</div>;

    return (
        <>
            <Navbar />
            <Product product={product} isSeller={isSeller} />
        </>
    );
};

export default Page;
