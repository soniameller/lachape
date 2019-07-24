const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dishSchema = new Schema(
  {
    name: String,
    _creator: { type: Schema.Types.ObjectId, ref: 'User' },
    price: Number,
    description: String,
    active: Boolean,
    pictureUrl: String,
    type: { type: String, enum: ['drink', 'food', 'dessert'] },
  },
  {
    timestamps: true,
  }
)

const Dish = mongoose.model('Dish', dishSchema)
module.exports = Dish
