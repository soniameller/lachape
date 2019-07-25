import React, { useState, useEffect } from 'react'
import { Table, Button } from 'reactstrap'
import api from '../../api'

export default function TableService(props) {
  const tableId = props.match.params.id
  const [dishes, setDishes] = useState([])
  const [tableSer, setTableSer] = useState([null])
  // useEffect(() => {
  //   api
  //     .getOpenTables(tableId)
  //     .then(tableService => {
  //       setTableSer(tableService)
  //     })
  //     .catch(err => console.log(err))
  // }, [tableId])

  useEffect(() => {
    api
      .getDishes()
      .then(dishes => {
        setDishes(dishes)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="TableService">
      something
      <Table>
        <thead>
          <tr>
            <th>a</th>
            <th>b</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {dishes.map(d => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>
                <Button>add/subtract</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
