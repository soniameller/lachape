import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function DishDetail(props) {
  const dishId = props.match.params.id

  // const [dish, setDish] = useState([null])
  // useEffect(() => {
  //   api
  //     .getDishes(dishId)
  //     .then(dishdetail => {
  //       setDish(dishdetail)
  //     })
  //     .catch(err => console.log(err))
  // }, [dishId])

  return (
    <div>
      Hello detail
      {/* <p>{dishes && dishes[0].name}</p>
      <pre>{JSON.stringify(dish)}</pre> */}
    </div>
  )
}
