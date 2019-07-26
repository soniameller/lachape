import React, { useState, useEffect } from 'react'
import { Table, Button, Link, Input } from 'reactstrap'
import api from '../../api'

export default function TableService(props) {
  const [dishes, setDishes] = useState([])
  useEffect(() => {
    api.getActiveDishes().then(dishes => {
      setDishes(dishes)
    })
  }, [])

  const [state, setState] = useState({
    search: '',
  })

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
        <tbody>
          <tr>
            <th>
              <select name="" id="">
                {dishes.map(d => (
                  <option key={d._id}>{d.name}</option>
                ))}
              </select>
            </th>
          </tr>

          {/* {dishes.map(d => (
            <Input type="select">
              <option key={d._id}>{d.name}</option>
            </Input>
          ))} */}

          {/* <Button
            className="btn-sm"
            tag={Link}
            to={'/tables-closed/' + d._id}
            outline
          >
            Details
          </Button> */}
        </tbody>
      </Table>
    </div>
  )
}
