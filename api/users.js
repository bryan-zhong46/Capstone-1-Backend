const express = require("express");
const router = express.Router();
const { User } = require("../database");

// GET all users
router.get(
  "/",
  async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error from the users route.");
    }
  },

  // GET one user
  router.get("/:id", async (req, res) => {
    try {
      const userID = Number(req.params.id);
      const user = await User.findByPk(userID);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error from the user route.");
    }
  })
);

// POST (Create) one user
router.post("/", async (req, res) => {
  try {
    const { username, first_name, last_name, email, auth0Id, password } =
      req.body;
    const passwordHash = User.hashPassword(password);
    const newUser = await User.create({
      username,
      first_name,
      last_name,
      email,
      auth0Id,
      passwordHash,
    });

    //userSafe created to hide sensitive info from being seen from console.log outputs
    const userSafe = {
      user_id: newUser.user_id,
      username: newUser.username,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      isDisabled: newUser.isDisabled,
    };

    res.status(201).json(userSafe); // 201 for created
  } catch (error) {
    console.error(error);

    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(409).send("Username or email already exists.");
    } else {
      res.status(500).send("Error from the post new user route");
    }
  }
});

// PATCH an existing user
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(Number(req.params.id));
    if (!user) {
      return res.status(404).send("User not found");
    }

    await user.update(req.body);
    const userSafe = {
      user_id: user.user_id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      isAdmin: user.isAdmin,
      isDisabled: user.isDisabled,
    };
    res.status(200).json(userSafe);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error from the patch existing user route");
  }
});

// DELETE an existing user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(Number(req.params.id));
    if (!user) {
      return res.status(404).send("User not found");
    }

    await user.destroy();
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error from the delete existing user route");
  }
});

module.exports = router;
