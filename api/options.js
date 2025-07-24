const express = require("express");
const router = express.Router();
const { Option } = require("../database");

//GET all options
router.get("/", async (req, res) => {
    try {
        const options = await Option.findAll();
        res.status(200).json(options);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the get all options route");
    }
});

//GET all options from a specific poll
router.get("/polls/:pollId", async(req,res) => {
    try {
        const pollId = req.params.pollId;
        const options = await Option.findAll({where: {poll_id: pollId} });
        res.status(200).json(options);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error from the get all options route for one poll");
    }
})

// GET one option
router.get("/:id", async(req, res) => {
    try {
        const option = await Option.findByPk(Number(req.params.id));
        if (!option) {
            return res.status(404).send("Option not found");
        }
        res.status(200).json(option);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the get single option route");
    }
});

// POST (Create) one option
router.post("/", async (req, res) => {
    try {
        const { poll_id, is_eliminated, option_text } = req.body;
        const newOption = await Option.create({
                poll_id,
                is_eliminated,
                option_text
        });
        res.status(201).json(newOption); // 201 for created
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the post new option route");
    }
});

// PATCH an existing option
router.patch("/:id", async(req, res) => {
    try {
        const option = await Option.findByPk(Number(req.params.id));
        if (!option) {
            return res.status(404).send("Option not found");
        }
        await option.update(req.body);
        res.status(200).json(option);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the patch existing option route");
    }
});

// DELETE an existing option
router.delete("/:id", async(req, res) => {
    try {
        const option = await Option.findByPk(Number(req.params.id));
        if (!option) {
            return res.status(404).send("Option not found");
        }
        await option.destroy();
        res.status(200).send("Option deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the delete existing option route");
    }
});

module.exports = router;