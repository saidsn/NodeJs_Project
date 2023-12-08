const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { collection: "users", timestamps: true }
);

// Create the user model based on the schema
const user = mongoose.model("users", userSchema);

// Export the user model
module.exports = user;
