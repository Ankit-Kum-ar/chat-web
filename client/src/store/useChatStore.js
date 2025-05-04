import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get('/message/users')
            set({ users: res.data.users});
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error(error.response?.data?.message || error.message || "Failed to fetch users.");
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            // console.log("Fetched messages:", res.data);
            set({ messages: res.data.messages });
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error(error.response?.data?.message || error.message || "Failed to fetch messages.");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (data) => {
        const { selectedUser, messages } = get(); // get used to access the current state 
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, data);
            // console.log(messages);
            set({ messages: [...messages, res.data.newMessage] }); // Append the new message to the existing messages
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(error.response?.data?.message || error.message || "Failed to send message.");
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return; // If no user is selected, do nothing

        const socket = useAuthStore.getState().socket; // Get the socket from the auth store
        socket.on("newMessage", (newMessage) => {
            if (newMessage.senderId !== selectedUser._id) return; // Ignore messages not from the selected user
            // console.log("New message received:", newMessage);
            set({
                messages: [...get().messages, newMessage], // Append the new message to the existing messages
            })
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket; // Get the socket from the auth store
        socket.off("newMessage"); // Unsubscribe from the newMessage event
    },

    setSelectedUser: (selectedUser) => set({ selectedUser}),
}));