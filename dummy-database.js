/**
 * Our dummy database has two tables: polls and users
 * You DO NOT need to edit this file. But please do read it, and understand the methods you can use.
 * For instance, if you want to create a new poll, you can do:
 * const poll = Task.create({
 *   title: "Fold Laundry",
 *   description: "Fold all the laundry in the laundry room",
 *   completed: false,
 *   userId: 1,
 * });
 * If you want to delete a poll, you can do:
 * Task.delete(1);
 */

/**
 * Task.findAll() -> returns all polls
 * Task.findByPk(id) -> returns a single poll by id
 * Task.create(poll) -> creates a new poll
 * Task.update(id, poll) -> updates a poll by id
 * Task.delete(id) -> deletes a poll by id
 *
 * User.findAll() -> returns all users
 * User.findByPk(id) -> returns a single user by id
 * User.create(user) -> creates a new user
 * User.update(id, user) -> updates a user by id
 * User.delete(id) -> deletes a user by id
 */

/**
 * Each poll has:
 * - id
 * - title
 * - description
 * - completed
 * - userId
 */

/**
 * Each user has:
 * - id
 * - name
 */

const polls = [
  {
    poll_id: 1,
    title: "Poll Title 1",
    description: "Poll Description 1",
    userId: 1,
  },
  {
    poll_id: 2,
    title: "Poll Title 2",
    description: "Poll Description 2",
    userId: 2,
  },
];
let nextPollId = polls.length + 1;

const users = [
  { user_id: 1, username: "Finn" },
  { user_id: 2, username: "Shahid" },
];
let nextUserId = users.length + 1;

const options = [
  { options_id: 1, option_text: "Option 1", poll_id: 1 },
  { options_id: 2, option_text: "Option 2", poll_id: 1 },
  { options_id: 3, option_text: "Option 3", poll_id: 2 },
  { options_id: 4, option_text: "Option 4", poll_id: 2 },
];
let nextOptionId = options.length + 1;

const Poll = {
  findAll: function () {
    return polls;
  },
  findByPk: function (id) {
    return polls.find((poll) => poll.id === id);
  },
  create: function (poll) {
    poll.poll_id = nextPollId++;
    polls.push(poll);
    return poll;
  },
  update: function (id, poll) {
    const index = polls.findIndex((poll) => poll.id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    console.log("Updating poll", polls[index]);
    console.log("With poll", poll);
    polls[index] = { ...polls[index], ...poll };
    return poll;
  },
  delete: function (id) {
    const index = polls.findIndex((poll) => poll.id === id);
    if (index === -1) {
      throw new Error("Poll not found");
    }
    polls.splice(index, 1);
  },
};

const User = {
  findAll: function () {
    return users;
  },
  findByPk: function (id) {
    return users.find((user) => user.id === id);
  },
  create: function (user) {
    user.user_id = nextUserId++;
    users.push(user);
    return user;
  },
  update: function (id, user) {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    users[index] = { ...users[index], ...user };
    return user;
  },
  delete: function (id) {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    users.splice(index, 1);
  },
};

const Option = {
  findAll: function () {
    return options;
  },
  findByPk: function (id) {
    return options.find((option) => option.id === id);
  },
  create: function (option) {
    console.log(option)
    option.options_id = nextOptionId++;
    options.push(option);
    return option;
  },
  update: function (id, option) {
    const index = options.findIndex((option) => option.id === id);
    if (index === -1) {
      throw new Error("option not found");
    }
    options[index] = { ...options[index], ...option };
    return option;
  },
  delete: function (id) {
    const index = options.findIndex((option) => option.id === id);
    if (index === -1) {
      throw new Error("option not found");
    }
    options.splice(index, 1);
  },
};

module.exports = { Poll, User, Option };
