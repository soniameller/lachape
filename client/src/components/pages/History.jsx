import React, { useState, useEffect } from 'react'
import api from '../../api'
import { useForm } from '../../hooks'
import { Link } from 'react-router-dom'

import { Table, FormGroup, Form, Input, Label, Container } from 'reactstrap'

export default function History() {
  const [tables, setTables] = useState([])

  const { formValues, setFormValues, getInputProps } = useForm({
    from: new Date().toISOString().substring(0, 10),
    to: new Date().toISOString().substring(0, 10),
  })

  function addDay(initialDate) {
    let date = new Date(initialDate)
    date.setDate(date.getDate() + 1)
    return date
  }

  let filteredTables = tables.filter(table => {
    return (
      new Date(formValues.from + ' 13:00:00') <= new Date(table.createdAt) &&
      addDay(formValues.to + ' 13:00:00') >= new Date(table.createdAt)
    )
  })

  function getTablesTotal(value = 'total') {
    // console.log(filteredTables)
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
        Time is taken from the chosen day at 13.00hs to the following day of the
        chosen one at 13.00hs
      </pre>
      <pre style={{ color: 'red' }}>INPUTS ARE NOT WORKING in mobile</pre>

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
