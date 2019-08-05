import React, { useEffect, useState } from 'react'
import api from '../api'

// import { Link } from 'react-router-dom'

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
  ModalHeader,
  Modal,
  ModalFooter,
  ModalBody,
} from 'reactstrap'

// import { Document, Page } from 'react-pdf'

import { WhatsappShareButton, WhatsappIcon } from 'react-share'

export default function ClosedTables({
  getInputProps,
  tableSer,
  dishes,
  formValues,
  setTableSer,
  history,
}) {
  function amountPerPerson() {
    return Math.floor(totalWithDiscount() / tableSer.amountOfPeople)
  }

  function tips() {
    if (formValues.paid) return formValues.paid - totalWithDiscount()
    else return 0
  }
  function tipsPercentage() {
    if (formValues.paid) return Math.floor((tips() * 100) / totalWithDiscount())
  }

  function totalWithDiscount() {
    let total = tableSer.orders.reduce(
      (counter, table) => counter + table._dish.price * table.amount,
      0
    )
    if (formValues.discount) return total * formValues.discount
    else return total
  }

  function handleOpen() {
    setTableSer({ ...tableSer, state: 'open' })
  }

  function handleArchive() {
    api
      .archiveAndAddTable({ tableNb: tableSer.tableNb })
      .then(table => {
        console.log('Created table', table)
        history.push('/tables')
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    let newTableSer = {
      ...tableSer,
      total: totalWithDiscount(),
      tips: tips(),
      discount: formValues.discount,
      closedAt: new Date(),
    }
    api.editTable(tableSer._id, newTableSer).then(table => {
      console.log('total with discount:', totalWithDiscount())
      console.log('HISTORY:', newTableSer)
      setTableSer(newTableSer)
    })
  }, [formValues, tableSer.state])

  const [isOpen, setIsOpen] = useState({ modal: false })
  function toggle() {
    setIsOpen({ modal: !isOpen.modal })
  }

  return (
    <div>
      <div className="Tables__img text-white">
        <Container className="TableService pt-3">
          {/* <pre style={{ color: 'red' }}>
        Populate is not working in server/routes/tables.js
      </pre> */}
          <Row>
            <Col>
              <h1>Mesa {tableSer.tableNb}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                <strong>Nombre: </strong> {tableSer.clientName} <br />
                <strong> Cantidad de personas: </strong>{' '}
                {tableSer.amountOfPeople}
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
                <Input type="select" {...getInputProps('discount')}>
                  <option value="1">---Sin descuento---</option>
                  <option value="0.9">10% descuento amigo</option>
                  <option value="0.85">15% descuento</option>
                  <option value="0.8">20% descuento familia</option>
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
              <h6 className="display-3">Totales</h6>
            </Col>
            <Col>
              {' '}
              <Form>
                <Label>Total pagado:</Label>
                <Input type="number" {...getInputProps('paid')} />
              </Form>
            </Col>
          </Row>
          <hr className="my-2" />
          <Row>
            <Col>
              <p className="lead">
                Gasto por persona: <strong>$ {amountPerPerson()}</strong>{' '}
              </p>
            </Col>
            <Col>
              <p>Cambio/Tips:$ {tips()}</p> <p>Tips: {tipsPercentage()}%</p>
            </Col>
          </Row>

          <Row className="lead">
            <Col />
            <Button color="dark" onClick={handleOpen} outline>
              Editar
            </Button>{' '}
            <Col>
              <Button color="dark" onClick={toggle}>
                Archivar
              </Button>
              <Modal isOpen={isOpen.modal} toggle={toggle}>
                {!formValues.paid && (
                  <ModalHeader toggle={toggle}>
                    Falta completar el total
                  </ModalHeader>
                )}
                {formValues.paid && (
                  <ModalHeader toggle={toggle}>⚠️ ARCHIVAR</ModalHeader>
                )}
                <ModalBody>
                  No se puede volver a editar despues de archivar
                </ModalBody>
                <ModalBody>
                  <Row>
                    <Col>
                      {' '}
                      {formValues.paid && (
                        <p>
                          <strong>Total pagado:</strong> ${formValues.paid}{' '}
                        </p>
                      )}
                    </Col>
                    <Col>
                      {formValues.discount && (
                        <p>
                          <strong>Descuento:</strong> {formValues.discount}{' '}
                        </p>
                      )}
                      {formValues.paid && (
                        <p>
                          <strong>Cantidad de personas:</strong> $
                          {amountPerPerson()}{' '}
                        </p>
                      )}
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  {formValues.paid && (
                    <Button color="dark" onClick={handleArchive}>
                      Archivar!
                    </Button>
                  )}
                </ModalFooter>
              </Modal>
            </Col>
            <WhatsappShareButton
              // beforeOnClick={}
              url={
                'https://lachapenia.herokuapp.com/tables/' +
                tableSer._id +
                '/check'
              }
            >
              <WhatsappIcon
                round
                size={35}
                iconBgStyle={{ fill: 'transparent' }}
                logoFillColor={'black'}
              />
            </WhatsappShareButton>
            <Col />
          </Row>
        </Jumbotron>
      </Container>
    </div>
  )
}
