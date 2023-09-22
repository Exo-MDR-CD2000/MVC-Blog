const router = require("express").Router();
const { User, Posts, Comments } = require("../../models");
const withAuth = require("../../utils/auth"); // auth needed for routes that require authentication

// GET all comments

router.get("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comments.findAll({
      include: [{ model: User }, { model: Posts }],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single comment by id

router.get("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comments.findByPk(req.params.id, {
      include: [{ model: User }, { model: Posts }],
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment found with that id!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new comment

router.post("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comments.create({
      ...req.body,
      // if spread operator doesn't work, try this:
      // post_id: req.body.post_id,
      // text: req.body.text,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a post by id

router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comments.update(
      {
        text: req.body.text,
        // i believe adding the post_id is uneccessary because the post_id is not being changed
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    if (!commentData) {
      req
        .status(404)
        .json({ message: "No comment can be found with that id!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a comment by id

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comments.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!commentData) {
      res
        .status(404)
        .json({ message: "No comment can be found with that id!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
