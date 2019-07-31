import React, { useState, useEffect } from 'react'
import { Table, Button, Form, Label, Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks'

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

  let filterDishes = dishes.filter(
    dish =>
      ((formValues.food && dish.type === 'Food') ||
        (formValues.dessert && dish.type === 'Dessert') ||
        (api.isLoggedIn() && formValues.drink && dish.type === 'Drink')) &&
      (!formValues.active || dish.active)
  )

  return (
    <div className="Dishes">
      {/* <pre>
        {JSON.stringify(formValues, null, 2)}
        {JSON.stringify(dishes[0], null, 2)}
      </pre> */}
      <div className="Dishes__img">
        <Container className="pt-5">
          {api.isLoggedIn() && (
            <Button className="btn-dark" onClick={handleClick}>
              Add New
            </Button>
          )}
          <Form className="m-3">
            <Row>
              <Col>
                <input type="checkbox" {...getInputProps('food')} /> {'  '}
                <Label className="mr-3 text-white" for="food">
                  Food
                </Label>
              </Col>
              <Col>
                <input type="checkbox" {...getInputProps('dessert')} />
                {'  '}
                <Label className="mr-3 text-white" for="dessert">
                  Dessert
                </Label>
              </Col>
              {api.isLoggedIn() && (
                <Col>
                  {' '}
                  <input type="checkbox" {...getInputProps('drink')} />
                  <Label className="mr-3 text-white" for="drink">
                    Drink
                  </Label>
                </Col>
              )}
            </Row>
          </Form>
        </Container>
      </div>
      <Container>
        <Table>
          <thead>
            <tr>
              {api.isLoggedIn() && (
                <th>
                  <input type="checkbox" {...getInputProps('active')} />
                </th>
              )}
              <th>Active</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {[...filterDishes]
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((d, i) => (
                <tr key={d._id}>
                  {api.isLoggedIn() && (
                    <td>
                      <input
                        type="checkbox"
                        name="active"
                        checked={d.active}
                        onChange={() => handleChange(d._id)}
                      />
                    </td>
                  )}
                  <td>{d.name}</td>
                  <td>$ {d.price}</td>
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
}
