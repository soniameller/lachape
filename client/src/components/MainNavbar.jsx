import React, { useState, useEffect, useRef } from 'react'
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
  const links = [
    { to: '/dishes', text: 'Platos', img: 'https://i.imgur.com/vgBsNTC.png' },
  ]
  if (!api.isLoggedIn()) {
    links.push({
      to: '/drinks',
      img: 'https://i.imgur.com/z0HVjnR.png',
      text: 'Bebidas',
    })
    links.push({ to: '/login', text: 'Login' })
  }
  if (api.isLoggedIn()) {
    links.push({
      to: '/tables',
      text: 'Servicio',
      img: 'https://i.imgur.com/trMGYda.png',
    })
    links.push({
      to: '/history',
      text: 'Historial',
      img: 'https://i.imgur.com/Yc4odTB.png',
    })
    links.push({ to: '/signup', text: 'Signup' })
    links.push({ to: '/', text: 'Logout', onClick: handleLogoutClick })
  }

  const togglerEl = useRef(null)

  useEffect(() => {
    window.onclick = e => {
      if (togglerEl.current !== e.target) {
        setIsOpen(false)
      }
    }
    return () => {
      window.onclick = null
    }
  }, [])

  return (
    <Navbar color="dark" dark expand="sm">
      <button type="button" className="navbar-toggler" onClick={toggle}>
        <img
          ref={togglerEl}
          src="https://i.imgur.com/h9euwj3.png"
          height="58px"
          alt="logo-chapeña"
        />
      </button>
      <NavbarBrand tag={Link} className="curvedFont mr-auto" to="/">
        La chapeña
      </NavbarBrand>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {api.isLoggedIn() && (
            <NavItem>
              <NavLink tag={NLink} to="#">
                -{' '}
                {api.getLocalStorageUser() &&
                  api.getLocalStorageUser().nickname}{' '}
                -
              </NavLink>
            </NavItem>
          )}
          {links.map(link => (
            <NavItem key={link.to}>
              <NavLink tag={NLink} to={link.to} exact onClick={link.onClick}>
                <img height="25px" src={link.img} alt="" /> {link.text}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default withRouter(MainNavbar)
