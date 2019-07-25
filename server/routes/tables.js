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
  //let { clientName, amountOfPeople, tableNb } = req.body
  Table.create()
    .then(table => {
      res.json({
        success: true,
        table,
      })
    })
    .catch(err => next(err))
})

module.exports = router
