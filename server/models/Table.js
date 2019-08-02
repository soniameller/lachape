const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tableSchema = new Schema(
  {
    clientName: { type: String, default: '' },
    _creator: { type: Schema.Types.ObjectId, ref: 'User' },
    amountOfPeople: { type: Number, default: 0 },
    waitingSince: { type: Date },
    tableNb: { type: Number },
    total: { type: Number, default: 0 },
    tips: { type: Number, default: 0 },
    discount: { type: Number, default: 1 },
    closedAt: { type: Date },
    waitingSince: { type: Date },
    state: {
      type: String,
      enum: ['open', 'closed', 'archived'],
      default: 'open',
    },
    orders: [
      {
        _dish: { type: Schema.Types.ObjectId, ref: 'Dish' },
        // orderAt: { type: Date, default: Date.now },
        amount: { type: Number, default: 1 },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Table = mongoose.model('Table', tableSchema)
module.exports = Table
