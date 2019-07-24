const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const StreetArt = require('../models/StreetArt')
const Visit = require('../models/Visit')

const bcryptSalt = 10

require('../configs/database')

let userDocs = [
  new User({
    email: 'alice@gmail.com',
    password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
    isValidated: true,
    nickname: 'ali',
    role: 'admin',
  }),
  new User({
    email: 'bob@gmail.com',
    password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
    isValidated: true,
    nickname: 'b',
    role: 'employee',
  }),
]

let dishDocs = [
  new Dish({
    name: 'Chipirones',
    _creator: userDocs[0]._id,
    price: 290,
    description: 'Chipirones bla bla bla',
    type: 'food',
  }),
  new Dish({
    name: 'Flan De Ines',
    _creator: userDocs[1]._id,
    price: 170,
    description: 'Flan con crema y dulce de leche de oveja',
    type: 'dessert',
  }),
  new Dish({
    name: 'Cerveza',
    _creator: userDocs[1]._id,
    price: 120,
    type: 'drink',
  }),
]

let tableDocs = [
  new Table({
    clientName: 'António',
    _creator: userDocs[1]._id,
    amountOfPeople: 4,
    tableNb: 11,
    state: 'open',
    orders: [
      { _dish: dishDocs[1]._id },
      { _dish: dishDocs[2]._id },
      { _dish: dishDocs[0]._id },
    ],
  }),
  new Table({
    _user: userDocs[0]._id,
    _streetArt: dishDocs[1]._id,
  }),
  new Table({
    _user: userDocs[1]._id,
    _streetArt: dishDocs[0]._id,
  }),
]

Promise.all([User.deleteMany(), StreetArt.deleteMany(), Table.deleteMany()])
  .then(() => {
    console.log('All users, street arts and Tables have been deleted')

    return Promise.all([
      User.create(userDocs),
      StreetArt.create(dishDocs),
      Table.create(tableDocs),
    ])
  })
  .then(() => {
    console.log(`${userDocs.length} users created`)
    console.log(`${dishDocs.length} street arts created`)
    console.log(`${tableDocs.length} visits created`)
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
