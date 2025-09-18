"use client";
import { useState } from "react";

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<
        { sender: "user" | "ai"; text: string }[]
    >([]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        const userMessage = { sender: "user" as const, text: input };
        setMessages((prev) => [...prev, userMessage]);

        // dummy response for now, will replace later
        const aiReply = { sender: "ai" as const, text: `You said: ${input}` };
        setMessages((prev) => [...prev, aiReply]);

        setInput("");
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-50 cursor-pointer"
            >
                💬
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden z-50">
                    <div className="bg-black text-white px-4 py-2 flex justify-between items-center">
                        <span className="font-medium">AI Assistant</span>
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
                                            ? "bg-black text-white"
                                            : "bg-gray-200 text-gray-900"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
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
                            className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
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
