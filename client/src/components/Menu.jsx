import React from 'react'
import { Table, Button, Form, Label, Container, Row, Col } from 'reactstrap'

export default function Menu({ dishes }) {
  let activefood = [...dishes].filter(dish => dish.type === 'Food')

  return (
    <div className="Background-img--cooks d-flex justify-content-center">
      <Container className="Menu">
        <Row className="curvedFont">Menu</Row>
        <Row>
          <Col>
            <h5>Dishes</h5>
            <ul>
              {activefood.map(food => (
                <li key={food._id}>
                  <p>{food.name}</p>
                  <small>{food.description}</small>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>Dessert</Row>
            <Row>Drinks</Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
