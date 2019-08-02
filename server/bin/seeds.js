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
    active: false,
    price: 290,
    description: 'Chipirones',
    type: 'Food',
  }),
  new Dish({
    name: 'Ricota',
    _creator: userDocs[0]._id,
    active: true,
    price: 190,
    description: 'Ricota de cabla, verdes, almendras, pickle de cebolla morada',
    type: 'Food',
  }),
  new Dish({
    name: 'Salchicha',
    _creator: userDocs[0]._id,
    active: true,
    price: 230,
    description: 'Salchicha parillera y pebre andino',
    type: 'Food',
  }),
  new Dish({
    name: 'Pesca',
    _creator: userDocs[0]._id,
    active: true,
    price: 350,
    description: 'Pesca del día y manteca especiada',
    type: 'Food',
  }),
  new Dish({
    name: 'Bife',
    _creator: userDocs[0]._id,
    active: true,
    price: 390,
    description: 'Bife de chorizo y salsa verde',
    type: 'Food',
  }),
  new Dish({
    name: 'Pure cabutia',
    _creator: userDocs[0]._id,
    active: true,
    price: 165,
    description: 'Pure de cabutia, semiilas y verdes',
    type: 'Food',
  }),
  new Dish({
    name: 'Ensalada de tomate',
    _creator: userDocs[0]._id,
    active: true,
    price: 135,
    description: 'Ensalada de tomate, albahaca morada y flores de ajo',
    type: 'Food',
  }),
  new Dish({
    name: 'Banana',
    _creator: userDocs[1]._id,
    active: true,
    price: 160,
    description: 'Banana a la parrilla, miel, crema, menta y garrapiñada',
    type: 'Dessert',
  }),
  new Dish({
    name: 'Flan',
    _creator: userDocs[1]._id,
    active: true,
    price: 140,
    description: 'Flan de ines con dulce de leche casero',
    type: 'Dessert',
  }),
  new Dish({
    name: 'Cerveza rubia',
    _creator: userDocs[1]._id,
    active: true,
    price: 120,
    type: 'Drink',
    description: 'alcohol',
  }),
  new Dish({
    name: 'Cerveza ipa',
    _creator: userDocs[1]._id,
    active: true,
    price: 120,
    type: 'Drink',
    description: 'alcohol',
  }),
  new Dish({
    name: 'Botella azul tinto',
    _creator: userDocs[1]._id,
    active: true,
    price: 360,
    type: 'Drink',
    description: 'alcohol',
  }),
  new Dish({
    name: 'Botella vacas',
    _creator: userDocs[1]._id,
    active: true,
    price: 340,
    type: 'Drink',
    description: 'alcohol',
  }),
  new Dish({
    name: 'Botella piedras tinto',
    _creator: userDocs[1]._id,
    active: true,
    price: 380,
    type: 'Drink',
    description: 'alcohol',
  }),
  new Dish({
    name: 'Botella piedras blanco',
    _creator: userDocs[1]._id,
    active: true,
    price: 380,
    type: 'Drink',
    description: 'alcohol',
  }),
  new Dish({
    name: 'Descorche',
    _creator: userDocs[1]._id,
    active: true,
    price: 180,
    type: 'Drink',
    description: 'alcohol',
  }),
  new Dish({
    name: 'Gin tonic',
    _creator: userDocs[1]._id,
    active: true,
    price: 170,
    type: 'Drink',
    description: 'alcohol',
  }),
  new Dish({
    name: 'Botella azul blanco',
    _creator: userDocs[1]._id,
    active: true,
    price: 360,
    type: 'Drink',
    description: 'alcohol',
  }),
  new Dish({
    name: 'Copa azul blanco',
    _creator: userDocs[1]._id,
    active: true,
    price: 100,
    type: 'Drink',
    description: 'alcohol',
  }),
  new Dish({
    name: 'Copa azul tinto',
    _creator: userDocs[1]._id,
    active: true,
    price: 100,
    type: 'Drink',
    description: 'alcohol',
  }),
  new Dish({
    name: 'Agua mineral',
    _creator: userDocs[1]._id,
    active: true,
    price: 70,
    type: 'Drink',
  }),
  new Dish({
    name: 'Agua gas',
    _creator: userDocs[1]._id,
    active: true,
    price: 80,
    type: 'Drink',
  }),
  new Dish({
    name: 'Te',
    _creator: userDocs[1]._id,
    active: true,
    price: 60,
    type: 'Drink',
  }),
  new Dish({
    name: 'Café',
    _creator: userDocs[1]._id,
    active: true,
    price: 80,
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
    closedAt: new Date('2019-07-26T12:59:30.655+00:00'),
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
    tableNb: 11,
    total: 5000,
    state: 'archived',
    closedAt: new Date('2019-07-26T13:01:30.655+00:00'),
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
    tableNb: 10,
    total: 4500,
    state: 'archived',
    closedAt: new Date('2019-07-26T23:39:30.655+00:00'),
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
    tableNb: 9,
    total: 4500,
    state: 'archived',
    closedAt: new Date('2019-07-26T00:30:30.655+00:00'),
    orders: [
      { _dish: dishDocs[1]._id },
      { _dish: dishDocs[2]._id },
      { _dish: dishDocs[0]._id },
    ],
  }),
  new Table({
    clientName: 'Sonia',
    amountOfPeople: 3,
    tableNb: 1,
    state: 'open',
    orders: [
      { _dish: dishDocs[0]._id, amount: 2 },
      { _dish: dishDocs[1]._id, amount: 3 },
      { _dish: dishDocs[2]._id, amount: 2 },
      { _dish: dishDocs[3]._id, amount: 4 },
      { _dish: dishDocs[4]._id, amount: 1 },
      { _dish: dishDocs[5]._id, amount: 2 },
    ],
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
  new Table({
    tableNb: 20,
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
