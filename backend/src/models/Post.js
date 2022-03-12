import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Please write a title in'] 
    },
    content: { 
        type: String ,
        required: [true, 'Content is missing']
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', //kisbetű!!!
      required: true
    },
})

const Post = mongoose.model('Post', postSchema)

export default Post