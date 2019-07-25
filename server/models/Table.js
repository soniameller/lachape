const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tableSchema = new Schema(
  {
    clientName: { type: String, default: '' },
    _creator: { type: Schema.Types.ObjectId, ref: 'User' },
    amountOfPeople: { type: Number, default: 0 },
    tableNb: { type: Number },
    total: { type: Number, default: 0 },
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
