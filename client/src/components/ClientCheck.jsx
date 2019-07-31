import React from 'react'
import {
  Jumbotron,
  Row,
  Col,
  Form,
  Label,
  Input,
  Container,
  Table,
} from 'reactstrap'

export default function ClientCheck({
  getInputProps,
  amountPerPerson,
  tipsPercentage,
  tips,
  tableSer,
  totalWithDiscount,
  formValues,
}) {
  return (
    <div className="Background-img">
      <Container className="pt-5">
        <Row className="text-white">
          <Col>
            <h1>Table {tableSer.tableNb}</h1>
          </Col>
        </Row>
        <Row className="text-white">
          <Col>
            <p>
              <strong>Name: </strong> {tableSer.clientName} <br />
            </p>
          </Col>
        </Row>
        <Jumbotron className="">
          <Table>
            <thead>
              <tr>
                <th />
                <th>Orders</th>
                <th>Total</th>
              </tr>
            </thead>
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
                <th>
                  <pre>{formValues.discount}</pre>
                </th>
                <th>
                  <p>${tableSer && totalWithDiscount()}</p>{' '}
                </th>
              </tr>
            </tbody>
          </Table>
          <div className="ml-auto">
            <h6>Gracias por venir, </h6>
            <h1 className="curvedFont">La Chape</h1>
          </div>
        </Jumbotron>
      </Container>
    </div>
  )
}
