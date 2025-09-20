import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    onIdTokenChanged,
    User,
} from "firebase/auth";
import { auth } from "./config";

export const loginWithGoogle = async (): Promise<User | null> => {
    try {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: "select_account consent",
            include_granted_scopes: "true",
        });
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Google login failed", error);
        return null;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout failed", error);
    }
};

/**
 * Subscribe to auth changes
 * @param callback - gets called with Firebase user or null
 */
export const subscribeToAuthChanges = (
    callback: (user: User | null) => void
) => {
    const authenticationCallback = async (user: User | null) => {
        if (user) {
            // Optionally: get ID token if you need it for your backend
            // const token = await user.getIdToken();
            callback(user);
        } else {
            callback(null);
        }
    };

    const unsubscribeAuth = onAuthStateChanged(auth, authenticationCallback);
    const unsubscribeToken = onIdTokenChanged(auth, authenticationCallback);

    return () => {
        unsubscribeAuth();
        unsubscribeToken();
    };
};
