import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const secretToken = 'secret token'
const expires = '1h'
const newToken = (id) => {
    return jwt.sign({ id }, secretToken, {
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
        res.status(201).json(user)
        console.log({token})
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({message: "This username is already in use"})
            return
        } //duplicate key error 

        res.status(400).json({message: error.message})
    }
}

export const login = async(req, res) => {
    const {username, password} = req.body
    
    try {
        const user = await User.login(username, password)
        res.status(200).json(user)
        console.log('successful login')
    }
    catch (error) {
        res.status(400).json({})
        console.log('unsuccessful login')
    }
}