# 🌿 Plant Tree Server – Backend API for Virtual Plant Garden

This is the **backend server** for the [Plant Tree 🌱](https://plant-trees-with-green-roots.netlify.app/) application. It provides a secure and scalable REST API built with **Node.js**, **Express**, and **MongoDB Atlas** to manage plant data through full **CRUD operations**.

---

## 🛠️ Features

✅ **Create** new plant entries with rich details and images  
✅ **Read** and fetch all plants or specific plant details  
✅ **Update** plant information using dynamic route parameters  
✅ **Delete** plant entries securely by ID  
✅ **Hosted on MongoDB Atlas** for reliable and scalable database management

---

## 🔗 API Endpoints

| Method | Endpoint                | Description                  |
|--------|-------------------------|------------------------------|
| GET    | `/plants`               | Get all plants               |
| GET    | `/plants/:id`           | Get a single plant by ID     |
| POST   | `/plants`               | Add a new plant              |
| PUT    | `/plants/:id`           | Update plant by ID           |
| DELETE | `/plants/:id`           | Delete plant by ID           |

> All endpoints return JSON responses.

---

## 🧰 Technologies Used

- **Node.js** & **Express.js** – For building the REST API
- **MongoDB Atlas** – Cloud-hosted database solution
- **CORS** & **dotenv** – For security and environment management
- **Firebase Auth (Optional)** – For securing endpoints (if implemented)

---

## 🔒 Environment Variables

Create a `.env` file and include:

```env
PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string
