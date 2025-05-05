import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client"; // Import socket.io client

const BASE_URL = import.meta.env.VITE_BASE_URL; // Base URL for the API

export const useAuthStore = create((set ,get) => ({ // get is used to access the state of the store and set is used to update the state of the store
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    isCheckingAuth: true,

    checkAuth: async () => {
        // set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get("/auth/check-auth");  
            // console.log("Auth check response:", res.data.user);          
            set({ authUser: res.data.user });
            get().connectSocket(); // Call connectSocket after successful auth check
        } catch (error) {
            console.error("Error checking auth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (userData) => {
        set({ isSigninUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", userData);
            // console.log("Sign up response:", res.data.user);
            set({ authUser: res.data.user});
            toast.success("Account created successfully!");
            get().connectSocket(); // Call connectSocket after successful signup
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Error creating account. Please try again.");
        } finally {
            set({ isSigninUp: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully!");
            get().disconnectSocket(); // Call disconnectSocket after successful logout
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Error logging out. Please try again.");
        }
    },

    login: async (userData) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", userData);
            set({ authUser: res.data });
            toast.success("Logged in successfully!");
            // get().checkAuth(); // Call checkAuth to refresh the authUser state
            get().connectSocket(); // Call connectSocket after successful login
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Error logging in. Please try again.");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    updateProfile: async (profileData) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", profileData);
            set({ authUser: res.data.user });
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.log(error.message);            
            toast.error(
                error.response?.data?.message || error.message || "An unexpected error occurred. Please try again."
            );
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get(); // Get the current authUser from the store
        if (!authUser || get().socket?.connected) return; // If not authenticated, don't connect to the socket

        const socket = io(BASE_URL, {
            query: { userId: authUser._id }, // Pass the userId as a query parameter
        })
        socket.connect(); // Connect to the socket server
        set({ socket: socket }); // Store the socket in the Zustand store

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds }); // Update the onlineUsers state in the store
        })
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect(); // Disconnect the socket if it's connected
    },
}))