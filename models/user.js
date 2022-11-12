const mongoose = require("mongoose");

// Defining User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    coins: {
      type: Number,
      default: 20,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
)

// Defining User model
exports.UserModel = mongoose.models['User'] || mongoose.model('User', userSchema);



