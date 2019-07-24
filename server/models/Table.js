const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tableSchema = new Schema(
  {
    clientName: String,
    _creator: { type: Schema.Types.ObjectId, ref: 'User' },
    amountOfPeople: Number,
    tableNb: Number,
    total: Number,
    state: { type: String, enum: ['open', 'closed', 'archived'] },
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
