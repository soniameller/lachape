import React, { useEffect, useState } from 'react'
import api from '../../api'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

export default function DishDetail(props) {
  const dishId = props.match.params.id

  const [dish, setDish] = useState([null])
  useEffect(() => {
    api
      .getDish(dishId)
      .then(dishdetail => {
        setDish(dishdetail)
      })
      .catch(err => console.log(err))
  }, [dishId])

  function handleDelete() {
    api
      .deleteDish(dishId)
      .then(dish => {
        props.history.push('/dishes')
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="Dish-details">
      <h2>{dish.name}</h2>
      <p>
        <i>{dish.type}</i>
      </p>
      <h3>${dish.price}</h3>
      <p>{dish.description}</p>
      {/* <pre>{JSON.stringify(dish, null, 2)}</pre> */}
      <Button onClick={handleDelete} outline>
        Delete
      </Button>{' '}
      <Button tag={Link} to={'/edit-dish/' + dish._id} outline>
        Edit
      </Button>
    </div>
  )
}
