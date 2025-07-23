const express = require("express");
const router = express.Router();
const { Poll } = require("../database");
// replit code
// const { Poll, Option } = require("../dummy-database");

// GET all polls
router.get("/", async (req, res) => {
    try {
        const polls = await Poll.findAll();
        console.log("Polls from DB:", polls);
        res.status(200).json(polls);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the get all polls route");
    }
});

// GET one poll
router.get("/:id", async (req, res) => {
    try {
        const pollID = Number(req.params.id);
        const poll = await Poll.findByPk(pollID);
        if (!poll) {
            return res.status(404).send("Poll not found");
        }
        res.status(200).json(poll);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the get single poll route");
    }
});

// GET all options for a poll by id
router.get("/:id/options", async (req, res) => {
    try {
        const poll = await Poll.findByPk(req.params.id);
        if (!poll) {
            return res.status(404).send({ error: "Poll not found" });
        }
        const options = await poll.getOptions();
        res.send(options);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch poll's options" });
    }
});

// POST (Create) one poll
router.post("/", async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { pollData, pollOptions } = req.body;
        // const newPoll = await Poll.create({
        //     creator_id,
        //     title,
        //     description,
        //     expiration,
        //     number_of_votes: 0,
        //     auth_required: false,
        //     poll_status: "draft",
        //     isDisabled: false,
        // });
        const newPoll = await Poll.create(pollData);

        if (!newPoll) {
            console.log("Poll does not exist");
        }

        // create the poll options associated w/ this poll
        for (let i = 0; i < pollOptions.length; i++) {
            console.log("CREATING A POLL OPTION...");
            pollOptions[i].poll_id = newPoll.poll_id;
            newOption = await newPoll.createOption(pollOptions[i]);
            console.log("NEW POLL OPTION: ", newOption);
        }

        res.status(201).json(newPoll); // 201 for created
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the post new poll route");
    }
});

// PATCH an existing poll
router.patch("/:id", async (req, res) => {
    try {
        const poll = await Poll.findByPk(req.params.id);
        if (!poll) {
            return res.status(404).send("Poll not found");
        }

        await poll.update(req.body);
        res.status(200).json(poll);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the patch existing poll route");
    }
});

// DELETE an existing poll
router.delete("/:id", async (req, res) => {
    try {
        const poll = await Poll.findByPk(req.params.id);
        if (!poll) {
            return res.status(404).send("Poll not found");
        }

        await poll.destroy();
        res.status(200).send("Poll deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the delete existing poll route");
    }
});

module.exports = router;
