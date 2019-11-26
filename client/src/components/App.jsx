import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainNavbar from './MainNavbar'
import Home from './pages/Home'
import Dishes from './pages/Dishes'
import Tables2 from './pages/Tables2'
import History from './pages/History'
import DishDetail from './pages/DishDetail'
import DishEdit from './pages/DishEdit'
import TableService from './pages/TableService'
import TableCheck from './pages/TableCheck.jsx'
import Drinks from './pages/Drinks.jsx'

import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/dishes" exact component={Dishes} />
        <Route path="/drinks" exact component={Drinks} />
        <Route path="/dishes/:id" exact component={DishDetail} />
        <Route path="/edit-dish/:id" exact component={DishEdit} />

        <Route path="/tables" exact component={Tables2} />
        <Route path="/tables/:id" exact component={TableService} />
        <Route path="/tables/:id/check" exact component={TableCheck} />

        <Route path="/history" component={History} />

        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
    </div>
  )
}
