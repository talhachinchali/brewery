const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Payment = require("../models/payment");
// Helper function to calculate overall rating
const calculateOverallRating = (ratings) => {
  if (ratings.length === 0) {
    return 0; // No ratings, return 0
  }

  // Calculate the sum of all ratings
  const sumOfRatings = ratings.reduce((total, rating) => total + rating.rating, 0);

  // Calculate the average rating
  const averageRating = sumOfRatings / ratings.length;

  // Round the average rating to one decimal place
  const roundedAverage = Math.round(averageRating * 10) / 10;

  return roundedAverage;
};

router.post("/", async (req, res) => {
  const { username, title, desc, payment_details, link, country,city,state,phone } = req.body;

  try {
    // Find the post by title
    const post = await Post.findOne({ title });

    if (!post) {
      // If the post doesn't exist, create a new one
      const newPost = new Post({ title, desc, payment_details, link, country,city,state,phone });
      newPost.ratings.push({
        username,
        rating: payment_details,
        description: desc,
      });
      await newPost.save();

      // Calculate overall rating and update payment_details
      const overallRating = calculateOverallRating(newPost.ratings);
      newPost.payment_details = overallRating;

      await newPost.save();

      return res.status(200).json(newPost);
    }

    // If the post exists, add the new review to the ratings array
    post.ratings.push({
      username,
      rating: payment_details,
      description: desc,
    });

    // Save the updated post document
    await post.save();

    // Calculate overall rating and update payment_details
    const overallRating = calculateOverallRating(post.ratings);
    post.payment_details = overallRating;

    await post.save();

    res.status(200).json(post);
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(500).json({ error: "Internal Server Error" });
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
