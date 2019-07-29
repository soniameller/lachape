import React from 'react'
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Table,
  Form,
  Label,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
} from 'reactstrap'
import { Link } from 'react-router-dom'

export default function ClosedTables({
  getInputProps,
  handleClick,
  tableSer,
  dishes,
}) {
  return (
    <Container className="TableService mt-3">
      <pre style={{ color: 'red' }}>
        Populate is not working in server/routes/tables.js
      </pre>
      <Row>
        <Col>
          <h1>Table {tableSer.tableNb}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            <strong>Name: </strong> {tableSer.clientName} <br />
            <strong> Diners: </strong> {tableSer.amountOfPeople}
          </p>
        </Col>
      </Row>

      <Table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Orders</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableSer &&
            tableSer.orders.map(dish => (
              <tr key={dish._id}>
                <th>{dish.amount}</th>
                <th>{dish._dish.name}</th>
                <th>$ {dish._dish.price}</th>
              </tr>
            ))}
          <tr>
            <th />
            <th />
            <th>Total</th>
          </tr>
          <tr>
            <th>
              <Button>Share</Button>
            </th>
            <th>
              <Input type="select">
                <option value="" disabled>
                  ---No discount---
                </option>
                <option value="10">10%</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
              </Input>
            </th>
            <th>Total with discount</th>
          </tr>
        </tbody>
      </Table>
      <Form>
        <Label>Total paid:</Label>
        <Input type="number" />
      </Form>
      <Card>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
        </CardBody>

        <CardBody>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <CardLink href="#">Card Link</CardLink>
          <CardLink href="#">Another Link</CardLink>
        </CardBody>
      </Card>

      <Button tag={Link} onClick={handleClick} to={'/tables'} outline>
        Archive
      </Button>
    </Container>
  )
}
