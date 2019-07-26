import React, { useState, useEffect } from 'react'
import api from '../../api'
import { useForm } from '../../hooks'
import { Link } from 'react-router-dom'

import {
  Table,
  Button,
  FormGroup,
  Form,
  Input,
  Label,
  Container,
} from 'reactstrap'

export default function History() {
  const [tables, setTables] = useState([])

  const { formValues, setFormValues, getInputProps } = useForm({})

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
      <Form className="mt-3" inline>
        <FormGroup>
          <Label for="exampleDatetime">From</Label>
          <Input
            type="date"
            name="from"
            id="exampleDatetime"
            placeholder="datetime placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleDatetime">To</Label>
          <Input
            type="date"
            name="to"
            id="exampleDatetime"
            placeholder="datetime placeholder"
          />
        </FormGroup>
      </Form>
      <Table className="mt-3">
        <thead>
          <tr>
            <th>Table</th>
            <th>Date</th>
            <th>Total</th>
            <th>Tips</th>
          </tr>
        </thead>
        <tbody>
          {tables.map(table => (
            <tr>
              <td>
                {' '}
                <Link to="/"> M{table.tableNb}</Link>
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
