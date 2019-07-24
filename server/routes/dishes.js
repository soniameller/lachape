const express = require('express')
const Dish = require('../models/Dish')

const router = express.Router()

router.get('/', (req, res, next) => {
  Dish.find()
    .then(dishes => {
      res.json(dishes)
    })
    .catch(err => next(err))
})

router.get('/:_id', (req, res, next) => {
  Dish.findById(req.params._id)
    .then(dish => {
      res.json(dish)
    })
    .catch(err => next(err))
})

module.exports = router
