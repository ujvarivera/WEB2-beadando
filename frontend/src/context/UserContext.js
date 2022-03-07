import React, { createContext, useState } from "react"
import {useHistory} from 'react-router-dom'
import axios from 'axios'

export const UserContext = createContext()

export default function UserDataProvider({ children }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const [registerErrorMessage, setRegisterErrorMessage] = useState('')

    const history = useHistory()

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
          history.push('/posts')
          window.location.reload(true)
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
    
    const value = {
        username,
        setUsername,
        password,
        setPassword,
        loginErrorMessage,
        setLoginErrorMessage,
        registerErrorMessage,
        setRegisterErrorMessage,
        login,
        register
    } 


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}