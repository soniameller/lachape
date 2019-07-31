import React, { useEffect, useState } from 'react'
import api from '../api'
import ClientCheck from './ClientCheck'

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

import { Document, Page } from 'react-pdf'

import { WhatsappShareButton, WhatsappIcon } from 'react-share'

export default function ClosedTables({
  getInputProps,
  tableSer,
  dishes,
  formValues,
  setTableSer,
  history,
}) {
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
    else return 0
  }
  function tipsPercentage() {
    if (formValues.paid) return Math.floor((tips() * 100) / totalWithDiscount())
  }

  function handleOpen() {
    setTableSer({ ...tableSer, state: 'open' })
  }
  function handleArchive() {
    // setTableSer({ ...tableSer, state: 'archived' })
    api
      .archiveAndAddTable({ tableNb: tableSer.tableNb })
      .then(table => {
        console.log('Created table', table)
        history.push('/tables')
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    api.editTable(tableSer._id, tableSer).then(table => {
      // console.log('HISTORY:', history)
      setTableSer({
        ...tableSer,
        total: totalWithDiscount(),
        tips: tips(),
        discount: formValues.discount,
        closedAt: new Date(),
      })
    })
  }, [formValues, tableSer.state])

  const [isOpen, setIsOpen] = useState({ modal: false })
  function toggle() {
    setIsOpen({ modal: !isOpen.modal })
  }

  // -----------trying to create a PDF to share
  const [pdfState, setPdfState] = useState({ numPages: null, pageNumber: 1 })

  function onDocumentLoadSuccess({ numPages }) {
    setPdfState({ numPages })
  }

  function handlePDF() {
    // return (
    //   <Document file="lachape.pdf" onLoadSuccess={onDocumentLoadSuccess}>
    //     <Page pageNumber={pdfState.pageNumber}>
    //       <h1>Hello PDF</h1>
    //     </Page>
    //   </Document>
    // )
  }

  if (api.isLoggedIn())
    return (
      <div>
        <div className="Tables__img text-white">
          <Container className="TableService pt-3">
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
          </Container>
        </div>
        <Container>
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
                <h6 className="display-3">Totals</h6>
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
              <Button color="dark" onClick={handleOpen} outline>
                Edit
              </Button>{' '}
              <Col>
                <Button color="dark" onClick={toggle}>
                  Archive
                </Button>
                <Modal isOpen={isOpen.modal} toggle={toggle}>
                  {!formValues.paid && (
                    <ModalHeader toggle={toggle}>
                      Please complete the total paid form!
                    </ModalHeader>
                  )}
                  {formValues.paid && (
                    <ModalHeader toggle={toggle}>
                      Are you sure you want to archive?
                    </ModalHeader>
                  )}
                  <ModalBody>This action cannot be reverted</ModalBody>
                  <ModalBody>
                    <Row>
                      <Col>
                        {' '}
                        {formValues.paid && (
                          <p>
                            <strong>Total paid:</strong> ${formValues.paid}{' '}
                          </p>
                        )}
                      </Col>
                      <Col>
                        {formValues.discount && (
                          <p>
                            <strong>Discount:</strong> {formValues.discount}{' '}
                          </p>
                        )}
                        {formValues.paid && (
                          <p>
                            <strong>Amount per person:</strong> $
                            {amountPerPerson()}{' '}
                          </p>
                        )}
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    {formValues.paid && (
                      <Button color="dark" onClick={handleArchive}>
                        Yes! Archive
                      </Button>
                    )}
                  </ModalFooter>
                </Modal>
              </Col>
              <WhatsappShareButton
                beforeOnClick={handlePDF}
                url="http://localhost:3000/tables/5d40916e9941212531126b2e"
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
  else
    return (
      <ClientCheck
        getInputProps={getInputProps}
        amountPerPerson={amountPerPerson}
        tipsPercentage={tipsPercentage}
        tips={tips}
        tableSer={tableSer}
        totalWithDiscount={totalWithDiscount}
        formValues={formValues}
      />
    )
}
