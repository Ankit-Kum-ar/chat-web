# 🚀 Chatty – Real-time Chat Web App

[![Deploy Backend](https://img.shields.io/badge/Backend-Render-blue?logo=render)](https://chatty-k1zj.onrender.com)
[![Deploy Frontend](https://img.shields.io/badge/Frontend-Render-green?logo=render)](https://chatter-5uwp.onrender.com)
[![React](https://img.shields.io/badge/React-2023-blue?logo=react)](https://react.dev/)
[![Socket.io](https://img.shields.io/badge/Socket.io-RealTime-ffca28?logo=socket.io)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)](https://mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-Frontend-FB7185?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/github/license/ankit/chat-web?color=blueviolet)](LICENSE)

---

<div align="center">
  <h2>Welcome to <span style="color:#6366f1;">Chatty</span>!</h2>
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3Z5d2F2d3J5b3V2d3F6d3l2d3F6d3l2d3F6d3l2d3F6d3l2/g9582DNuQppxC/giphy.gif" width="300" alt="Chat Animation" />
  <p>
    <b>Modern, full-stack chat app with real-time messaging, image sharing, and beautiful themes.</b>
  </p>
</div>

---

## ✨ Features

- ⚡ **Real-time Messaging** – Powered by Socket.io
- 🔒 **JWT Authentication** – Secure login & protected routes
- 🖼️ **Image Sharing** – Send images in chat
- 🎨 **Theme Switcher** – 25+ beautiful themes (DaisyUI)
- 🧑‍🤝‍🧑 **Online Status** – See who’s online
- 📝 **Profile & Settings** – Update avatar & preferences
- 🥷 **Guest Mode** – Try with demo credentials
- 📱 **Responsive Design** – Works on all devices

---

## 🛠️ Tech Stack

| Frontend         | Backend           | Database   | Real-time    | Auth      | Cloud Storage |
|------------------|-------------------|------------|--------------|-----------|--------------|
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react) | ![Express](https://img.shields.io/badge/-Express-000?logo=express) | ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb) | ![Socket.io](https://img.shields.io/badge/-Socket.io-010101?logo=socket.io) | ![JWT](https://img.shields.io/badge/-JWT-000?logo=jsonwebtokens) | ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?logo=cloudinary) |

---

## 🚦 Live Demo

- **Frontend:** [https://chatter-5uwp.onrender.com](https://chatter-5uwp.onrender.com)
- **Backend API:** [https://chatty-k1zj.onrender.com](https://chatty-k1zj.onrender.com)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Ankit-Kum-ar/chat-web.git
cd chat-web
```

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env   # Add your MongoDB URI, JWT_SECRET, Cloudinary keys
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install
cp .env.example .env   # Set VITE_BASE_URL to your backend API
npm run dev
```

### 4. Open in Browser

Visit [http://localhost:5173](http://localhost:5173) (or your Vite port).

---

## 🧪 Demo Credentials

```
Email: guest@gmail.com
Password: Guest@123
```

---

## 📂 Folder Structure

```
chat-web/
├── client/   # React + Vite frontend
└── server/   # Express backend (API, Socket.io, MongoDB)
```

---

## 📝 Environment Variables

**Backend (`server/.env`):**
```
MONOGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend (`client/.env`):**
```
VITE_BASE_URL=https://chatty-k1zj.onrender.com/api/v1
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=6366F1&width=435&lines=Happy+Chatting!+%F0%9F%92%AC" alt="Typing SVG" />
</div>