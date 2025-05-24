# 📝 Task Manager API

A simple Task Manager app built with **Node.js**, **Express**, and **MongoDB**. It provides a RESTful API for managing tasks and serves a static frontend from the `public` directory.

---

## 🚀 Features

- Create, read, update, and delete tasks (CRUD)
- RESTful API built with Express
- MongoDB database connection using Mongoose
- Serves static HTML/CSS/JS frontend
- Environment-based configuration

---

## 📁 Project Structure

/project-root<br>
│<br>
├── public              # Static frontend (HTML, CSS, JS)<br>
├── Router              # Task-related routes<br>
├── database            # MongoDB connection logic<br>
├── app.js              # Entry point<br>
├── .env                # Environment variables (not pushed)<br>
├── package.json<br>



## ⚙️ Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager```
2. **Install dependencies**
    ```bash
    npm install```
3. **Create .env file**
    ```bash
    MONGO_URI=your-mongodb-uri-here```
4. **Run the app**
    ```bash
      npm start```

Visit: http://localhost:3000

## 📡 API Endpoints

| Method | Endpoint                  | Description                    |
|--------|---------------------------|--------------------------------|
| GET    | `/api/tasks`              | Get all tasks                  |
| POST   | `/api/tasks`              | Create a new task              |
| GET    | `/api/tasks/:id`          | Get a single task by ID        |
| PUT    | `/api/tasks/:id`          | Replace/update a task          |
| PATCH  | `/api/tasks/:id/toggle`   | Toggle task completion status  |
| DELETE | `/api/tasks/:id`          | Delete a task by ID            |



