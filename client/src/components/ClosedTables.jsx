import React, { useEffect } from 'react'
import api from '../api'

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
  tableSer,
  dishes,
  formValues,
  setTableSer,
}) {
  useEffect(() => {
    api.editTable(tableSer._id, tableSer).then(table => {
      console.log('THE TABLES IS:', table)
      setTableSer({ ...tableSer, total: totalWithDiscount(), tips: tips() })
    })
  }, [formValues])

  function getTablesTotal() {
    console.log('Table service ', tableSer)

    return tableSer.orders.reduce(
      (counter, table) => counter + table._dish.price * table.amount,
      0
    )
  }
  function totalWithDiscount() {
    if (formValues.discount) return getTablesTotal() * formValues.discount
    else return getTablesTotal()
  }

  function amountPerPerson() {
    return Math.floor(totalWithDiscount() / tableSer.amountOfPeople)
  }

  function tips() {
    if (formValues.paid) return formValues.paid - totalWithDiscount()
  }
  function tipsPercentage() {
    if (formValues.paid) return Math.floor((tips() * 100) / totalWithDiscount())
  }

  function openTable() {
    setTableSer({ ...tableSer, state: 'open' })
  }
  function archiveTable() {
    setTableSer({ ...tableSer, state: 'archive' })
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
            <th>
              <Button>Share</Button>
            </th>
            <th>
              <Input type="select" {...getInputProps('discount')}>
                <option value="1">---No discount---</option>
                <option value="0.9">10% friend discount</option>
                <option value="0.85">15% discount</option>
                <option value="0.8">20% family discount</option>
              </Input>
            </th>
            <th>
              <p>${tableSer && totalWithDiscount()}</p>{' '}
            </th>
          </tr>
        </tbody>
      </Table>
      {/* <pre>{JSON.stringify(formValues)}</pre> */}
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
              <Input type="number" {...getInputProps('paid')} />
            </Form>
          </Col>
        </Row>
        <hr className="my-2" />
        <Row>
          <Col>
            <p className="lead">
              Amount per person: <strong>$ {amountPerPerson()}</strong>{' '}
            </p>
          </Col>
          <Col>
            <p>Change/Tips:$ {tips()}</p> <p>Tips: {tipsPercentage()}%</p>
          </Col>
        </Row>

        <Row className="lead">
          <Col />
          <Button color="dark" onClick={openTable} outline>
            Edit
          </Button>{' '}
          <Col>
            <Button color="dark" onClick={archiveTable}>
              Archive
            </Button>
          </Col>
          <Col />
        </Row>
      </Jumbotron>
    </Container>
  )
}
