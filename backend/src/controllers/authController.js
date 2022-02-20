import User from '../models/User.js'

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
        res.status(201).json(user)
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({message: "This username is already in use"})
            return
        } //duplicate key error 

        res.status(400).json({message: error.message})
    }
}

export const login = (req, res) => {
    const {username, password} = req.body
    console.log(username, password);
    res.send('New login')
}