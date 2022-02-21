import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

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
    <div className="App">
      {error && connected}
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default App
