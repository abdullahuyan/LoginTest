import { useState } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Success from './components/success'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/success">
            <Success/>
          </Route>
        </Switch>
    </BrowserRouter>
  )
}

export default App

