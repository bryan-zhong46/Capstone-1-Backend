const db = require("./db");
const { User, Poll, Option, PollVote } = require("./index");

const seed = async () => {
  try {
    db.logging = false;
    await db.sync({ force: true }); // Drop and recreate tables

    const users = await User.bulkCreate([
      { username: "admin", passwordHash: User.hashPassword("admin123") },
      { username: "user1", passwordHash: User.hashPassword("user111") },
      { username: "user2", passwordHash: User.hashPassword("user222") },
      { username: "user3", passwordHash: User.hashPassword("user333") },
      { username: "user4", passwordHash: User.hashPassword("user444") },
      { username: "user5", passwordHash: User.hashPassword("user555") },
      { username: "user6", passwordHash: User.hashPassword("user666") },
      { username: "user7", passwordHash: User.hashPassword("user777") },
      { username: "user8", passwordHash: User.hashPassword("user888") },
    ]);

    console.log(`👤 Created ${users.length} users`);

    const polls = await Poll.bulkCreate([
      {
        creator_id: users[0].user_id,
        title: "Best City",
        description:
          "Rank the best city from best (smallest number) to worst (largest number)!",
        number_of_votes: 0,
        auth_required: false,
        poll_status: "draft",
      },
      {
        creator_id: users[1].user_id,
        title: "Best Food",
        description:
          "Rank the best foods from best (smallest) to worst (largest)!",
        number_of_votes: 0,
        auth_required: false,
        poll_status: "closed",
      },
    ]);

    console.log(`Created ${polls.length} polls`);

    const options = await Option.bulkCreate([
      { poll_id: polls[0].poll_id, option_text: "New York" },
      { poll_id: polls[0].poll_id, option_text: "Miami" },
      { poll_id: polls[0].poll_id, option_text: "Tokyo" },
      { poll_id: polls[1].poll_id, option_text: "Pizza" },
      { poll_id: polls[1].poll_id, option_text: "Sushi" },
      { poll_id: polls[1].poll_id, option_text: "Burgers" },
    ]);

    console.log(`Created ${options.length}`);

    const pollVotes = await PollVote.bulkCreate([
      {
        poll_id: polls[0].poll_id,
        user_id: users[0].user_id,
        option_id: options[0].option_id,
        rank: 1,
        isSubmitted: true,
      },
      {
        poll_id: polls[0].poll_id,
        user_id: users[2].user_id,
        option_id: options[1].option_id,
        rank: 2,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[1].user_id,
        option_id: options[3].option_id,
        rank: 2,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[2].user_id,
        option_id: options[4].option_id,
        rank: 2,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[3].user_id,
        option_id: options[4].option_id,
        rank: 1,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[4].user_id,
        option_id: options[5].option_id,
        rank: 2,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[5].user_id,
        option_id: options[3].option_id,
        rank: 1,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[6].user_id,
        option_id: options[4].option_id,
        rank: 2,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[7].user_id,
        option_id: options[5].option_id,
        rank: 1,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[8].user_id,
        option_id: options[3].option_id,
        rank: 2,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[0].user_id,
        option_id: options[3].option_id, // Pizza
        rank: 2,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[0].user_id,
        option_id: options[4].option_id, // Sushi
        rank: 1,
        isSubmitted: true,
      },

      // user1 votes on Sushi (rank 1) and Burgers (rank 2)
      {
        poll_id: polls[1].poll_id,
        user_id: users[1].user_id,
        option_id: options[4].option_id, // Sushi
        rank: 1,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[1].user_id,
        option_id: options[5].option_id, // Burgers
        rank: 3,
        isSubmitted: true,
      },

      // user2 votes on Pizza (rank 1) and Burgers (rank 3)
      {
        poll_id: polls[1].poll_id,
        user_id: users[2].user_id,
        option_id: options[3].option_id, // Pizza
        rank: 1,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[2].user_id,
        option_id: options[5].option_id, // Burgers
        rank: 3,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[3].user_id,
        option_id: options[3].option_id,
        rank: 2,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[3].user_id,
        option_id: options[5].option_id,
        rank: 3,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[4].user_id,
        option_id: options[3].option_id,
        rank: 1,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[4].user_id,
        option_id: options[4].option_id,
        rank: 3,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[5].user_id,
        option_id: options[4].option_id,
        rank: 2,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[5].user_id,
        option_id: options[5].option_id,
        rank: 3,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[6].user_id,
        option_id: options[3].option_id,
        rank: 1,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[6].user_id,
        option_id: options[5].option_id,
        rank: 3,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[7].user_id,
        option_id: options[3].option_id,
        rank: 2,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[7].user_id,
        option_id: options[4].option_id,
        rank: 3,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[8].user_id,
        option_id: options[4].option_id,
        rank: 1,
        isSubmitted: true,
      },
      {
        poll_id: polls[1].poll_id,
        user_id: users[8].user_id,
        option_id: options[5].option_id,
        rank: 3,
        isSubmitted: true,
      },
    ]);

    // Create more seed data here once you've created your models
    // Seed files are a great way to test your database schema!

    console.log("🌱 Seeded the database");
  } catch (error) {
    console.error("Error seeding database:", error);
    if (error.message.includes("does not exist")) {
      console.log("\n🤔🤔🤔 Have you created your database??? 🤔🤔🤔");
    }
  }
  db.close();
};

seed();
