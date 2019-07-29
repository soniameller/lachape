import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainNavbar from './MainNavbar'
import Home from './pages/Home'
import Dishes from './pages/Dishes'
import Tables from './pages/Tables'
import History from './pages/History'
import DishDetail from './pages/DishDetail'
import DishEdit from './pages/DishEdit'
import TableService from './pages/TableService'
// import TableClosed from './pages/TableClosed'

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
        <Route path="/edit-dish/:id" exact component={DishEdit} />
        <Route path="/tables" exact component={Tables} />
        <Route path="/tables/:id" exact component={TableService} />
        {/* <Route path="/tables-closed/:id" exact component={TableClosed} /> */}
        <Route path="/history" component={History} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
    </div>
  )
}
