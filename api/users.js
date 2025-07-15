const express = require("express");
const router = express.Router();
const { Poll, User } = require("../database");

// GET all users
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the users route.");
    }
});

module.exports = router;