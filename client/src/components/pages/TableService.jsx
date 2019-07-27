import React, { useState, useEffect } from 'react'
import { Table, Container, Button, Row, Col, Input, Label } from 'reactstrap'
import api from '../../api'
import { useForm } from '../../hooks'
import { Link } from 'react-router-dom'

export default function TableService(props) {
  const [dishes, setDishes] = useState([])
  useEffect(() => {
    api.getActiveDishes().then(dishes => {
      setDishes(dishes)
    })
  }, [])

  const { formValues, setFormValues, getInputProps } = useForm()

  const tableId = props.match.params.id
  const [tableSer, setTableSer] = useState(null)
  useEffect(() => {
    api
      .getTableId(tableId)
      .then(tableService => {
        console.log('AHAHAHAHAHAHAHHAHAH', tableService)
        setTableSer(tableService)
      })
      .catch(err => console.log(err))
  }, [tableId])

  if (!tableSer) {
    return <div>Loading...</div>
  }

  return (
    <Container className="TableService mt-3">
      <Row>
        <Col>
          <h1>Table {tableSer.tableNb}</h1>
        </Col>
        <Col>
          <Input
            type="number"
            placeholder="Number of people"
            min="1"
            max="5"
            {...getInputProps('number')}
          />
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Button>Start tracking</Button>
        </Col>
        <Col>
          <Input
            type="text"
            placeholder="Client's name"
            {...getInputProps('name')}
          />
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
                <th>{dish._dish}</th>
                <th>
                  <Button outline>+</Button> <Button outline>-</Button>
                </th>
              </tr>
            ))}
        </tbody>
      </Table>

      <Row className="my-4">
        <Col>
          <Input type="select" {...getInputProps('food')}>
            <option value="" disabled>
              ---Food---
            </option>
            {[...dishes]
              .filter(dish => dish.type === 'Food' || dish.type === 'Dessert')
              .map(d => (
                <option key={d._id} value={d}>
                  {d.name}
                </option>
              ))}
          </Input>
        </Col>
        <Col>
          <Input type="select" {...getInputProps('drink')}>
            <option value="" disabled>
              ---Drink---
            </option>
            {[...dishes]
              .filter(dish => dish.type === 'Drink')
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map(d => (
                <option key={d._id} value={d}>
                  {d.name}
                </option>
              ))}
          </Input>
        </Col>
      </Row>
      <Button tag={Link} to={/*'/tables-closed/' + */ tableSer._id} outline>
        Close table
      </Button>
    </Container>
  )
}
