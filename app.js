const express = require("express");
const app = express();
const taskRouters = require("./Router/taskRouter");
const connectDB = require("./database/connection");
require('dotenv').config()

const PORT = 3000;
const path = require("path");
// const cors = require("cors");
// app.use(cors());

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use("/api/tasks/", taskRouters);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.log("failed!!", err);
  }
};

start();
