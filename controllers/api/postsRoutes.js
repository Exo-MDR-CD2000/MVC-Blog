const router = require("express").Router();
const { User, Posts, Comments } = require("../../models");
const withAuth = require("../../utils/auth"); // auth needed for routes that require authentication

// GET all posts

router.get("/", withAuth, async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      include: [{ model: User }, { model: Comments }],
    });
    res.status(200).json(postsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single post by id

router.get("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comments }],
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new post

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Posts.create({
      ...req.body,
      // if spread operator doesn't work, try this:
      // title: req.body.title,
      // content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a post by id

router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Posts.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    if (!postData) {
      res.status(404).json({ message: "No post can be found with that id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a post by id

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Posts.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post can be found with that id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
