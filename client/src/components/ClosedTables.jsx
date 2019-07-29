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
  Jumbotron,
} from 'reactstrap'
import { Link } from 'react-router-dom'

export default function ClosedTables({
  getInputProps,
  handleClick,
  tableSer,
  dishes,
}) {
  function getTablesTotal() {
    console.log('Table service ', tableSer)
    return tableSer.orders.reduce(
      (counter, table) => counter + table._dish.price,
      0
    )
  }

  return (
    <Container className="TableService mt-3">
      {/* <pre style={{ color: 'red' }}>
        Populate is not working in server/routes/tables.js
      </pre> */}
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
                <th>{dish._dish.name}</th>
                <th>$ {dish._dish.price}</th>
              </tr>
            ))}
          <tr>
            <th />
            <th />
            <th>{tableSer && getTablesTotal()}</th>
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
      <Jumbotron>
        <Row>
          <Col>
            {' '}
            <h6 className="display-3">Balance</h6>
          </Col>
          <Col>
            {' '}
            <Form>
              <Label>Total paid:</Label>
              <Input type="number" />
            </Form>
          </Col>
        </Row>
        <hr className="my-2" />
        <Row>
          <Col>
            <p className="lead">Amount per person: $ xxx</p>
          </Col>
          <Col>
            <p>Change/Tips:</p> <p>Tips %:</p>
          </Col>
        </Row>

        <p className="lead">
          <Button
            color="dark"
            tag={Link}
            onClick={handleClick}
            to={'/tables'}
            outline
          >
            Archive
          </Button>
        </p>
      </Jumbotron>
    </Container>
  )
}
