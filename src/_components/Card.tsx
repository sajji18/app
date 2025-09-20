"use client";
import Image from "next/image";

interface CardProps {
    image: string;
    name: string;
    price: string;
    description: string;
    specifications?:
        | {
              key: string;
              value: string;
          }[]
        | undefined;
}

const Card = ({
    image,
    name,
    price,
    description,
    specifications,
}: CardProps) => {
    return (
        <div className="bg-white rounded-xl shadow-md transition-transform transform hover:scale-105 cursor-pointer">
            <div className="relative aspect-square w-full mb-3">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover rounded-md"
                />
            </div>
            <div className="bg-[#ED957A] p-4 rounded-b-xl">
                <h3 className="text-lg font-semibold text-[#6a1903]">{name}</h3>
                <p className="text-[#6a1903] text-sm truncate">{description}</p>
                <p className="text-[#6a1903] font-medium mt-2">{price}</p>
            </div>
        </div>
    );
};

export default Card;
