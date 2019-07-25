import React from 'react'
import { useForm } from '../../hooks'
import { Button, Col, Container, Input, Label, Row } from 'reactstrap'
import api from '../../api'

export default function DishEdit(props) {
  const { formValues, setFormValues, getInputProps } = useForm()

  function handleSubmit(event) {
    event.preventDefault()

    const uploadData = new FormData()
    uploadData.append('price', formValues.price)
    uploadData.append('type', formValues.type)
    uploadData.append('name', formValues.name)
    uploadData.append('picture', formValues.picture)

    api.editDish(uploadData).then(dish => {
      console.log(dish)
      props.history.push('/dishes')
    })
  }

  return (
    <Container>
      <h1>New Dish</h1>
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
            <Input type="select" placeholder="Type" {...getInputProps('type')}>
              <option>Food</option>
              <option>Drink</option>
              <option>Dessert</option>
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

      <pre>{JSON.stringify(formValues)}</pre>
    </Container>
  )
}
