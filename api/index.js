const express = require("express");
const router = express.Router();
const testDbRouter = require("./test-db");
const pollsRouter = require("./polls");
const usersRouter = require("./users");
const pollVotesRouter = require("./pollVotes");
const optionsRouter = require("./options");

router.use("/test-db", testDbRouter);
router.use("/polls", pollsRouter); // mount router for polls
router.use("/users", usersRouter); // mount router for users
router.use("/pollvotes", pollVotesRouter); //mount router for pollVotes
router.use("/options", optionsRouter); // mount router for options

module.exports = router;
