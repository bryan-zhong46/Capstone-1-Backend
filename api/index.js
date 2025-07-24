const express = require("express");
const router = express.Router();
const testDbRouter = require("./test-db");
const pollsRouter = require("./polls");
const usersRouter = require("./users");
const pollVotesRouter = require("./pollVotes");
const optionsRouter = require("./options");
const pollResultsRouter = require("./pollResults"); 

router.use("/test-db", testDbRouter);
router.use("/polls", pollsRouter);
router.use("/users", usersRouter);
router.use("/pollvotes", pollVotesRouter);
router.use("/options", optionsRouter);
router.use("/pollresults", pollResultsRouter); 

module.exports = router;