import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import {
  Card,
  CardBody,
  CardSubtitle,
  Button,
  Row,
  Col,
  Container,
} from 'reactstrap'

export default function Tables() {
  const [tables, setTables] = useState([])
  useEffect(() => {
    api
      .getOpenTables()
      .then(tables => {
        setTables(tables)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <Container className="openTables">
      <Row>
        {tables
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
