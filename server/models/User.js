const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: String,
    password: String,
    nickname: { type: String },
    isValidated: { type: Boolean, default: false },
    role: { type: String, enum: ['admin', 'employee'], default: 'employee' },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User
