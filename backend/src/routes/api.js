import { Router } from 'express'
import {signupGet, register, loginGet, login} from '../controllers/authController.js'

const router = Router()

router.get('/heartbeat', async (req, res) => {
  res.json({ connection: 'true' })
})

router.get('/signup', signupGet)
router.post('/signup', register)
router.get('/login', loginGet)
router.post('/login', login)

export default router
