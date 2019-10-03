import React, { useState } from 'react'
import api from '../../api'
import { Form, Container, Button } from 'reactstrap'

export default function Signup(props) {
  const [state, setState] = useState({
    email: '',
    name: '',
    password: '',
    nickname: '',
    role: null,
    message: null,
    isValidated: null,
  })

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function handleClick(e) {
    e.preventDefault()
    let data = {
      email: state.email,
      password: state.password,
      nickname: state.nickname,
      role: state.role,
      isValidated: state.isValidated,
    }
    api
      .signup(data)
      .then(result => {
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setState({ message: err.toString() }))
  }
  return (
    <div className="Background-img pt-5">
      <Container>
        <h2 className="text-white">Signup</h2>
        <Form className=" text-white">
          <div className="form-group ">
            <label for="email">Email </label>
            <input
              type="text"
              placeholder="Email"
              value={state.email}
              id="email"
              name="email"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group ">
            <label for="name">Nombre</label>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              id="name"
              value={state.name}
              name="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group ">
            <label for="name">Nombre visible</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nickname"
              value={state.nickname}
              id="nickname"
              name="nickname"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group ">
            <label for="name">Contraseña</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={state.password}
              id="password"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <Button
            className="btn btn-light mt-3 curvedFont "
            onClick={e => handleClick(e)}
          >
            signup
          </Button>
        </Form>
        {state.message && (
          <div className="info info-danger">{state.message}</div>
        )}
      </Container>
    </div>
  )
}
