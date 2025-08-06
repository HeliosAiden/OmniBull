// src/routes/cex.routes.ts
import { Router } from 'express'
import {
  addCexAccount,
  getCexAccounts,
  getCexAccountById,
  updateCexAccount,
  deleteCexAccount
} from '../controllers/cex.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

// CREATE
/**
 * @swagger
 * /api/cex/add:
 *   post:
 *     summary: Add a new CEX account
 *     tags: [CEX Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - exchangeName
 *               - apiKey
 *               - apiSecret
 *               - label
 *             properties:
 *               exchangeName:
 *                 type: string
 *               apiKey:
 *                 type: string
 *               apiSecret:
 *                 type: string
 *               label:
 *                 type: string
 *     responses:
 *       200:
 *         description: CEX account added
 */
router.post('/add', authMiddleware, addCexAccount)

// READ ALL
/**
 * @swagger
 * /api/cex:
 *   get:
 *     summary: Get all CEX accounts for the current user
 *     tags: [CEX Accounts]
 *     responses:
 *       200:
 *         description: List of CEX accounts
 */
router.get('/', authMiddleware, getCexAccounts)

// READ ONE
/**
 * @swagger
 * /api/cex/{id}:
 *   get:
 *     summary: Get a single CEX account by ID
 *     tags: [CEX Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single CEX account
 *       404:
 *         description: Not found
 */
router.get('/:id', authMiddleware, getCexAccountById)

// UPDATE
/**
 * @swagger
 * /api/cex/{id}:
 *   put:
 *     summary: Update a CEX account
 *     tags: [CEX Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *               apiKey:
 *                 type: string
 *               apiSecret:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated account
 *       404:
 *         description: Not found
 */
router.put('/:id', authMiddleware, updateCexAccount)

// DELETE
/**
 * @swagger
 * api/cex/{id}:
 *   delete:
 *     summary: Delete a CEX account
 *     tags: [CEX Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', authMiddleware, deleteCexAccount)

export default router
