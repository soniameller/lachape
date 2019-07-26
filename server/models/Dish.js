const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dishSchema = new Schema(
  {
    name: { type: String },
    _creator: { type: Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number },
    description: { type: String },
    active: { type: Boolean, default: true },
    pictureUrl: String,
    type: {
      type: String,
      enum: ['Drink', 'Food', 'Dessert'],
    },
  },
  {
    timestamps: true,
  }
)

const Dish = mongoose.model('Dish', dishSchema)
module.exports = Dish
