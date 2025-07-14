const express = require("express");
const router = express.Router();
const testDbRouter = require("./test-db");
const pollsRouter = require("./polls")

router.use("/test-db", testDbRouter);
router.use("/polls", pollsRouter) // mount router for polls

module.exports = router;
