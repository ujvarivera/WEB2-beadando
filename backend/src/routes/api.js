import { Router } from 'express'
import {register, login, logout} from '../controllers/authController.js'
import {getMyPosts, post, allPosts, updatePost, deletePost} from '../controllers/postController.js'
import authMW from '../middlewares/authMW.js'

const router = Router()

router.get('/heartbeat', async (req, res) => {
  res.json({ connection: 'true' })
})

router.post('/signup', register)
router.post('/login', login)
router.get('/logout', logout)

router.get('/myposts', authMW, getMyPosts)
router.get('/posts', authMW, allPosts)
router.post('/posts', authMW, post)
router.put('/posts/:id', authMW, updatePost)
router.delete('/posts/:id', authMW, deletePost)


export default router
