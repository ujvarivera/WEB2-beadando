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
import Profile from './components/Profile'
import Posts from './components/Posts'
import AllPosts from './components/AllPosts'

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
      axios.defaults.headers.authorization = `Bearer ${data.token}`
      window.localStorage.setItem('jwt', data.token)
      window.localStorage.setItem('username', username)  
      history.push('/profile')
    } catch (error) {
      setLoginErrorMessage(error.response.data.message)
    }
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
      axios.defaults.headers.authorization = `Bearer ${token}`
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

        <Route exact path="/register">
          <Register username={username} setUsername={setUsername} password={password} setPassword={setPassword} register={register} error={registerErrorMessage}/>
        </Route>

        <Route exact path="/posts">
          {init && 
            <Posts /> 
          }
        </Route>

        <Route exact path="/allposts">
          {init && 
            <AllPosts /> 
            }
        </Route>

        <Route exact path="/profile">
            {init ? 
              <Profile username={window.localStorage.getItem('username')}/> 
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
