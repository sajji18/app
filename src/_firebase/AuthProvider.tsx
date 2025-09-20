import { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
    loginWithGoogle,
    logout,
    subscribeToAuthChanges,
} from "./helpers/auth";

const AuthContext = createContext<{
    user: User | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}>({
    user: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges(setUser);
        return unsubscribe;
    }, []);

    const login = async () => {
        const u = await loginWithGoogle();
        setUser(u);
        router.push("/bdashboard");
    };

    const signOut = async () => {
        await logout();
        setUser(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout: signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
