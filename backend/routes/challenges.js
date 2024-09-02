const express = require("express");
const router = express.Router();
const { createChallenge, getChallenge } = require("../controllers/challenges"); // Ensure correct import path

// Define routes
router.post("/", createChallenge); // POST route for creating a challenge
router.get("/", getChallenge);     // GET route for fetching challenges

module.exports = router;
