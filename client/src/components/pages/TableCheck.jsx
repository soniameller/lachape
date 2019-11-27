import React, { useEffect, useState } from 'react'
import { Jumbotron, Row, Col, Container, Table } from 'reactstrap'
import api from '../../api'

export default function TableCheck(props) {
  const tableId = props.match.params.id
  const [tableSer, setTableSer] = useState(null)

  useEffect(() => {
    api
      .getTableId(tableId)
      .then(tableService => {
        setTableSer(tableService)
      })
      .catch(err => console.log(err))
  }, [tableId])

  return (
    <div className="Background-img--cooks">
      <Container className="pt-5">
        <Row className="text-white">
          <Col>{tableSer && <h1>Mesa {tableSer.tableNb}</h1>}</Col>
        </Row>
        <Row className="text-white">
          <Col>
            {tableSer && (
              <p>
                {tableSer.clientName} <br />
              </p>
            )}
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
                {(tableSer && tableSer.discount && tableSer.discount !== 1 && (
                  <th className="curvedFont--sm">
                    {tableSer.discount * 100 - 100}% friend discount ♥︎{' '}
                  </th>
                )) || <th />}
                <th>
                  <p>${tableSer && tableSer.total}</p>{' '}
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
