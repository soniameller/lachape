import React, { useState, useEffect } from 'react'
import { Table, Button, Form, Label, Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks'
import Menu from '../Menu'

import api from '../../api'

export default function Dishes(props) {
  const [dishes, setDishes] = useState([])
  const { formValues, setFormValues, getInputProps } = useForm({
    food: true,
    drink: true,
    dessert: true,
    active: false,
  })

  useEffect(() => {
    api
      .getDishes()
      .then(dishes => {
        setDishes(dishes)
      })
      .catch(err => console.log(err))
  }, [])

  //TODO correct the push route
  function handleClick() {
    api
      .addDish()
      .then(dish => {
        console.log('Created dish', dish)
        props.history.push('/edit-dish/' + dish.dish._id)
      })
      .catch(err => console.log(err))
  }

  function handleChange(dishId) {
    let copyDishes = [...dishes]
    let dishToModify = copyDishes.find(dish => dish._id === dishId)
    dishToModify.active = !dishToModify.active
    setDishes(copyDishes)
    // console.log('The new dish is', d)
    api.toggleActiveDish(dishId)
  }

  let filterDishesUser = dishes.filter(
    dish =>
      ((formValues.food && dish.type === 'Food') ||
        (formValues.dessert && dish.type === 'Dessert') ||
        (formValues.drink && dish.type === 'Drink')) &&
      (!formValues.active || dish.active)
  )

  let foodFilter = dishes.filter(
    dish =>
      formValues.food &&
      dish.type === 'Food' &&
      (!formValues.active || dish.active)
  )
  let drinkFilter = dishes.filter(
    dish =>
      formValues.drink &&
      dish.type === 'Drink' &&
      (!formValues.active || dish.active)
  )
  let dessertFilter = dishes.filter(
    dish =>
      formValues.dessert &&
      dish.type === 'Dessert' &&
      (!formValues.active || dish.active)
  )

  if (api.isLoggedIn())
    return (
      <div className="Dishes">
        {/* <pre>
        {JSON.stringify(formValues, null, 2)}
        {JSON.stringify(dishes[0], null, 2)}
      </pre> */}
        <div className="Dishes__img p-5">
          <Container>
            <Row>
              <Col>
                <Button className="btn-dark" onClick={handleClick}>
                  Add New
                </Button>
              </Col>
              <Col>
                <input
                  type="checkbox"
                  id="active"
                  className="text-white mt-3"
                  {...getInputProps('active')}
                />
                <Label className="ml-3 mt-2 text-white" for="active">
                  ACTIVE
                </Label>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Table>
            <tbody>
              <tr>
                <th>
                  {formValues.food && (
                    <img
                      height="30px"
                      src="https://i.imgur.com/iUCHOCt.png"
                      alt=""
                    />
                  )}
                  {!formValues.food && (
                    <img
                      height="30px"
                      src="https://i.imgur.com/pBKElae.png"
                      alt=""
                    />
                  )}
                  <input
                    style={{ opacity: 0 }}
                    type="checkbox"
                    id="food"
                    {...getInputProps('food')}
                  />
                </th>
                <th>
                  <Label className="mr-3" for="food">
                    FOOD
                  </Label>
                </th>
                <th />
                <th />
              </tr>
              {[...foodFilter]
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((d, i) => (
                  <tr key={d._id}>
                    <td>
                      <input
                        type="checkbox"
                        name="active"
                        checked={d.active}
                        onChange={() => handleChange(d._id)}
                      />
                    </td>
                    <td>
                      <small>{d.name}</small>
                    </td>
                    <td>
                      <small>$ {d.price}</small>
                    </td>
                    <td>
                      <Button
                        className="btn-sm"
                        tag={Link}
                        to={'/dishes/' + d._id}
                        outline
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              <tr>
                <th>
                  {formValues.dessert && (
                    <img
                      height="30px"
                      src="https://i.imgur.com/T3hXJAs.png"
                      alt=""
                    />
                  )}
                  {!formValues.dessert && (
                    <img
                      height="30px"
                      src="https://i.imgur.com/9rKMbxy.png"
                      alt=""
                    />
                  )}
                  <input
                    type="checkbox"
                    id="dessert"
                    {...getInputProps('dessert')}
                    style={{ opacity: 0 }}
                  />
                </th>
                <th>
                  <Label className="mr-3 " for="dessert">
                    DESSERT
                  </Label>
                </th>
                <th />
                <th />
              </tr>
              {[...dessertFilter]
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((d, i) => (
                  <tr key={d._id}>
                    <td>
                      <input
                        type="checkbox"
                        name="active"
                        checked={d.active}
                        onChange={() => handleChange(d._id)}
                      />
                    </td>
                    <td>
                      <small>{d.name}</small>
                    </td>
                    <td>
                      <small>$ {d.price}</small>
                    </td>
                    <td>
                      <Button
                        className="btn-sm"
                        tag={Link}
                        to={'/dishes/' + d._id}
                        outline
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              <tr>
                <th>
                  {formValues.drink && (
                    <img
                      height="25px"
                      src="https://i.imgur.com/h7OESb9.png"
                      alt=""
                    />
                  )}
                  {!formValues.drink && (
                    <img
                      height="25px"
                      src="https://i.imgur.com/xxIzDap.png"
                      alt=""
                    />
                  )}
                  <input
                    type="checkbox"
                    id="drink"
                    {...getInputProps('drink')}
                    style={{ opacity: 0 }}
                  />
                </th>
                <th>
                  <Label className="mr-3 " for="drink">
                    DRINKS
                  </Label>
                </th>
                <th />
                <th />
              </tr>
              {[...drinkFilter]
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((d, i) => (
                  <tr key={d._id}>
                    <td>
                      <input
                        type="checkbox"
                        name="active"
                        checked={d.active}
                        onChange={() => handleChange(d._id)}
                      />
                    </td>
                    <td>
                      <small>{d.name}</small>
                    </td>
                    <td>
                      <small>$ {d.price}</small>
                    </td>
                    <td>
                      <Button
                        className="btn-sm"
                        tag={Link}
                        to={'/dishes/' + d._id}
                        outline
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      </div>
    )
  if (!api.isLoggedIn()) return <Menu dishes={dishes} />
}
