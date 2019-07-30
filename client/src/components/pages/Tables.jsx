import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import {
  CardBody,
  CardSubtitle,
  Button,
  Row,
  Col,
  Container,
  Spinner,
} from 'reactstrap'

export default function Tables() {
  const [tables, setTables] = useState([])
  useEffect(() => {
    api
      .getTables()
      .then(tables => {
        setTables(tables)
      })
      .catch(err => console.log(err))
  }, [])

  if (tables.length === 0) {
    return (
      <Container className="mt-5">
        <Spinner color="dark" />
      </Container>
    )
  }

  return (
    <Container className="openTables">
      <Row>
        {tables
          .filter(table => table.state === 'open' || table.state === 'closed')
          .sort((a, b) => (a.tableNb > b.tableNb ? 1 : -1))
          .map(t => (
            <Col key={t._id} xs="4" sm="2">
              {/* <Card className="mt-1 mb-1" > */}
              <CardBody>
                <Button tag={Link} to={'/tables/' + t._id}>
                  T{t.tableNb}
                </Button>
                <CardSubtitle>
                  <small>23min...</small>{' '}
                </CardSubtitle>
              </CardBody>
              {/* </Card> */}
            </Col>
          ))}
      </Row>
    </Container>
  )
}
