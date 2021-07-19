const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    password: String,
    role: {
      type: String,
      default: 'common' // admin | common
    }
  },
  {
    timestamps: true
  }
)