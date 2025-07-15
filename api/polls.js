const express = require("express");
const router = express.Router();
const { Poll, User } = require("../database");

// GET all polls
router.get("/", async (req, res) => {
    try {
        res.send("This is the polls route.")
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the polls route.");
    }
});

module.exports = router;