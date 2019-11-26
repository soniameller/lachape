import React from 'react'
import { Jumbotron, Row, Col, Container, Table } from 'reactstrap'

export default function ClientCheck({
  tableSer,
  totalWithDiscount,
  formValues,
}) {
  return (
    <div className="Background-img--cooks">
      <Container className="pt-5">
        <Row className="text-white">
          <Col>
            <h1>Mesa {tableSer.tableNb}</h1>
          </Col>
        </Row>
        <Row className="text-white">
          <Col>
            <p>
              <strong /> {tableSer.clientName} <br />
            </p>
          </Col>
        </Row>
        <Jumbotron className="">
          <Table>
            <tbody>
              {tableSer &&
                tableSer.orders.map(dish => (
                  <tr key={dish._id}>
                    <th>{dish.amount}</th>
                    <td>{dish._dish.name}</td>
                    <td>$ {dish._dish.price * dish.amount}</td>
                  </tr>
                ))}

              <tr>
                <th />
                <th>{formValues.discount}</th>
                <th>
                  <p>${tableSer && totalWithDiscount()}</p>{' '}
                </th>
              </tr>
            </tbody>
          </Table>
          <Row>
            <Col xs="4">
              <img src="https://i.imgur.com/nJXlbMc.png" height="70px" alt="" />
            </Col>
            <Col xs="8">
              <h6> Muchas gracias!</h6>
              <h1 className="curvedFont">La Chapeña</h1>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    </div>
  )
}
