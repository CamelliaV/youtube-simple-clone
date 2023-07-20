import express from 'express'
import { signup, signin, google, logout } from '../controllers/auth'

const router = express.Router()

// Create a user
router.post('/signup', signup)
// Sign in
router.post('/signin', signin)
// Google auth
router.post('/google', google)

router.put('/logout', logout)

export default router
