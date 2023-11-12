const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    payment_details:{
      type:Number,
      default:0,
    },
    country:{
      type:String,
      required:false,
    },
    state:{
      type:String,
      required:false,
    },
    city:{
      type:String,
      required:false,
    },
    phone:{
      type:String,
      required:false,
    },
    link:{
      type:String,
      required:false,
    },

    categories: {
      type: Array,
      required: false,
    },
    ratings: [RatingSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
