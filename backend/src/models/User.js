import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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

userSchema.post("save", function(userData, next) {
    console.log("New user was successfully created and saved.")
    next()
})

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model("user", userSchema)

export default User