const Message = require("../models/message.model");
const User = require("../models/user.model");
const cloudinary = require("../lib/cloudinary");
const { getReceiverSocketId, io } = require("../lib/socket");

const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user.id; // Assuming you have the user ID in req.user

        // Find all users except the logged-in user
        const users = await User.find({ _id: { $ne: loggedInUserId } })
            .select("-password") // Exclude password field from the response
            .sort({ createdAt: -1 }); // Sort by creation date in descending order

        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found",
            });
        }

        // Send the list of users as a response
        res.status(200).json({
            message: "Users fetched successfully",
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}

const getMessages = async (req, res) => {
    try {
        const { id } = req.params; // This is ID of the user you want to get messages with 
        const loggedInUserId = req.user.id; // Assuming you have the user ID in req.user

        // Find all messages between the logged-in user and the specified user
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId, receiverId: id },
                { senderId: id, receiverId: loggedInUserId },
            ],
        })

        // Send the list of messages as a response
        res.status(200).json({
            message: "Messages fetched successfully",
            messages,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}

const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params; // This is ID of the user you want to send message to 
        const senderId = req.user.id; // Assuming you have the user ID in req.user
        const { text, image } = req.body; // Get the message text and image from the request body

        // Validate the input mtlb ek time pr text ya image hi ho
        if (!text && !image) {
            return res.status(400).json({
                message: "Please provide either text or image",
            });
        }

        let imageUrl = null;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            if (!uploadResponse || !uploadResponse.secure_url) {
                return res.status(500).json({
                    message: "Image upload failed",
                });
            }
            imageUrl = uploadResponse.secure_url; // Get the secure URL of the uploaded image
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl, // Save the image URL if an image was uploaded
        });

        // Save the message to the database
        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId); // Get the socket ID of the receiver
        if (receiverSocketId) {
            // Emit the message to the receiver
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json({
            message: "Message sent successfully",
            newMessage,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}

module.exports = {
    getUsersForSidebar,
    getMessages,
    sendMessage,
};