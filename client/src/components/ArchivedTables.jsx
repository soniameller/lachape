import React, { useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Table,
  Jumbotron,
  Form,
  Label,
} from 'reactstrap'
import api from '../api'

export default function ArchivedTables({ tableSer, formValues, setTableSer }) {
  useEffect(() => {
    api.editTable(tableSer._id, tableSer).then(table => {
      console.log('THE TABLES IS:', table)
      setTableSer({ ...tableSer })
    })
  }, [formValues])

  function amountPerPerson() {
    return Math.floor(tableSer.total / tableSer.amountOfPeople)
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
                <td>{dish._dish.name}</td>
                <td>$ {dish._dish.price * dish.amount}</td>
              </tr>
            ))}

          <tr>
            <th />
            <th>
              <pre style={{ color: 'red' }}>Discount {tableSer.discount}</pre>
            </th>
            <th>
              <p>${tableSer.total}</p>{' '}
            </th>
          </tr>
        </tbody>
      </Table>
      <Jumbotron>
        <Row>
          <Col>
            {' '}
            <h6 className="display-3">Balance</h6>
          </Col>
          <Col />
        </Row>
        <hr className="my-2" />
        <Row>
          <Col>
            <p className="lead">
              Amount per person: <strong>${amountPerPerson()} </strong>{' '}
            </p>
          </Col>
          <Col>
            <p>Change/Tips:$ {tableSer.tips}</p>
          </Col>
        </Row>
      </Jumbotron>
    </Container>
  )
}
