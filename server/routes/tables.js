const express = require('express')
const Table = require('../models/Table')

const router = express.Router()

router.get('/', (req, res, next) => {
  let filter = {}
  if (req.query.state) {
    filter.state = req.query.state
  }
  Table.find(filter)
    .then(tables => {
      res.json(tables)
    })
    .catch(err => next(err))
})

router.get('/:_id', (req, res, next) => {
  console.log(req.params._id)
  Table.findById(req.params._id)
    .populate('orders._dish')
    .then(table => {
      res.json(table)
    })
    .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  let { clientName, amountOfPeople, tableNb, orders } = req.body
  Table.create({ clientName, amountOfPeople, tableNb, orders })
    .then(tables => {
      res.json({
        tables,
        success: true,
      })
    })
    .catch(err => next(err))
})

router.put('/:_id', (req, res, next) => {
  let {
    clientName,
    amountOfPeople,
    tableNb,
    total,
    state,
    orders,
    tips,
    discount,
  } = req.body
  Table.findByIdAndUpdate(
    req.params._id,
    {
      clientName,
      amountOfPeople,
      tableNb,
      total,
      state,
      orders,
      tips,
      discount,
    },
    { new: true }
  )
    .populate('orders._dish')
    .then(table => {
      res.json({
        message: 'Table Updated',
        table,
      })
    })
    .catch(err => next(err))
})

router.delete('/:_id', (req, res, next) => {
  Table.findById(req.params._id).then(table => {
    Table.deleteOne({ _id: table._id })
      .then(table => {
        res.json({
          success: true,
          message: 'Your table was succesfully deleted',
        })
      })
      .catch(err => next(err))
  })
})

module.exports = router
