import React from 'react'
import { Table, Button, Form, Label, Container, Row, Col } from 'reactstrap'

export default function Menu({ dishes }) {
  let activefood = [...dishes].filter(
    dish => dish.active && dish.type === 'Food'
  )
  let activeDessert = [...dishes].filter(
    dish => dish.active && dish.type === 'Dessert'
  )

  return (
    <div className="Background-img--cooks d-flex justify-content-center">
      <Container className="Menu text-center">
        {/* <img
          className="Menu__img"
          height="100px"
          src="https://i.imgur.com/h9euwj3.png"
          alt=""
        /> */}
        <Row className="curvedFont d-flex justify-content-center m-2">Menu</Row>
        <Row>
          <Col className="Menu__dishes">
            <h5>Platos</h5>
            <ul>
              {activefood.map(food => (
                <li key={food._id}>
                  <p className="Menu__foodName">
                    {food.name} <small> •{food.price}</small>
                  </p>
                  <p className="Menu__description">{food.description}</p>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="Menu__dishes">
            <h5>Postres</h5>
            <ul>
              {activeDessert.map(food => (
                <li key={food._id}>
                  <p className="Menu__foodName">
                    {food.name} <small> •{food.price}</small>
                  </p>
                  <p className="Menu__description">{food.description}</p>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
