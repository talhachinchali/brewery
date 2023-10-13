const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Payment = require("../models/payment");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});



//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const payment = await Payment.findOne({ post_id: req.params.id });
    res.status(200).json( post/*, payment*/ );
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET ALL POSTS with Search
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  const searchTerm = req.query.search; // Added search query parameter

  try {
    let posts;

    if (searchTerm) {
      posts = await Post.find({
        $or: [
          { title: { $regex: new RegExp(searchTerm, "i") } }, // Search in title
          { username: { $regex: new RegExp(searchTerm, "i") } } // Search in username
        ]
      });
    } else if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/payment", async (req, res) => {
  const newPayment = new Post(req.body);
  try {
    const savedPost = await newPayment.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
