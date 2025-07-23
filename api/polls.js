const express = require("express");
const router = express.Router();
const { Poll } = require("../database");
// replit code
// const { Poll, Option } = require("../dummy-database");

// GET all polls
router.get("/", async (req, res) => {
    try {
        const polls = Poll.findAll();
        res.status(200).json(polls);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the polls route.");
    }
});

// POST a new poll
router.post("/", async (req, res) => {
    try {
        const { pollData, pollOptions } = req.body;
        console.log("POLLDATA", pollData);
        console.log("POLLOPTIONS", pollOptions);
        const poll = Poll.create({
            title: pollData.title,
            creator_id: pollData.creator_id,
            description: pollData.description,
            auth_required: pollData.auth_required,
            expiration: pollData.expiration,
        });
        // loop over polloptions and create each
        for (let i = 0; i < pollOptions.length; i++) {
            option = pollOptions[i];
            const option = await Poll.createOption(poll, option);
        }

        // const poll = await Poll.create(req.body); // route for pollData w/o pollOptions
        res.status(201).send(poll);
    } catch (error) {
        res.status(500).send("Failed to create poll");
    }
});

module.exports = router;
