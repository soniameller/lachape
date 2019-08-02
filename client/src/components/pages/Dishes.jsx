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

  if (api.isLoggedIn())
    return (
      <div className="Dishes">
        {/* <pre>
        {JSON.stringify(formValues, null, 2)}
        {JSON.stringify(dishes[0], null, 2)}
      </pre> */}
        <div className="Dishes__img">
          <Container className="pt-5">
            <Row>
              <Col>
                {api.isLoggedIn() && (
                  <Button className="btn-dark" onClick={handleClick}>
                    Add New
                  </Button>
                )}
              </Col>
              <Col>
                <Form>
                  <Row>
                    <input type="checkbox" {...getInputProps('food')} />
                    <Label className="mr-3 text-white" for="food">
                      Food
                    </Label>
                  </Row>
                  <Row>
                    <input type="checkbox" {...getInputProps('dessert')} />
                    <Label className="mr-3 text-white" for="dessert">
                      Dessert
                    </Label>
                  </Row>
                  {api.isLoggedIn() && (
                    <Row>
                      <input type="checkbox" {...getInputProps('drink')} />
                      <Label className="mr-3 text-white" for="drink">
                        Drink
                      </Label>
                    </Row>
                  )}
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" {...getInputProps('active')} />
                </th>
                <th>Active</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {[...filterDishesUser]
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
