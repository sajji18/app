"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ---- Dummy backend functions ----
const signupSeller = async (mobile: string) => {
    return { success: true };
};

const completeOnboarding = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    shopName: string;
    address: string;
}) => {
    return { success: true };
};

const loginSeller = async (mobile: string) => {
    // TODO: Call backend login
    return { success: true };
};

// ---- Components ----
const MobileStep = ({ onNext }: { onNext: (mobile: string) => void }) => {
    const [mobile, setMobile] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await signupSeller(mobile);
        if (response.success) {
            onNext(mobile);
        } else {
            alert("Signup failed. Try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your Mobile Number"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
            />
            <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer"
            >
                Continue
            </button>
        </form>
    );
};

const OnboardingStep = ({ mobile }: { mobile: string }) => {
    const router = useRouter();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        shopName: "",
        address: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await completeOnboarding({ ...form });
        if (response.success) {
            router.push("/sdashboard");
        } else {
            alert("Onboarding failed. Try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name="firstName"
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
            />
            <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
            />
            <input
                name="shopName"
                type="text"
                placeholder="Your Shop Name?"
                value={form.shopName}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
            />
            <input
                name="address"
                type="text"
                placeholder="How to reach you?"
                value={form.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
            />

            <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer"
            >
                Finish & Go to Dashboard
            </button>
        </form>
    );
};

const sendOtp = async (mobile: string) => {
    console.log("Sending OTP to:", mobile);
    return { success: true };
};

const verifyOtp = async (mobile: string, otp: string) => {
    console.log("Verifying OTP:", otp, "for mobile:", mobile);
    return { success: true };
};

const LoginStep = () => {
    const router = useRouter();
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"mobile" | "otp">("mobile");

    const handleMobileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await sendOtp(mobile);
        if (res.success) {
            setStep("otp");
        } else {
            alert("Failed to send OTP. Try again.");
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await verifyOtp(mobile, otp);
        if (res.success) {
            router.push("/sdashboard");
        } else {
            alert("Invalid OTP. Try again.");
        }
    };

    return (
        <>
            {step === "mobile" ? (
                <form onSubmit={handleMobileSubmit} className="space-y-4">
                    <input
                        type="tel"
                        placeholder="Enter Mobile Number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer"
                    >
                        Continue
                    </button>
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer"
                    >
                        Verify & Login
                    </button>
                </form>
            )}
        </>
    );
};

const Seller = () => {
    const [mode, setMode] = useState<"new" | "existing">("new");
    const [step, setStep] = useState<"mobile" | "onboarding">("mobile");
    const [mobile, setMobile] = useState("");

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-sm">
                {/* Switch Buttons */}
                <div className="flex justify-between mb-6">
                    <button
                        className={`flex-1 py-2 rounded-lg font-medium cursor-pointer ${
                            mode === "new"
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-600"
                        }`}
                        onClick={() => {
                            setMode("new");
                            setStep("mobile");
                        }}
                    >
                        Become a Seller
                    </button>
                    <button
                        className={`flex-1 py-2 rounded-lg font-medium cursor-pointer ${
                            mode === "existing"
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-600"
                        }`}
                        onClick={() => {
                            setMode("existing");
                            setStep("mobile");
                        }}
                    >
                        Already a Seller
                    </button>
                </div>

                <h2 className="text-2xl font-medium text-center mb-6">
                    {mode === "new"
                        ? step === "mobile"
                            ? "Signup as Seller"
                            : "Complete Onboarding"
                        : "Login as Seller"}
                </h2>

                {mode === "new" ? (
                    step === "mobile" ? (
                        <MobileStep
                            onNext={(m) => {
                                setMobile(m);
                                setStep("onboarding");
                            }}
                        />
                    ) : (
                        <OnboardingStep mobile={mobile} />
                    )
                ) : (
                    <LoginStep />
                )}
            </div>
        </div>
    );
};

export default Seller;
