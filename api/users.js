const express = require("express");
const router = express.Router();
const { Poll, User } = require("../database");

// GET all users
router.get("/", async (req, res) => {
    try {
        res.send("This is the users route.")
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the users route.");
    }
});