import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
})

const Post = mongoose.model('Post', postSchema)

export default Post