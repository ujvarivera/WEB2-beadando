import Post from '../models/Post.js'

export const getMyPosts = async(req, res) => {
    const posts = await Post.find({ createdBy: req.user })
    res.json(posts)
}

export const post = async(req, res) => {
    const { title, content } = req.body
    const created = await Post.create({ title, content, createdBy: req.user })
    res.json(created)
}

export const allPosts = async(req, res) => {
    const data = await Post.find()
    res.json(data)
}

export const updatePost = async (req, res) => {
    const { id } = req.params
    const data = req.body
    const updated = await Post.findByIdAndUpdate(id, data, { new: true })
    res.json(updated)
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    const deleted = await Post.findByIdAndDelete(id)
    res.json(deleted)
}