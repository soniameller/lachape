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
            <Label for="name">Nombre</Label>
          </Col>
          <Col>
            <Input
              type="text"
              placeholder="Nombre"
              {...getInputProps('name')}
            />
          </Col>
        </Row>
        <Row className="my-4">
          <Col sm={3}>
            <Label for="price">Precio</Label>
          </Col>
          <Col>
            <Input
              type="number"
              placeholder="Precio"
              {...getInputProps('price')}
            />
          </Col>
          <Col sm={3}>
            <Label for="type">Tipo</Label>
          </Col>
          <Col>
            <Input type="select" {...getInputProps('type')}>
              <option value="" disabled>
                --- Que es? ---
              </option>
              <option value="Food">Plato</option>
              <option value="Drink">Bebidas</option>
              <option value="Dessert">Postre</option>
            </Input>
          </Col>
        </Row>
        <Row className="my-4">
          <Col sm={3}>
            <Label for="descripción">Descripción</Label>
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
          +
        </Button>
      </form>

      {/* <pre>{JSON.stringify(formValues)}</pre> */}
    </Container>
  )
}
