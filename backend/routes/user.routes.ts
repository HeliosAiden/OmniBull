// src/routes/user.routes.ts
import express from 'express'
import {
  getCurrentUser,
  getUserById,
  listUsers
} from '../controllers/user.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = express.Router()

router.get('/user/current', authMiddleware, getCurrentUser)
router.get('/users', authMiddleware, listUsers)
router.get('/users/:id', authMiddleware, getUserById)

export default router
