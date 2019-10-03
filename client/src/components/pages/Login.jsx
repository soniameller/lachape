import React, { useState } from 'react'
import { Form, Container, Button } from 'reactstrap'
import api from '../../api'
import { useForm } from '../../hooks'

export default function Login(props) {
  const { formValues, getInputProps } = useForm({ lang: 'en' })

  function handleSubmit(e) {
    e.preventDefault()
    api
      .login(formValues.email, formValues.password)
      .then(result => {
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setMessage(err.toString()))
  }

  const [message, setMessage] = useState(null)

  return (
    <div className="Background-img pt-5">
      {/* <h2>Login</h2> */}
      <Container>
        <Form onSubmit={handleSubmit}>
          <div className="form-group text-white ">
            <label for="email">Email </label>
            <input
              placeholder="Email"
              type="text"
              id="email"
              className="form-control"
              {...getInputProps('email')}
            />

            <label for="password">Contraseña</label>
            <input
              className="form-control"
              placeholder="Password"
              id="password"
              type="password"
              {...getInputProps('password')}
            />
            <Button className="btn btn-light mt-3 curvedFont ">login</Button>
          </div>
        </Form>
        {message && (
          <div className="info text-warning info-danger">{message}</div>
        )}
      </Container>
    </div>
  )
}
