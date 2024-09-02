const express = require("express");
require("dotenv").config();
const app = express();
const PORT = 8000;
const url = process.env.MONGO_URI;
const connectToDb = require("./connection");
const challengeRoutes = require("./routes/challenges"); // Import the routes correctly
const cors = require("cors");
const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Serve images from the uploads directory
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
connectToDb(url)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Connection error", err);
  });

// Use routes and upload middleware
app.use("/challenge", upload.single("image"), challengeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
