const express = require("express");
const router = express.Router();
const { Poll, User } = require("../database");
// replit code
// const { Poll, User } = require("../dummy-database");

// GET all users
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error from the users route.");
    }
},

// GET one user
router.get("/:id", async(req, res) => {
    try {
        const userID = Number(req.params.id);
        const user = await User.findByPk(userID);
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error from the user route.");
    }
})
);

module.exports = router;