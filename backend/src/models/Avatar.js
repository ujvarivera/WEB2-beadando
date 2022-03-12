import mongoose from 'mongoose'

const avatarSchema = new mongoose.Schema({
    avatar: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        unique: true,
        required: true
      },    
})

const Avatar = mongoose.model('Avatar', avatarSchema)

export default Avatar