const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    return res.sendStatus(204);
  }
  next();
});
app.use(express.json());

const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/mydb";

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("praveen chandeepa weerasinghe");
});

app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully123", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Hi there ");
});
