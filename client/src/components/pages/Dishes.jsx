import React, { useState, useEffect } from 'react'
import { Table, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import api from '../../api'

export default function Dishes() {
  const [dishes, setDishes] = useState([])
  useEffect(() => {
    api
      .getDishes()
      .then(dishes => {
        setDishes(dishes)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="Dishes">
      <Table>
        <thead>
          <tr>
            {api.isLoggedIn() && <th>Active</th>}
            <th>Dish</th>
            <th>Price</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {dishes.map(d => (
            <tr key={d._id}>
              {api.isLoggedIn() && (
                <td>
                  <input type="checkbox" name="active" value={d.active} />
                </td>
              )}
              <td>{d.name}</td>
              <td>$ {d.price}</td>
              <td>
                <Button tag={Link} to={'/dishes/' + d._id} outline>
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
