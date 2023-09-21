const sequelize = require("../config/connection");
const { User, Posts, Comments } = require("../models");

const userData = require("./userData.json");
const postsData = require("./postsData.json");
const commentsData = require("./commentsData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const posts of postsData) {
    await Posts.create({
      ...posts,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

    for (const comments of commentsData) {
      await Comments.create({
        ...comments,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        post_id: posts[Math.floor(Math.random() * posts.length)].id,
      });
    }
  }

  process.exit(0);
};

seedDatabase();

// Come back to this later. I think this is not set up correctly.
