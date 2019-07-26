import React, { useState, useEffect } from 'react'
import api from '../../api'
import { useForm } from '../../hooks'
import { Link } from 'react-router-dom'

import { Table, FormGroup, Form, Input, Label, Container } from 'reactstrap'

export default function History() {
  const [tables, setTables] = useState([])

  function compareDates(date) {
    let year = date.substring(0, 4)
    let month = date.substring(5, 7)
    let day = date.substring(8, 10)
  }

  const { formValues, setFormValues, getInputProps } = useForm({
    from: new Date().toISOString().substring(0, 10),
    to: new Date().toISOString().substring(0, 10),
  })

  // let filteredTables = tables.filter(
  //   table =>
  //     formValues.from <= table.createdAt && formValues.to >= table.createdAt
  // )

  let filteredTables = tables.filter(table => {
    return (
      new Date(formValues.from) <= new Date(table.createdAt) &&
      new Date(formValues.to) >= new Date(table.createdAt)
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
    <Container>
      {/* <pre>{JSON.stringify(formValues)}</pre>
      <pre>{tables && JSON.stringify(tables)}</pre> */}
      <Form className="mt-3" inline>
        <FormGroup>
          <Label for="from">From</Label>
          <Input type="date" {...getInputProps('from')} />
        </FormGroup>
        <FormGroup>
          <Label for="to">To</Label>
          <Input type="date" {...getInputProps('to')} />
        </FormGroup>
      </Form>
      <pre style={{ color: 'red' }}>
        TODO = filter depending in the time of the day and create route to table
        detail
      </pre>
      <Table hover size="sm" className="mt-3">
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
            <td>Tips TODO</td>
          </tr>
          {[...filteredTables].map(table => (
            <tr key={table._id}>
              <td>
                {' '}
                <Link to={'/tables/' + table._id}> M{table.tableNb}</Link>
              </td>
              <td>{table.createdAt.substring(0, 10)}</td>
              <td>$ {table.total}</td>
              <td>$ {table.tips}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
