import React, { useState, useEffect } from 'react'
import { Table, Container, Button, Row, Col, Input, Spinner } from 'reactstrap'
import api from '../../api'
import { useForm } from '../../hooks'
import { Link } from 'react-router-dom'
import ClosedTables from '../ClosedTables'
import ArchivedTables from '../ArchivedTables'
import ClientCheck from '../ClientCheck'

export default function TableService(props) {
  const [dishes, setDishes] = useState([])
  const [tableSer, setTableSer] = useState(null)
  const tableId = props.match.params.id
  const { formValues, setFormValues, getInputProps } = useForm()

  useEffect(() => {
    api.getActiveDishes().then(dishes => {
      setDishes(dishes)
    })
  }, [])

  useEffect(() => {
    api
      .getTableId(tableId)
      .then(tableService => {
        setTableSer(tableService)
      })
      .catch(err => console.log(err))
  }, [tableId])

  function closeTable() {
    setTableSer({ ...tableSer, state: 'closed' })
  }

  function handleChangeInTableDishes(event) {
    const id = event.target.value
    const _dish = dishes.find(dish => dish._id === id)
    let newOrders = [...tableSer.orders]
    let indexOfOrder = tableSer.orders.findIndex(o => o._dish._id === id)
    if (indexOfOrder === -1) {
      newOrders.push({
        amount: 1,
        _dish,
      })
    } else {
      newOrders[indexOfOrder].amount++
    }
    api
      .editTable(tableId, {
        ...tableSer,
        orders: newOrders,
      })
      .then(t => {
        setTableSer(t.table)
      })
  }

  function handleChangeInNumberOfPeople(event) {
    const number = event.target.value
    api.editTable(tableId, {
      ...tableSer,
      amountOfPeople: number,
    })
    setTableSer({ ...tableSer, amountOfPeople: number })
  }

  function handleChangeInClientName(event) {
    const name = event.target.value
    api.editTable(tableId, {
      ...tableSer,
      clientName: name,
    })
    setTableSer({ ...tableSer, clientName: name })
  }

  function handleDishAmount(i, amount) {
    console.log('what is i', i)
    console.log('to make it clear', tableSer)

    api.editTable(tableId, {
      ...tableSer,
      orders: tableSer.orders
        .map(order => {
          if (order._id !== i) return order

          return {
            ...order,
            amount: order.amount + amount,
          }
        })
        .filter(order => order.amount > 0),
    })

    setTableSer({
      ...tableSer,
      orders: tableSer.orders
        .map(order => {
          if (order._id !== i) return order

          return {
            ...order,
            amount: order.amount + amount,
          }
        })
        .filter(order => order.amount > 0),
    })
  }

  function handleTimeTracking() {
    if (!tableSer.waitingSince) {
      api.startTrackingTable(tableId).then(data => {
        setTableSer({ ...tableSer, waitingSince: data.table.waitingSince })
        console.log('table Service', tableSer)
      })
    } else {
      api.stopTrackingTable(tableId).then(data => {
        setTableSer({ ...tableSer, waitingSince: null })
        console.log('table Service', tableSer)
      })
    }
  }

  if (!tableSer) {
    return (
      <Container className="mt-5">
        <Spinner color="dark" />
      </Container>
    )
  }

  if (tableSer.state === 'open' && api.isLoggedIn()) {
    return (
      <div>
        {/* <pre>{JSON.stringify(tableSer, null, 2)}</pre> */}
        <div className="Tables__img text-white">
          <Container className="TableService pt-3">
            <Row>
              <Col>
                <h1>Table {tableSer.tableNb}</h1>
              </Col>
              <Col>
                <Input
                  name="amountOfPeople"
                  type="number"
                  placeholder="Number of people"
                  min="1"
                  max="8"
                  onChange={handleChangeInNumberOfPeople}
                  value={tableSer.amountOfPeople}
                />
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Button onClick={handleTimeTracking}>
                  {tableSer.waitingSince ? 'Stop' : 'Start'} tracking
                </Button>
              </Col>
              <Col>
                <Input
                  name="clientName"
                  value={tableSer.clientName}
                  type="text"
                  placeholder="Client's name"
                  onChange={handleChangeInClientName}
                />
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
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
                        className="btn btn-default btn-circle"
                        onClick={() => handleDishAmount(dish._id, +1)}
                        outline
                      >
                        +
                      </Button>
                      <Button
                        className="btn btn-default btn-circle"
                        onClick={() => handleDishAmount(dish._id, -1)}
                        outline
                      >
                        -
                      </Button>
                      {/* <Button
                        class="btn btn-square"
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
                      </Button> */}
                    </th>
                  </tr>
                ))}
            </tbody>
          </Table>

          <Row className="my-4">
            <Col>
              <Input
                type="select"
                {...getInputProps('food')}
                onChange={handleChangeInTableDishes}
              >
                <option value="" disabled>
                  ---Food---
                </option>
                {[...dishes]
                  .filter(
                    dish => dish.type === 'Food' || dish.type === 'Dessert'
                  )
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map(d => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
              </Input>
            </Col>
            <Col>
              <Input
                type="select"
                {...getInputProps('drink')}
                onChange={handleChangeInTableDishes}
              >
                <option value="" disabled>
                  ---Drink---
                </option>
                {[...dishes]
                  .filter(dish => dish.type === 'Drink')
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map(d => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
              </Input>
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
      </div>
    )
  }

  if (tableSer.state === 'closed' && api.isLoggedIn()) {
    return (
      <ClosedTables
        //Is it necesary to repeat the names?
        getInputProps={getInputProps}
        formValues={formValues}
        tableSer={tableSer}
        setTableSer={setTableSer}
        dishes={dishes}
        history={props.history}
      />
    )
  }

  if (tableSer.state === 'archived' && api.isLoggedIn()) {
    return (
      <ArchivedTables
        tableSer={tableSer}
        formValues={formValues}
        setTableSer={setTableSer}
        history={props.history}
      />
    )
  } else return <ClientCheck tableSer={tableSer} formValues={formValues} />
}
