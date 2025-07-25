const express = require("express");
const router = express.Router();
const { PollVote } = require("../database");
const {Poll} = require("../database");

//GET all pollvotes
router.get("/", async (req, res) => {
    try {
        const pollVotes = await PollVote.findAll();
        res.status(200).json(pollVotes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the get all pollVotes route");
    }
});

//GET one pollvote
router.get("/:id", async(req, res) => {
    try {
        const pollVoteID = Number(req.params.id);
        const pollVote = await PollVote.findByPk(pollVoteID);
        if (!pollVote) {
            return res.status(404).send("Poll not found");
        }
        res.status(200).json(pollVote);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the get single pollVote route");
    }
});

//POST (Create) one pollvote
router.post("/", async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { poll_id, user_id, option_id, rank, isSubmitted } = req.body;
        const newPollVote = await PollVote.create({
            poll_id,
            user_id,
            option_id,
            vote_date: new Date(),
            rank,
            isSubmitted
        });
        res.status(201).json(newPollVote); // 201 for created
        await Poll.increment('number_of_votes', { where: { poll_id: poll_id } });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the post new pollvote route");
    }
});

//PATCH an existing pollvote
router.patch("/:id", async(req, res) => {
    try {
        const pollVote = await PollVote.findByPk(Number(req.params.id));
        if (!pollVote) {
            return res.status(404).send("Pollvote not found");
        }
        if (req.user && pollVote.user_id !== req.user.id) {
           return res.status(403).send("You can't edit this vote.");
        }
        await pollVote.update(req.body);
        res.status(200).json(pollVote);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the patch existing pollvote route");
    }
});

//DELETE an existing pollvote
//I don't think we'll need it but maybe for admin purposes 
router.delete("/:id", async(req, res) => {
    try {
        const pollVote = await PollVote.findByPk(Number(req.params.id));
        if (!pollVote) {
            return res.status(404).send("Pollvote not found");
        }

        await pollVote.destroy();
        await Poll.decrement('number_of_votes', { where: { id: poll_id } });
        res.status(200).send("Pollvote deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the delete existing pollvote route");
    }
});

module.exports = router;