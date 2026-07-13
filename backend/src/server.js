const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectMongoDB = require("./config/mongodb");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectMongoDB();

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});