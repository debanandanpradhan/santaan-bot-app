import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
const API_BASE_URL = "https://santaan-bot-app-backend.onrender.com";

export const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

// ✅ Add sendChatMessage function
export const sendChatMessage = async (message) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/query/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: message }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch chatbot response");
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Chatbot error:", error);
        return "Error: Unable to get a response from the chatbot.";
    }
};
