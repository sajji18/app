"use client";
import Image from "next/image";

interface CardProps {
    image: string;
    name: string;
    price: string;
    description: string;
}

const Card = ({ image, name, price, description }: CardProps) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 transition-transform transform hover:scale-105 cursor-pointer">
            <div className="relative aspect-square w-full mb-3">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover rounded-md"
                />
            </div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-gray-600 text-sm truncate">{description}</p>
            <p className="text-black font-medium mt-2">{price}</p>
        </div>
    );
};

export default Card;
