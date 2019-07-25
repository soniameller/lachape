import React, { useEffect } from 'react'
import { useForm } from '../../hooks'
import { Button, Col, Container, Input, Label, Row } from 'reactstrap'
import api from '../../api'

export default function DishEdit(props) {
  const { formValues, setFormValues, getInputProps } = useForm()
  const dishId = props.match.params.id

  useEffect(() => {
    api.getDish(props.match.params.id).then(dish => {
      // console.log(dish)
      setFormValues({
        name: dish.name,
        price: dish.price,
        type: dish.type,
        description: dish.description,
      })
    })
  }, [])

  function handleSubmit(event) {
    event.preventDefault()

    api.editDish(dishId, formValues).then(dish => {
      console.log(dish)
      props.history.push('/dishes/' + dish.dish._id)
    })
  }

  return (
    <Container>
      {/* <pre>{JSON.stringify(formValues, null, 2)}</pre> */}
      <form onSubmit={handleSubmit}>
        <Row className="my-4">
          <Col sm={3}>
            <Label for="name">Name</Label>
          </Col>
          <Col>
            <Input type="text" placeholder="Name" {...getInputProps('name')} />
          </Col>
        </Row>
        <Row className="my-4">
          <Col sm={3}>
            <Label for="price">Price</Label>
          </Col>
          <Col>
            <Input
              type="number"
              placeholder="Price"
              {...getInputProps('price')}
            />
          </Col>
          <Col sm={3}>
            <Label for="type">Type</Label>
          </Col>
          <Col>
            <Input type="select" {...getInputProps('type')}>
              <option value="" disabled>
                ---Choose type---
              </option>
              <option value="Food">Food</option>
              <option value="Drink">Drink</option>
              <option value="Dessert">Dessert</option>
            </Input>
          </Col>
        </Row>
        <Row className="my-4">
          <Col sm={3}>
            <Label for="description">Description</Label>
          </Col>
          <Col>
            <Input
              type="textarea"
              placeholder="Description"
              {...getInputProps('description')}
            />
          </Col>
        </Row>

        <Button className="my-4" color="dark" block>
          Add Dish!
        </Button>
      </form>

      {/* <pre>{JSON.stringify(formValues)}</pre> */}
    </Container>
  )
}
