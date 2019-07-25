import React, { useState, useEffect } from 'react'
import { Table, Button } from 'reactstrap'
import api from '../../api'

export default function TableService(props) {
  const tableId = props.match.params.id
  const [tableSer, setTableSer] = useState(null)
  useEffect(() => {
    api
      .getTableId(tableId)
      .then(tableService => {
        console.log('AHAHAHAHAHAHAHHAHAH', tableService)
        setTableSer(tableService)
      })
      .catch(err => console.log(err))
  }, [tableId])

  if (!tableSer) {
    return <div>Loading...</div>
  }

  return (
    <div className="TableService">
      <Table>
        <thead>
          <tr>
            <th>a</th>
            <th>b</th>
          </tr>
        </thead>
        <tbody />
        <pre>{JSON.stringify(tableSer.orders, null, 2)}</pre>
      </Table>
    </div>
  )
}
