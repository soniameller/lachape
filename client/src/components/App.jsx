import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainNavbar from './MainNavbar'
import Home from './pages/Home'
import Dishes from './pages/Dishes'
import Tables from './pages/Tables'
import History from './pages/History'
import DishDetail from './pages/DishDetail'

import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dishes" exact component={Dishes} />
        <Route path="/dishes/:id" exact component={DishDetail} />
        <Route path="/tables" component={Tables} />
        <Route path="/history" component={History} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
    </div>
  )
}
