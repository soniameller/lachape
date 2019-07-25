const express = require('express')
const Table = require('../models/Table')

const router = express.Router()

router.get('/', (req, res, next) => {
  Table.find()
    .then(tables => {
      res.json(tables)
    })
    .catch(err => next(err))
})

router.get('/:_id', (req, res, next) => {
  console.log(req.params._id)
  Table.findById(req.params._id)
    .then(tables => {
      res.json(tables)
    })
    .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  let { clientName, amountOfPeople, tableNb } = req.body
  Table.create({ clientName, amountOfPeople, tableNb })
    .then(tables => {
      res.json({
        tables,
        success: true,
      })
    })
    .catch(err => next(err))
})

router.put('/:_id', (req, res, next) => {
  let { clientName, amountOfPeople, tableNb } = req.body
  Table.findByIdAndUpdate(
    req.params._id,
    {
      clientName,
      amountOfPeople,
      tableNb,
    },
    { new: true }
  )
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
