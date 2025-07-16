const db = require("./db");
const User = require("./user");
const Poll = require("./poll");
const Option = require("./option");
const PollVote = require("./pollVote");

Option.belongsTo(Poll);
Option.hasMany(PollVote);
Poll.belongsTo(User);
Poll.hasMany(Option);
Poll.hasMany(PollVote);
PollVote.belongsTo(User);
PollVote.belongsTo(Poll);
PollVote.belongsTo(Option);
User.hasMany(Poll);

module.exports = {
  db,
  User,
  Poll,
  Option,
  PollVote,
};
