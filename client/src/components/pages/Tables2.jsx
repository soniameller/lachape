import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import { Container, Spinner } from 'reactstrap'

export default function Tables() {
  const [tables, setTables] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    let intervalId = setInterval(() => {
      setCurrentDate(new Date())
    }, 10000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    api
      .getTables()
      .then(tables => {
        setTables(tables)
      })
      .catch(err => console.log(err))
  }, [currentDate])

  let filteredTables = tables.filter(
    table => table.state === 'open' || table.state === 'closed'
  )

  if (tables.length === 0) {
    return (
      <Container className="mt-5">
        <Spinner color="dark" />
      </Container>
    )
  }

  function getStrWaitingTime(dateStr) {
    return Math.round((currentDate - new Date(dateStr)) / 1000) + 'seg'
  }

  return (
    <div className="Tables2">
      <div className="background-plan">
        <img
          className="background-plan__img"
          src="https://i.imgur.com/umXG8ST.png"
          alt=""
        />
        {filteredTables.map(table => (
          <div key={table._id} className={'tables table-' + table.tableNb}>
            <Link className="text-dark" to={'/tables/' + table._id}>
              <strong>{table.tableNb} </strong>
              <span className="table__waitingTime">
                {table.waitingSince && getStrWaitingTime(table.waitingSince)}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
