import { Router } from 'express'
import {register, login } from '../controllers/authController.js'
import { getAllMeals, getSearchedMeal } from '../controllers/mealsController.js'
import {getMyPosts, post, allPosts, updatePost, deletePost} from '../controllers/postController.js'
import authMW from '../middlewares/authMW.js'
import {upload, fileUploading, avatarLocation, deleteAvatar } from '../controllers/imageUploading.js'

const router = Router()

router.get('/heartbeat', async (req, res) => {
  res.json({ connection: 'true' })
})

router.post('/signup', register)
router.post('/login', login)

router.get('/myposts', authMW, getMyPosts)
router.get('/posts', authMW, allPosts)
router.post('/posts', authMW, post)
router.put('/posts/:id', authMW, updatePost)
router.delete('/posts/:id', authMW, deletePost)

router.get('/meals', getAllMeals)
router.get('/meals/:name', getSearchedMeal)

router.post('/images', authMW, upload.single("image"), fileUploading)
router.get('/images', authMW, avatarLocation)
router.delete('/images/:id', authMW, deleteAvatar)

export default router
