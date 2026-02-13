const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://54.89.155.245:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
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

const mongoURL = process.env.MONGO_URL || "mongodb://localhost:2727/mydbp";
const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";

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

//=======================================signup====================================================================
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1 Check if fields are given
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    //Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    //Encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //save the user with the hashed password
    const user = new User({ email, password: hashPassword });

    //generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    //const user = new User({ email, password });
    await user.save();
    res.status(201).json({
      message: "User registered successfullyo",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
});

//==============================================login=================================================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send success response
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email },
    });

    //==================================================================================================
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Hi there ");
});
