# 🎵 Spotify Backend Clone

A scalable backend service for a Spotify-like music streaming application built using Node.js, Express, MongoDB, and JWT authentication. This project handles user authentication, music uploads, album management, and secure API access.

---

## 🚀 Features

- 🔐 Rule Based User Authentication (Register, Login, Logout)
- 🎵 Upload and manage music (by artist)
- 💿 Create and manage albums
- 📂 File uploads using Multer
- ☁️ Media storage using ImageKit
- 🔒 Protected routes using JWT
- 📊 MongoDB database integration

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT (jsonwebtoken)  
- **File Upload:** Multer  
- **Media Storage:** ImageKit  
- **Security:** bcrypt.js  

---

## 📁 Project Structure

```
src/
│
├── controllers/
│ ├── auth.controllers.js
│ ├── music.controllers.js
├── db/
│ ├── db.js
│
├── models/
│ ├── user.model.js
│ ├── music.model.js
│ ├── album.model.js
│
├── routes/
│ ├── auth.routes.js
│ ├── music.routes.js
│
├── middleware/
│ ├── auth.middleware.js
│
├── services/
│ ├── storage.service.js
│
└── app.js

```
---

## 🔑 Authentication APIs

### ➤ Register User
```
POST /api/auth/register
```
### ➤ Login User
```
POST /api/auth/login
```

### ➤ Logout User
```
POST /api/auth/logout
```
---

## 🎵 Music APIs

### ➤ Create Music (Protected)
```
POST /api/music/
```

- Upload audio + thumbnail
- Uses Multer + ImageKit

### ➤ Get All Music
```
GET /api/music
```

---

## 💿 Album APIs

### ➤ Create Album (Protected)
```
POST /api/albums
```

### ➤ Get All Albums
```
GET /api/album
```

### ➤ Get Album by ID
```
GET /api/albums/:id
```


---

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```
git clone https://github.com/your-username/spotify-backend.git
cd spotify-backend
```

### 2️⃣ Install dependencies
```
npm install
```
### 3️⃣ Setup environment variables

Create a .env file:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
```

### 4️⃣ Run the server
```
npm run dev
```

### 🧠 How It Works
```
User registers → password hashed using bcrypt →
User logs in → JWT token generated →
Token used to access protected routes →
Music files uploaded via Multer →
Files stored on ImageKit →
Metadata saved in MongoDB
```
