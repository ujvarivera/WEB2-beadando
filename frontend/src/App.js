import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from "react-router-dom"
import axios from 'axios'

import NavBar from "./components/header/NavBar"
import Favourites from "./components/meals/Favourites"
import FavouritesContextProvider from "./context/FavouritesContext"
import UserDataProvider from "./context/UserContext"
import ErrorBoundary from "./components/ErrorBoundary"
import SearchingMeals from "./components/meals/SearchingMeals"
import Login from './components/users/Login'
import Register from './components/users/Register'
import Profile from './components/users/Profile'
import MyPosts from './components/posts/MyPosts'
import AllPosts from './components/posts/AllPosts'

const App = () => {
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState()
  const [init, setInit] = useState(false)
  
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
      <UserDataProvider>

      <NavBar /> 

      <Switch>

        <Route exact path="/">
          <SearchingMeals />
        </Route>

        <Route exact path="/favourites">
          <Favourites />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/posts">
          {init && 
            <MyPosts /> 
          }
        </Route>

        <Route exact path="/allposts">
          {init && 
            <AllPosts /> 
            }
        </Route>

        <Route exact path="/profile">
            {init ? 
              <Profile /> 
              : <Redirect from="/profile" to="/login" />
              }
          </Route>

        <Redirect from="*" to="/" />

      </Switch>
      
      </UserDataProvider>
    </FavouritesContextProvider>
  </ErrorBoundary>
  )
}

export default App
