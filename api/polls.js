const express = require("express");
const router = express.Router();
// const { Poll, User } = require("../database");
// replit code
const { Poll, User } = require("../dummy-database");

// GET all polls
router.get("/", async (req, res) => {
    try {
        const polls = await Poll.findAll();
        res.status(200).json(polls);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the polls route.");
    }
});

// POST a new poll
router.post("/", async (req, res) => {
    try {
        const poll = await Poll.create(req.body);
        res.status(201).send(poll);
    } catch (error) {
        res.status(500).send("Failed to create poll");
    }
});

module.exports = router;
