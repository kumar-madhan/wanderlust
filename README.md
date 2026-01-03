# 🌍 WanderLust

WanderLust is a full-stack blogging platform focused on travel experiences.  
It consists of a **React + Vite + TypeScript frontend** and a **Spring Boot backend**, deployed on the same server.

---

## 🧱 Project Structure

```
wanderlust/
├── frontend/        # React + Vite + TypeScript UI
├── backend/         # Spring Boot REST API
├── Jenkinsfile.*    # CI/CD pipelines
└── README.md        # Project documentation
```

---

## 🚀 Features

- User authentication (JWT-based)
- Create, edit, and view blog posts
- Featured & latest posts
- Admin dashboard
- Dark / Light theme toggle
- CI/CD with Jenkins
- Versioned release workflow

---

## 🛠 Tech Stack

### Frontend
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Axios
- React Router
- React Hook Form + Zod

### Backend
- Java 17
- Spring Boot
- Spring Security (JWT)
- Maven
- REST APIs

---

## ⚙️ Environment Setup

### Frontend `.env`
```
VITE_API_BASE_URL=http://<server-ip>:5000/api
```

### Backend
- Runs on port **5000**
- JWT-based authentication
- CORS enabled for frontend host

---

## ▶️ Running Locally

### Backend
```bash
cd backend
mvn clean package
java -jar target/backend-1.0.0.jar --server.port=5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

---

## 🚀 Deployment (Production)

### Frontend
- Built using `npm run build`
- Deployed to:
```
/var/www/html
```

### Backend
- Deployed as:
```
/opt/wanderlust-api/backend.jar
```
- Managed using `manage-api.sh`

---

## 🔧 Backend Process Management

Location:
```
/opt/wanderlust-api/manage-api.sh
```

Supported commands:
```bash
./manage-api.sh start
./manage-api.sh stop
./manage-api.sh restart
./manage-api.sh status
```

Uses `setsid` to keep the process alive after Jenkins exits.

---

## 🔁 CI/CD (Jenkins)

Two separate pipelines:

### Frontend
- Install dependencies
- TypeScript build
- Vite production build
- Deploy to Apache

### Backend
- Maven build
- Jar packaging
- Controlled restart using `manage-api.sh`

---

## 🏷 Release Workflow

A generic release script is used across repositories.

### Script
```
release.sh
```

### Usage
```bash
./release.sh <repo_path|.> <current_branch> <next_branch>
```

### Example
```bash
./release.sh . v0 v1
```

What it does:
- Merges `v0` → `master`
- Tags the release
- Creates `v1` for next development
- Pushes everything to origin

---

## 🧪 Testing

Frontend tests are configured using:
- Vitest
- Testing Library
- MSW

```bash
npm run test
```

---

## 🧯 Troubleshooting

- **Frontend shows Network Error**  
  → Ensure backend is running and reachable on port 5000

- **Jenkins kills backend after job**  
  → Use `setsid` / `nohup` (already handled in `manage-api.sh`)

- **Vite / tsc not found**  
  → Always use `npx` in CI environments

---

## 📄 License

This project is for educational and internal use.

---

## ✨ Author

**Madhan Kumar**  
GitHub: https://github.com/kumar-madhan
