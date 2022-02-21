import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { SECRET_TOKEN } from '../middlewares/authMW.js'

const expires = '1h'
const newToken = (id) => {
    return jwt.sign({ id }, SECRET_TOKEN, {
        expiresIn: expires
    })
}

export const signupGet = (req, res) => {
    res.send('Sign up')
}

export const loginGet = (req, res) => {
    res.send('Log in')
}

export const register = async(req, res) => {
    const {username, password} = req.body
    try {
        const user = await User.create({username, password})
        const token = newToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 3600
        }) // 3600s: 1 hour
        res.status(201).json({ id: user._id })
        console.log("You register was successful")
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({message: "This username is already in use"})
            return
        } //duplicate key error 

        res.status(400).json({ message: error.message })
    }
}

export const login = async(req, res) => {
    const {username, password} = req.body
    
    try {
        const user = await User.login(username, password)
        const token = newToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 3600
        }) // 3600s: 1 hour
        res.status(200).json({ token })
        console.log('successful login')
    }
    catch (error) {
        res.status(400).json({ message: error.message })
        console.log('unsuccessful login')
    }
}

export const logout = (req, res) => {
    /* ??
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/api/login')
    */

   res.clearCookie('jwt')
   res.redirect('/api/login')
   /*
   res.status(200).json({ 
       success: true,
       message: 'you succesfully logged out'
    })
    */

}