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

router.post('/', (req, res, next) => {
  Dish.create({})
    .then(dish => {
      res.json({
        success: true,
        dish,
      })
    })
    .catch(err => next(err))
})

router.put('/:_id', (req, res, next) => {
  let { name, type, price, description } = req.body
  Dish.findByIdAndUpdate(
    req.params._id,
    {
      name,
      type,
      price,
      description,
    },
    { new: true } //this gives as a response the information of the new updated dish
  )
    .then(dish => {
      res.json({
        message: 'The dish has been updated',
        dish,
      })
    })
    .catch(err => next(err))
})

router.put('/:_id/toggle-active', (req, res, next) => {
  Dish.findById(req.params._id)
    .then(dish => {
      dish.active = !dish.active
      dish.save().then(() => {
        res.json({
          message: 'The dish has been updated',
          dish,
        })
      })
    })
    .catch(err => next(err))
})

router.delete('/:_id', (req, res, next) => {
  Dish.findById(req.params._id).then(dish => {
    // console.log('the dish information is', dish)
    Dish.deleteOne({ _id: dish._id })
      .then(dish => {
        res.json({
          success: true,
          message: 'Your dish was succesfully deleted',
        })
      })
      .catch(err => next(err))
  })
})
module.exports = router
