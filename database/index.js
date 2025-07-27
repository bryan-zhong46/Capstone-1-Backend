const db = require("./db");
const User = require("./user");
const Poll = require("./poll");
const Option = require("./option");
const PollVote = require("./pollVote");

// A poll has many options and many votes
Poll.hasMany(Option, { foreignKey: 'poll_id' });
Poll.hasMany(PollVote, { foreignKey: 'poll_id' });

// An option belongs to a poll and has many votes
Option.belongsTo(Poll, { foreignKey: 'poll_id' });
Option.hasMany(PollVote, { foreignKey: 'option_id' });

// A vote belongs to a poll, user, and option
PollVote.belongsTo(Poll, { foreignKey: 'poll_id' });
PollVote.belongsTo(User, { foreignKey: 'user_id' });
PollVote.belongsTo(Option, { foreignKey: 'option_id' });

// A user has many polls and many votes
User.hasMany(Poll, { foreignKey: 'creator_id' });
User.hasMany(PollVote, { foreignKey: 'user_id' });

module.exports = {
  db,
  User,
  Poll,
  Option,
  PollVote,
};
