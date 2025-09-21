"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Navbar from "@/_components/Navbar";

const shorts = [
    {
        id: 1,
        video: "/vid2.mp4",
    },
    {
        id: 2,
        video: "/vid3.mp4",
    },
    {
        id: 3,
        video: "/vid1.mp4",
    },
    {
        id: 4,
        video: "/vid2.mp4",
    },
    {
        id: 5,
        video: "/vid3.mp4",
    },
    {
        id: 6,
        video: "/vid3.mp4",
    },
];

export default function ShortsPage() {
    const { id } = useParams();
    const router = useRouter();
    const currentIndex = shorts.findIndex((s) => s.id === Number(id));

    const isScrolling = useRef(false);

    const goTo = (index: number) => {
        if (index >= 0 && index < shorts.length) {
            router.push(`/shorts/${shorts[index].id}`);
        }
    };

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isScrolling.current) return;
            isScrolling.current = true;

            if (e.deltaY > 0) goTo(currentIndex + 1);
            else if (e.deltaY < 0) goTo(currentIndex - 1);

            setTimeout(() => {
                isScrolling.current = false;
            }, 600);
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [currentIndex]);

    if (currentIndex === -1) return <div>Short not found</div>;

    return (
        <>
            <Navbar />
            <div className="relative flex justify-center items-center min-h-[calc(100vh-64px)] px-4 mt-16">
                {/* Short Video */}
                <video
                    src={shorts[currentIndex].video}
                    className="rounded-xl shadow-lg h-[80vh] w-[45vh] object-cover"
                    controls
                    autoPlay
                    loop
                />

                {/* Navigation Buttons */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                    {currentIndex > 0 && (
                        <button
                            onClick={() => goTo(currentIndex - 1)}
                            className="bg-white text-black px-3 py-2 rounded-lg shadow hover:bg-gray-200 transition cursor-pointer"
                        >
                            ↑ Prev
                        </button>
                    )}
                    {currentIndex < shorts.length - 1 && (
                        <button
                            onClick={() => goTo(currentIndex + 1)}
                            className="bg-white text-black px-3 py-2 rounded-lg shadow hover:bg-gray-200 transition cursor-pointer"
                        >
                            ↓ Next
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
