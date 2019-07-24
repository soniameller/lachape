const express = require('express')
const Country = require('../models/Country')

const router = express.Router()

// Route to get all countries
router.get('/', (req, res, next) => {
  Country.find()
    .then(countries => {
      res.json(countries)
    })
    .catch(err => next(err))
})

// Route to add a country
router.post('/', (req, res, next) => {
  let { name, type, price, description } = req.body
  Country.create({ name, type, price, description })
    .then(dish => {
      res.json({
        success: true,
        dish,
      })
    })
    .catch(err => next(err))
})

module.exports = router
