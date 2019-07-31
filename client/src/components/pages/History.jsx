import React, { useState, useEffect } from 'react'
import api from '../../api'
import { useForm } from '../../hooks'
import { Link } from 'react-router-dom'

import {
  Table,
  FormGroup,
  Form,
  Input,
  Label,
  Container,
  Row,
  Col,
} from 'reactstrap'

export default function History() {
  const [tables, setTables] = useState([])

  const { formValues, setFormValues, getInputProps } = useForm({
    from: new Date().toISOString().substring(0, 10),
    to: new Date().toISOString().substring(0, 10),
  })

  function strToDateAt1300(str) {
    let date = new Date(str)
    date.setHours(13)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
  }

  function addDay(initialDate) {
    let date = new Date(initialDate)
    date.setDate(date.getDate() + 1)
    return date
  }

  let filteredTables = tables.filter(table => {
    return (
      strToDateAt1300(formValues.from) <= new Date(table.closedAt) &&
      addDay(strToDateAt1300(formValues.to)) >= new Date(table.closedAt)
    )
  })

  function getTablesTotal(value = 'total') {
    console.log(filteredTables)
    return filteredTables.reduce((counter, table) => counter + table[value], 0)
  }

  useEffect(() => {
    api
      .getArchivedTables()
      .then(tables => {
        setTables(tables)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <pre>{JSON.stringify(formValues)}</pre>
      {/* <pre>{tables && JSON.stringify(tables, null, 2)}</pre> */}
      <div className="History__img">
        <Container>
          <Form className="pt-3 text-white" inline>
            <Row form>
              <Col>
                <FormGroup>
                  <Label for="from">From</Label>
                  <Input type="date" {...getInputProps('from')} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="to">To</Label>
                  <Input type="date" {...getInputProps('to')} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <pre style={{ color: 'red' }}>
        Time is taken from the chosen day at 13.00hs to the following day of the
        chosen one at 13.00hs
      </pre>
      <pre style={{ color: 'red' }}>INPUTS ARE NOT WORKING in mobile</pre>
      <Container>
        <Table
          hover
          size="sm"
          className="mt-3 table-wrapper-scroll-y my-custom-scrollbar"
        >
          <thead>
            <tr className="Table__darkRow">
              <th>TABLE</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>TIPS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="Table__grayRow">
              <td>Totals</td>
              <td />
              <td>$ {tables[0] && getTablesTotal()}</td>
              <td>$ {tables[0] && getTablesTotal('tips')}</td>
            </tr>
            {[...filteredTables].map(table => (
              <tr key={table._id}>
                <td>
                  {' '}
                  <Link to={'/tables/' + table._id}> M{table.tableNb}</Link>
                </td>
                <td>{table.closedAt.substring(0, 10)}</td>
                <td>$ {table.total}</td>
                <td>$ {table.tips}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}
