const db = require("./db");
const User = require("./user");
const Poll = require("./poll");
const Option = require("./option");
const PollVote = require("./pollVote");

module.exports = {
  db,
  User,
  Poll,
  Option,
  PollVote,
};
