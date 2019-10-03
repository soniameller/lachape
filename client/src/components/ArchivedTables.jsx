import React, { useEffect, useState } from 'react'
import api from '../api'
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Jumbotron,
  ModalHeader,
  Modal,
  ModalFooter,
  ModalBody,
} from 'reactstrap'

export default function ArchivedTables({
  tableSer,
  formValues,
  setTableSer,
  history,
}) {
  useEffect(() => {
    api.editTable(tableSer._id, tableSer).then(table => {
      setTableSer({ ...tableSer })
    })
  }, [formValues])

  function handleDelete() {
    api
      .deleteTable(tableSer._id)
      .then(table => {
        history.push('/history')
      })
      .catch(err => console.log(err))
  }

  const [isOpen, setIsOpen] = useState({ modal: false })
  function toggle() {
    setIsOpen({ modal: !isOpen.modal })
  }

  function amountPerPerson() {
    return Math.floor(tableSer.total / tableSer.amountOfPeople)
  }

  return (
    <div>
      <div className="Tables__img text-white">
        <Container className="TableService pt-3">
          <Row>
            <Col>
              <h1>Mesa {tableSer.tableNb}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                <strong>Nombre: </strong> {tableSer.clientName} <br />
                <strong> Personas: </strong> {tableSer.amountOfPeople}
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Table>
          <thead>
            <tr>
              <th />
              <th>Pedidos</th>
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
                {tableSer && tableSer.discount && (
                  <pre style={{ color: 'red' }}>
                    Descuento {tableSer.discount * 100 - 100}%
                  </pre>
                )}
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
              <h6 className="display-3">Totals</h6>
            </Col>
            <Col />
          </Row>
          <hr className="my-2" />
          <Row>
            <Col>
              <p className="lead">
                Cantidad de personas: <strong>${amountPerPerson()} </strong>{' '}
              </p>
            </Col>
            <Col>
              <p>Cambio/Propinas:$ {tableSer.tips}</p>
            </Col>
          </Row>
          <Row>
            <Col />
            <Col>
              <Button color="danger" outline onClick={toggle}>
                Borrar
              </Button>
              <Modal isOpen={isOpen.modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> ⚠️ BORRAR ⚠️</ModalHeader>
                <ModalBody>Una vez borrado no vuelve amigues</ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={handleDelete}>
                    Borrar
                  </Button>
                </ModalFooter>
              </Modal>
            </Col>
            <Col />
          </Row>
        </Jumbotron>
      </Container>
    </div>
  )
}
