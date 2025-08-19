// src/routes/cex-account.routes.ts
import { Router } from 'express'
import {
  addCexAccount,
  getCexAccounts,
  getCexAccountById,
  updateCexAccount,
  deleteCexAccount
} from '../controllers/cex-account.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

// CREATE
/**
 * @swagger
 * /api/cex-account/add:
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
 *                 description: The API key from the exchange
 *               apiSecret:
 *                 type: string
 *                 description: The API secret from the exchange
 *               passphrase:
 *                 type: string
 *                 description: Passphrase required for OKX/Bitget (optional for others)
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
 * /api/cex-account:
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
 * /api/cex-account/{id}:
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
 * /api/cex-account/{id}:
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
 *               passPhrase:
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
 * /api/cex-account/{id}:
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
