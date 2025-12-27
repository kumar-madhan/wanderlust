# 🛠️ WanderLust Backend

A **production-ready REST API** powering the WanderLust platform.  
Built with **Node.js**, **Express**, **MongoDB**, and **Redis**, following clean backend architecture principles.

---

## ✨ Features

- 🔐 JWT-based Authentication
- 🧑‍💻 User & Blog Post Management
- ⚡ Redis Caching Layer
- 🧪 Unit & Integration Tests
- 🧱 Clean MVC-style Architecture
- 🐳 Docker-ready
- 🔁 CI/CD friendly (Jenkins)

---

## 🧩 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis
- JWT
- Jest
- Docker

---

## 🗂️ Folder Structure

```
backend/
├── controllers/     # Route handlers
├── routes/          # API routes
├── models/          # MongoDB schemas
├── services/        # Redis, helpers
├── config/          # DB & app config
├── tests/           # Unit & integration tests
├── server.js        # App entry point
└── Dockerfile
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Runs at: `http://localhost:5000`

---

## 🔐 Environment Variables

Create `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/wanderlust
JWT_SECRET=changeme
REDIS_URL=redis://localhost:6379
```

---

## 🧪 Testing

```bash
npm test
```

---

## 📜 License

MIT License
