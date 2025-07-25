const express = require("express");
const router = express.Router();
const { Poll, PollVote } = require("../database");

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

// GET polls of a specific user
router.get("/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const polls = await Poll.findAll({ where: { creator_id: userId } });
        res.status(200).json(polls);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the get polls for a specific user route");
    }
});

// GET one poll
router.get("/:id", async(req, res) => {
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

//GET all Pollvotes for a specific poll
router.get("/:poll_id/results", async (req, res) => {
    try {
        const poll_id = req.params.poll_id;

        const poll = await Poll.findByPk(poll_id);
        if (!poll) return res.status(404).json({ error: "Poll not found" });
        //if (poll.poll_status !== "closed")
          //  return res.status(403).json({ error: "Poll is not closed" });

        const votes = await PollVote.findAll({
            where: { poll_id },
            order: [["user_id", "ASC"], ["rank", "ASC"]]
        });

        res.json(votes);
    } catch (error) {
        console.error("Error fetching poll results:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// POST (Create) one poll
router.post("/", async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { creator_id, title, description, expiration } = req.body;
        const newPoll = await Poll.create({
            creator_id,
            title,
            description,
            expiration,
            number_of_votes: 0,
            auth_required: false,
            poll_status: 'draft',
            isDisabled: false
        });
        res.status(201).json(newPoll); // 201 for created
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the post new poll route");
    }
});

// PATCH an existing poll
router.patch("/:id", async(req, res) => {
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
router.delete("/:id", async(req, res) => {
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
