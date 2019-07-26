const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Dish = require('../models/Dish')
const Table = require('../models/Table')

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
  new User({
    email: 'mellersonia@gmail.com',
    password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
    isValidated: true,
    nickname: 'Somi',
    role: 'admin',
  }),
]

let dishDocs = [
  new Dish({
    name: 'Chipirones',
    _creator: userDocs[0]._id,
    active: true,
    price: 290,
    description: 'Chipirones bla bla bla',
    type: 'Food',
  }),
  new Dish({
    name: 'Flan De Ines',
    _creator: userDocs[1]._id,
    active: true,
    price: 170,
    description: 'Flan con crema y dulce de leche de oveja',
    type: 'Dessert',
  }),
  new Dish({
    name: 'Cerveza',
    _creator: userDocs[1]._id,
    active: true,
    price: 120,
    type: 'Drink',
  }),
]

let tableDocs = [
  new Table({
    clientName: 'Sonia',
    _creator: userDocs[1]._id,
    amountOfPeople: 4,
    tableNb: 12,
    total: 3270,
    state: 'archived',
    orders: [
      { _dish: dishDocs[1]._id },
      { _dish: dishDocs[2]._id },
      { _dish: dishDocs[0]._id },
    ],
  }),
  new Table({
    clientName: 'António',
    _creator: userDocs[1]._id,
    amountOfPeople: 7,
    tableNb: 12,
    total: 5000,
    state: 'archived',
    orders: [
      { _dish: dishDocs[1]._id },
      { _dish: dishDocs[2]._id },
      { _dish: dishDocs[0]._id },
    ],
  }),
  new Table({
    clientName: 'Maxence',
    _creator: userDocs[1]._id,
    amountOfPeople: 2,
    tableNb: 11,
    total: 4500,
    state: 'archived',
    orders: [
      { _dish: dishDocs[1]._id },
      { _dish: dishDocs[2]._id },
      { _dish: dishDocs[0]._id },
    ],
  }),
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
    clientName: 'Sonia',
    _creator: userDocs[0]._id,
    amountOfPeople: 3,
    tableNb: 12,
    state: 'closed',
    orders: [
      { _dish: dishDocs[1]._id, amount: 2 },
      { _dish: dishDocs[2]._id },
      { _dish: dishDocs[0]._id },
    ],
  }),
  new Table({
    clientName: 'Sonia',
    _creator: userDocs[0]._id,
    amountOfPeople: 3,
    tableNb: 12,
    state: 'closed',
    orders: [{ _dish: dishDocs[2]._id, amount: 2 }, { _dish: dishDocs[0]._id }],
  }),
  new Table({
    tableNb: 1,
  }),
  new Table({
    tableNb: 2,
  }),
  new Table({
    tableNb: 3,
  }),
  new Table({
    tableNb: 4,
  }),
  new Table({
    tableNb: 5,
  }),
  new Table({
    tableNb: 6,
  }),
  new Table({
    tableNb: 7,
  }),
  new Table({
    tableNb: 8,
  }),
  new Table({
    tableNb: 9,
  }),
  new Table({
    tableNb: 10,
  }),
  new Table({
    tableNb: 11,
  }),
  new Table({
    tableNb: 12,
  }),
  new Table({
    tableNb: 13,
  }),
  new Table({
    tableNb: 14,
  }),
  new Table({
    tableNb: 15,
  }),
  new Table({
    tableNb: 16,
  }),
  new Table({
    tableNb: 17,
  }),
  new Table({
    tableNb: 18,
  }),
  new Table({
    tableNb: 19,
  }),
]

Promise.all([User.deleteMany(), Dish.deleteMany(), Table.deleteMany()])
  .then(() => {
    console.log('All users, dishes and tables have been deleted')

    return Promise.all([
      User.create(userDocs),
      Dish.create(dishDocs),
      Table.create(tableDocs),
    ])
  })
  .then(() => {
    console.log(`${userDocs.length} users created`)
    console.log(`${dishDocs.length} dishes created`)
    console.log(`${tableDocs.length} tables created`)
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
