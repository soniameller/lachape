import React, { useState } from 'react'
import api from '../api'
import { Link, NavLink as NLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

function MainNavbar(props) {
  const [isOpen, setIsOpen] = useState(false)
  function toggle() {
    setIsOpen(!isOpen)
  }
  function handleLogoutClick(e) {
    api.logout()
  }
  const links = [{ to: '/dishes', text: 'Dishes' }]
  if (!api.isLoggedIn()) {
    links.push({ to: '/signup', text: 'Signup' })
    links.push({ to: '/login', text: 'Login' })
  }
  if (api.isLoggedIn()) {
    links.push({ to: '/tables', text: 'Tables' })
    links.push({ to: '/history', text: 'History' })
    links.push({ to: '/', text: 'Logout', onClick: handleLogoutClick })
  }
  return (
    <Navbar color="dark" dark expand="sm">
      <NavbarBrand tag={Link} to="/">
        La chapeña
      </NavbarBrand>
      {api.isLoggedIn() && (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={NLink} to="#">
              Hola {api.getLocalStorageUser().nickname}
            </NavLink>
          </NavItem>
        </Nav>
      )}

      <button type="button" className="navbar-toggler" onClick={toggle}>
        <img
          src="https://i.imgur.com/h9euwj3.png"
          height="58px"
          alt="logo-chapeña"
        />
      </button>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {links.map(link => (
            <NavItem key={link.to}>
              <NavLink tag={NLink} to={link.to} exact onClick={link.onClick}>
                {link.text}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default withRouter(MainNavbar)
