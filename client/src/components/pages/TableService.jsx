import React, { useState, useEffect } from 'react'
import { Table, Container, Button, Row, Col, Input, Spinner } from 'reactstrap'
import api from '../../api'
import { useForm } from '../../hooks'
import { Link } from 'react-router-dom'
import ClosedTables from '../ClosedTables'
import ArchivedTables from '../ArchivedTables'

export default function TableService(props) {
  const [dishes, setDishes] = useState([])
  const [tableSer, setTableSer] = useState(null)
  const tableId = props.match.params.id
  const { formValues, setFormValues, getInputProps } = useForm()
  const [isChange, setIsChange] = useState(null)

  useEffect(() => {
    api.getActiveDishes().then(dishes => {
      // console.log('THE DISHES ARE:', dishes)
      setDishes(dishes)
    })
  }, [])

  useEffect(() => {
    api
      .getTableId(tableId)

      .then(tableService => {
        // console.log('AHAHAHAHAHAHAHHAHAH', tableService)
        setTableSer(tableService)
      })
      .catch(err => console.log(err))
  }, [tableId])

  function closeTable() {
    setTableSer({ ...tableSer, state: 'closed' })
  }

  function handleChange() {
    console.log('what is tableSer in handlechange', tableSer)
    setTableSer({ ...tableSer, order: '' })
  }

  function handleDishAmount(i, amount) {
    console.log('what is i', i)

    console.log('to make it clear', tableSer)
    setTableSer({
      ...tableSer,
      orders: tableSer.orders.map(order => {
        if (order._id !== i) return order
        return {
          ...order,
          amount: order.amount + amount,
        }
      }),
    })
  }

  if (!tableSer) {
    return (
      <Container className="mt-5">
        <Spinner color="dark" />
      </Container>
    )
  }

  if (tableSer.state === 'open') {
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
              <th />
              <th>Orders</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <pre>{JSON.stringify(tableSer, null, 2)}</pre> */}
            {tableSer &&
              tableSer.orders.map(dish => (
                <tr key={dish._id}>
                  <th>{dish.amount}</th>
                  <th>{dish._dish.name}</th>
                  <th>
                    <Button
                      onClick={() => handleDishAmount(dish._id, +1)}
                      outline
                    >
                      +
                    </Button>
                    <Button
                      onClick={() => handleDishAmount(dish._id, -1)}
                      outline
                    >
                      -
                    </Button>
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
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map(d => (
                  <option key={d._id} value={d.name} onClick={handleChange}>
                    {d.name}
                  </option>
                ))}
            </Input>
            <Button color="dark" outline>
              Add Food!
            </Button>
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
                  <option key={d._id} value={d.name} onChange={handleChange}>
                    {d.name}
                  </option>
                ))}
            </Input>
            <Button color="dark" outline>
              Add Drink!
            </Button>
          </Col>
        </Row>
        <Button
          tag={Link}
          to={'/tables/' + tableSer._id}
          onClick={closeTable}
          outline
        >
          Close table
        </Button>
      </Container>
    )
  }

  if (tableSer.state === 'closed') {
    return (
      <ClosedTables
        //Is it necesary to repeat the names?
        getInputProps={getInputProps}
        formValues={formValues}
        tableSer={tableSer}
        setTableSer={setTableSer}
        dishes={dishes}
      />
    )
  }

  if (tableSer.state === 'archived') {
    return <ArchivedTables />
  }
}
