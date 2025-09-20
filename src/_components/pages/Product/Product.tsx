"use client";
import { useState } from "react";
import ProductCard from "@/_components/Card";

type Product = {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
    specifications?: {
        key: string;
        value: string;
    }[];
};

const Product = ({
    product,
    isSeller = false,
}: {
    product: Product;
    isSeller?: boolean;
}) => {
    const [editableProduct, setEditableProduct] = useState(product);
    const [message, setMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        key?: string
    ) => {
        setMessage("");
        if (key) {
            const updatedSpecs = editableProduct.specifications?.map((spec) =>
                spec.key === key ? { ...spec, value: e.target.value } : spec
            );
            setEditableProduct({
                ...editableProduct,
                specifications: updatedSpecs,
            });
        } else {
            setEditableProduct({
                ...editableProduct,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleUpdate = () => {
        console.log("Updated product:", editableProduct);
        setMessage("Product updated successfully!");
    };

    return (
        <div className="mt-30 mb-10 px-4 sm:px-10 flex flex-col items-center">
            <div className="flex w-full mb-6 text-gray-600 text-sm">
                <span className="text-lg">
                    <a href="/">Home</a> /{" "}
                    <a href="/bdashboard">All Products</a> /{" "}
                    {editableProduct.name}
                </span>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-10">
                {/* Image Container */}
                <div className="w-full lg:w-[45%] pr-0 lg:pr-10 mb-4 lg:mb-0">
                    <div className="relative aspect-square w-full border border-gray-300 overflow-hidden mb-4">
                        <img
                            src={editableProduct.image}
                            alt="Product Image"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {isSeller && (
                        <div className="flex flex-col gap-2">
                            <label className="w-full border border-[#6a1903] text-[#6a1903] bg-white py-3 px-6 font-medium rounded-md hover:bg-[#bea097] hover:text-white transition cursor-pointer text-center">
                                Upload Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const url =
                                                URL.createObjectURL(file);
                                            setEditableProduct({
                                                ...editableProduct,
                                                image: url,
                                            });
                                        }
                                    }}
                                />
                            </label>
                            <button
                                onClick={handleUpdate}
                                className="w-full bg-[#6a1903] text-white py-3 px-6 font-medium rounded-md hover:bg-[#310c02] transition cursor-pointer"
                            >
                                Update
                            </button>
                            {message && (
                                <p className="mt-2 text-[#aa3410] font-semibold">
                                    {message}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="w-full lg:w-[55%] flex flex-col gap-4">
                    {/* Name */}
                    {isSeller ? (
                        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-2">
                            <span className="text-xl font-semibold text-[#6a1903]">
                                Name:{" "}
                            </span>
                            <input
                                type="text"
                                name="name"
                                value={editableProduct.name}
                                onChange={handleChange}
                                className="text-2xl font-medium mb-2 border p-1 rounded flex-1 text-gray-700"
                            />
                        </div>
                    ) : (
                        <h2 className="text-2xl font-medium mb-6 text-[#6a1903]">
                            {editableProduct.name}
                        </h2>
                    )}

                    {/* Price */}
                    {isSeller ? (
                        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-2">
                            <span className="text-xl font-semibold text-[#6a1903]">
                                Price:{" "}
                            </span>
                            <input
                                type="text"
                                name="price"
                                value={editableProduct.price}
                                onChange={handleChange}
                                className="text-2xl font-semibold border p-1 rounded w-full sm:w-40 text-gray-700"
                            />
                        </div>
                    ) : (
                        <p className="text-2xl font-semibold">
                            Rs. {editableProduct.price}
                        </p>
                    )}

                    {/* Add to cart / Buy */}
                    {!isSeller && (
                        <div className="flex flex-col w-full mt-6 gap-4">
                            <button className="w-full border border-[#6a1903] text-[#6a1903] bg-white py-3 px-6 font-medium rounded-md hover:bg-[#bea097] hover:text-white transition cursor-pointer">
                                Add to Cart
                            </button>
                            <button className="w-full bg-[#6a1903] text-white py-3 px-6 font-medium rounded-md hover:bg-[#310c02] transition cursor-pointer">
                                Buy it Now
                            </button>
                        </div>
                    )}

                    <hr className="mt-8 mb-5 w-full bg-gray-200" />

                    {/* Description */}
                    {isSeller ? (
                        <div className="flex flex-col w-full">
                            <span className="text-xl font-semibold mb-2 text-[#6a1903]">
                                Description:
                            </span>
                            <textarea
                                name="description"
                                value={editableProduct.description}
                                onChange={handleChange}
                                className="w-full border p-2 rounded text-gray-700"
                                rows={4}
                            />
                        </div>
                    ) : (
                        <p className="text-[#6a1903] mb-4">
                            {editableProduct.description}
                        </p>
                    )}

                    {/* Specifications */}
                    {editableProduct.specifications && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {editableProduct.specifications.map((spec) => (
                                <div key={spec.key}>
                                    {isSeller ? (
                                        <>
                                            <h4 className="text-xl font-semibold text-[#6a1903]">
                                                {spec.key}:
                                            </h4>
                                            <textarea
                                                value={spec.value}
                                                onChange={(e) =>
                                                    handleChange(e, spec.key)
                                                }
                                                className="w-full border p-1 rounded text-gray-700"
                                                rows={2}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <h4 className="font-semibold">
                                                {spec.key}
                                            </h4>
                                            <p className="text-[#6a1903]">
                                                {spec.value}
                                            </p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
