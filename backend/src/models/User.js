import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Please type a username in"],
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "Please write in a password"],
        minlength: [4, "Your password should be at least 4 characters long"],
        select: false
    },
    registered: { 
        type: Date, 
        default: Date.now,
        select: false
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

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username }).select('+password')
    if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            return user
        }
        throw Error('Incorrect password')
    }
    throw Error('This username does not exist in our database')
}

const User = mongoose.model("user", userSchema)

export default User