import express from 'express'
import {
  getCurrentUser,
  getUserById,
  listUsers
} from '../controllers/user.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = express.Router()

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Get the current user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: The current user
 */
router.get('/current', authMiddleware, getCurrentUser)

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/', authMiddleware, listUsers)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single user
 */
router.get('/:id', authMiddleware, getUserById)


export default router
