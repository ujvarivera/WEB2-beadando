import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Please type a username in"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please write in a password"],
        minlength: [4, "Your password should be at least 4 characters long"]
    },
    registered: { 
        type: Date, 
        default: Date.now 
    }
})


const User = mongoose.model("user", userSchema)

export default User