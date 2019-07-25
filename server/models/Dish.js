const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dishSchema = new Schema(
  {
    name: { type: String, default: 'Type name' },
    _creator: { type: Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number, default: 0 },
    description: { type: String, default: 'Type description' },
    active: { type: Boolean, default: true },
    pictureUrl: String,
    type: {
      type: String,
      enum: ['drink', 'food', 'dessert', 'not defined'],
      default: 'not defined',
    },
  },
  {
    timestamps: true,
  }
)

const Dish = mongoose.model('Dish', dishSchema)
module.exports = Dish
