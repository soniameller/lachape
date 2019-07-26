import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import { Table } from 'reactstrap'

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
    <div className="openTables">
      <Table>
        <tbody>
          {tables.map(t => (
            <tr key={t._id}>
              <th>
                Table <Link to={'/tables/' + t._id}> {t.tableNb} </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
