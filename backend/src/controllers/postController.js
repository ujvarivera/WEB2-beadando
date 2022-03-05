import Post from '../models/Post.js'

export const getPost = async(req, res) => {
    const posts = await Post.find({ createdBy: req.user })
    res.json(posts)
}

export const post = async(req, res) => {
    const { title, content } = req.body
    const created = await Post.create({ title, content, createdBy: req.user })
    res.json(created)
}