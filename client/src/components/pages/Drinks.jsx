import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import api from '../../api'

export default function Menu() {
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    api
      .getDishes()
      .then(dishes => {
        setDishes(dishes)
      })
      .catch(err => console.log(err))
  }, [])

  let activeDrinks = [...dishes].filter(
    dish => dish.active && dish.type === 'Drink'
  )

  return (
    <div className="Background-img--cooks d-flex justify-content-center">
      <Container className="Menu text-center">
        <img
          className="Menu__img"
          height="100px"
          src="https://i.imgur.com/h9euwj3.png"
          alt=""
        />
        <Row className="curvedFont d-flex justify-content-center m-2">
          - Bebidas -
        </Row>
        <Row>
          <Col className="Menu__dishes">
            <ul>
              {[...activeDrinks]
                .filter(drink => drink.description === 'alcohol')
                .sort((a, b) => (a.name > b.name ? 1 : -1))

                .map(food => (
                  <li key={food._id}>
                    <p className="Menu__foodName">
                      {food.name} <small> •{food.price}</small>
                    </p>
                  </li>
                ))}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="Menu__dishes">
            <ul>
              {[...activeDrinks]
                .filter(drink => drink.description !== 'alcohol')
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map(food => (
                  <li key={food._id}>
                    <p className="Menu__foodName">
                      {food.name} <small> •{food.price}</small>
                    </p>
                  </li>
                ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
