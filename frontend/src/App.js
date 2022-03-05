import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Switch, Redirect } from "react-router-dom"
import {useHistory} from 'react-router-dom'

import NavBar from "./components/NavBar"
import Favourites from "./components/Favourites"
import FavouritesContextProvider from "./context/FavouritesContext"
import ErrorBoundary from "./components/ErrorBoundary"
import SearchingMeals from "./components/SearchingMeals"
import Login from './components/Login'
import Register from './components/Register'

const App = () => {
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState()
  const [init, setInit] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const [registerErrorMessage, setRegisterErrorMessage] = useState('')

  const history = useHistory()
  
  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { connection },
        } = await axios.get('/api/heartbeat')
        setConnected(connection)
      } catch (error) {
        setError(error.message)
      }
    }
    getData()
  }, [])

  const login = async () => {
    try {
      const { data } = await axios.post('/api/login', {
        username,
        password,
      })
      setLoginErrorMessage('OK')
      window.localStorage.setItem('jwt', data.token)
      history.push('/profile')
    } catch (error) {
      setLoginErrorMessage(error.response.data.message)
    }
  }

  const logout = async() => {
    window.localStorage.removeItem('jwt')
    window.location.reload(true)
    console.log('you logged out successfully')
  }

  const register = async() => {
    try {
      const { data } = await axios.post('/api/signup', {
        username,
        password,
      }
      )
      setRegisterErrorMessage('OK')
      alert('Your register was successful')
      history.push('/login')

    } catch (error) {
      setRegisterErrorMessage(error.response.data.message)
    }

  }

  useEffect(() => {
    const initialize = async () => {
      const token = window.localStorage.getItem('jwt')
      if (token) {
       setInit(true)
     }
    }
    if (!init) {
      initialize()
    }
  })


  return (
    <ErrorBoundary>
    <FavouritesContextProvider>
      <NavBar /> 
      <Switch>

        <Route exact path="/">
          <SearchingMeals />
        </Route>

        <Route exact path="/favourites">
          <Favourites />
        </Route>

        <Route exact path="/login">
          <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} login={login} error={loginErrorMessage}/>
        </Route>

        <Route exact path="/logout">
          <button className="logout-button" onClick={logout}>logout</button>
        </Route>

        <Route exact path="/register">
          <Register username={username} setUsername={setUsername} password={password} setPassword={setPassword} register={register} error={registerErrorMessage}/>
        </Route>

        <Route exact path="/posts">
          {init ? 
            <h1 className='proba'>Posts</h1> 
            : <Redirect from="/posts" to="/login" />}
        </Route>

        <Route exact path="/profile">
            {init ? 
              <h1 className='proba'>Hello {username}</h1> 
              : <Redirect from="/profile" to="/login" />
              }
          </Route>

        <Redirect from="*" to="/" />

      </Switch>
    </FavouritesContextProvider>
  </ErrorBoundary>
  )
}

export default App
