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
    email: 'sonia@lachape.com',
    password: bcrypt.hashSync('sm', bcrypt.genSaltSync(bcryptSalt)),
    isValidated: true,
    nickname: 'Somi',
    role: 'admin',
  }),
  new User({
    email: 'virginia@lachape.com',
    password: bcrypt.hashSync('vb', bcrypt.genSaltSync(bcryptSalt)),
    isValidated: true,
    nickname: 'Viejita',
    role: 'admin',
  }),
  new User({
    email: 'esteban@lachape.com',
    password: bcrypt.hashSync('es', bcrypt.genSaltSync(bcryptSalt)),
    isValidated: true,
    nickname: 'Esteban',
    role: 'admin',
  }),
  new User({
    email: 'franciso@lachape.com',
    password: bcrypt.hashSync('fs', bcrypt.genSaltSync(bcryptSalt)),
    isValidated: true,
    nickname: 'Gauchi',
    role: 'admin',
  }),
  new User({
    email: 'franco@lachape.com',
    password: bcrypt.hashSync('fg', bcrypt.genSaltSync(bcryptSalt)),
    isValidated: true,
    nickname: 'Franquito',
    role: 'admin',
  }),
  new User({
    email: 'ana@lachape.com',
    password: bcrypt.hashSync('as', bcrypt.genSaltSync(bcryptSalt)),
    isValidated: true,
    nickname: 'Anucha',
    role: 'admin',
  }),
  new User({
    email: 'cuky@lachape.com',
    password: bcrypt.hashSync('cm', bcrypt.genSaltSync(bcryptSalt)),
    isValidated: true,
    nickname: 'Custer',
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
