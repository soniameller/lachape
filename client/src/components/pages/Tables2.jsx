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
    }, 1000)
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

  function numberToStringWith2Digits(n) {
    if (n < 10) return '0' + n
    else return '' + n
  }

  function getStrWaitingTime(dateStr) {
    let nbOfSeconds = Math.round((currentDate - new Date(dateStr)) / 1000)
    let mm = numberToStringWith2Digits(Math.floor(nbOfSeconds / 60))
    let ss = numberToStringWith2Digits(nbOfSeconds % 60)
    return mm + ':' + ss
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
                <small>
                  {table.waitingSince && getStrWaitingTime(table.waitingSince)}
                </small>
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
