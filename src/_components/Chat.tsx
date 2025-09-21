"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

const cityArt: Record<string, string[]> = {
    jaipur: [
        "https://www.artzolo.com/cdn/shop/files/the-hawa-maha-jaipur-artzolo-com.jpg?v=1715703501&width=600",
        "https://img.artpal.com/12424/9-15-8-31-9-27-15m.jpg",
        "https://www.mediastorehouse.com/p/467/india-rajasthan-jaipur-city-palace-13918673.jpg.webp",
    ],
    sandals: [
        "data:image/jpeg;base64,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",
        "data:image/jpeg;base64,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",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRODRM1-0WCE0L3FiwowK6r3gHz9n5zCd4maw&s",
    ],
};

type Message = {
    sender: "ai" | "user";
    content: string | React.JSX.Element;
};

const Chat = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const hasVisited = localStorage.getItem("buyerVisited");
        if (!hasVisited) {
            setIsOpen(true);

            const greeting: Message = {
                sender: "ai",
                content: "Hi! How may I help you today?",
            };

            setMessages([greeting]);
            localStorage.setItem("buyerVisited", "true");
            setTimeout(scrollToBottom, 100);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            const greeting: Message = {
                sender: "ai",
                content: `Hi! 👋 Welcome to CraftBuddy – your gateway to unique, handcrafted treasures. 
Browse our collections or simply type your query in the box and I'll help you find the perfect artisan product! 🎨`,
            };
            setMessages((prev) => [...prev, greeting]);
            setTimeout(scrollToBottom, 100);
        } else {
            setMessages([]);
        }
    }, [isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;
        const userMessage = { sender: "user" as const, content: input };
        setMessages((prev) => [...prev, userMessage]);

        const city = input.toLowerCase().includes("jaipur")
            ? "jaipur"
            : input.toLowerCase().includes("sandals")
            ? "sandals"
            : null;

        let aiMessage: Message;

        if (city && cityArt[city]) {
            const images = cityArt[city];
            aiMessage = {
                sender: "ai",
                content: (
                    <div>
                        <p>
                            Here are related results for{" "}
                            {city === "jaipur"
                                ? "Paintings from Jaipur"
                                : "Sandals"}
                            :
                        </p>
                        <div className="flex gap-2 mt-2 mb-2 overflow-x-auto">
                            {images.map((src, i) => (
                                <div
                                    key={i}
                                    className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden"
                                >
                                    <img
                                        src={src}
                                        alt={`Art ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 mt-1">
                            <button
                                onClick={() => router.push("/bdashboard")}
                                className="cursor-pointer flex-1 bg-[#ED957A] text-white px-2 py-1 rounded-lg hover:bg-[#6a1903] transition"
                            >
                                See Similar Products
                            </button>
                            <button
                                onClick={() => router.push("/shorts/1")}
                                className="cursor-pointer flex-1 bg-[#ED957A] text-white px-2 py-1 rounded-lg hover:bg-[#6a1903] transition"
                            >
                                Related Shorts
                            </button>
                        </div>
                    </div>
                ),
            };
        } else {
            aiMessage = { sender: "ai", content: `You said: ${input}` };
        }

        setMessages((prev) => [...prev, aiMessage]);
        setInput("");

        // Scroll after state updates
        setTimeout(scrollToBottom, 100);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#ED957A] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-50 cursor-pointer"
            >
                💬
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-200 h-120 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden z-50">
                    <div className="bg-[#ED957A] text-white px-4 py-2 flex justify-between items-center">
                        <span className="font-medium">
                            CraftBuddy Assistant
                        </span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-white transition cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${
                                    msg.sender === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`px-3 py-2 rounded-lg w-fit max-w-[75%] break-words ${
                                        msg.sender === "user"
                                            ? "bg-[#6a1903] text-white"
                                            : "bg-gray-200 text-gray-900"
                                    }`}
                                >
                                    {typeof msg.content === "string"
                                        ? msg.content
                                        : msg.content}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 border-t flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-[#ED957A] text-white px-4 py-2 rounded-lg hover:bg-[#6a1903] transition cursor-pointer"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chat;
