const express = require("express");
const router = express.Router();
const testDbRouter = require("./test-db");
const pollsRouter = require("./polls");
const usersRouter = require("./users");
const pollVotesRouter = require("./pollVotes");

router.use("/test-db", testDbRouter);
router.use("/polls", pollsRouter); // mount router for polls
router.use("/users", usersRouter); // mount router for users
router.use("/pollvotes", pollVotesRouter); //mount router for pollVotes

module.exports = router;
