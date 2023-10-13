const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      
    },
    stud_username: {
        type: String,
        required: true,
       
      },
     post_title: {
        type: String,
        required: true,
        
      },
      payment_details: {
        type: Number,
        required: true,
        
      },
      post_id: {
        type: String,
        required: true,
        
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", UserSchema);
