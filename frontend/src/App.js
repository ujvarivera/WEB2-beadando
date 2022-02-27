import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Favourites from "./components/Favourites";
import FavouritesContextProvider from "./context/FavouritesContext";
import ErrorBoundary from "./components/ErrorBoundary";
import SearchingMeals from "./components/SearchingMeals";
import Auth from './components/Auth';

const App = () => {
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState()
  const [init, setInit] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
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
    const { data } = await axios.post('/api/login', {
      username,
      password,
    })
    window.localStorage.setItem('jwt', data.token)
    console.log(data)
  }

  const logout = async() => {
    //???
    
    const response = await axios.get('/api/logout')
    console.log(response);
    window.localStorage.removeItem('jwt')
    console.log('you logged out successfully')
  }

  const register = async() => {
    const { data } = await axios.post('/api/signup', {
      username,
      password,
    })
    console.log(data);
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
          {error && connected}
          <h1 className="login-text">LOGIN</h1>
          <Auth username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
          <button className="login-button" onClick={login}>login</button>
        </Route>
        <Route exact path="/logout">
          <button className="logout-button" onClick={logout}>logout</button>
        </Route>
        <Route exact path="/register">
        {error && connected}
          <h1 className="register-text">REGISTER</h1>
          <Auth username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
          <button className="register-button" onClick={register}>register</button>
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </FavouritesContextProvider>
  </ErrorBoundary>
  )
}

export default App
