import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

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
      {tables.map(t => (
        <tr key={t._id}>
          Table <Link to={'/tables/' + t._id}> {t.tableNb} </Link>
        </tr>
      ))}
    </div>
  )
}
