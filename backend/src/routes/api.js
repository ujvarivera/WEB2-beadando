import { Router } from 'express'
import {register, login, logout} from '../controllers/authController.js'
import {getPost, post} from '../controllers/postController.js'
import authMW from '../middlewares/authMW.js'

const router = Router()

router.get('/heartbeat', async (req, res) => {
  res.json({ connection: 'true' })
})

router.post('/signup', register)
router.post('/login', login)
router.get('/logout', logout)

router.get('/posts', authMW, getPost)
router.post('/posts', authMW, post)

export default router
