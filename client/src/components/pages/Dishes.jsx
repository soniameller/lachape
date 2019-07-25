import React, { useState, useEffect } from 'react'
import { Table, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import api from '../../api'

export default function Dishes(props) {
  const [dishes, setDishes] = useState([])
  useEffect(() => {
    api
      .getDishes()
      .then(dishes => {
        setDishes(dishes)
      })
      .catch(err => console.log(err))
  }, [])

  //TODO correct the push route
  function handleClick() {
    api
      .addDish()
      .then(dish => {
        console.log('Created dish', dish)
        props.history.push('/edit-dish/' + dish.dish._id)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="Dishes">
      <Button onClick={handleClick}>Add New</Button>
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
