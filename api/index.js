const express = require("express");
const router = express.Router();
const testDbRouter = require("./test-db");
const pollsRouter = require("./polls");
const usersRouter = require("./users");
const optionsRouter = require("./options");

router.use("/test-db", testDbRouter);
router.use("/polls", pollsRouter); // mount router for polls
router.use("/users", usersRouter); // mount router for users
router.use("/options", optionsRouter);

module.exports = router;
