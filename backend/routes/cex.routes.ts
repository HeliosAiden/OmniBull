// src/routes/exchange.routes.ts
import { Router } from 'express';
import {
  addExchange,
  getExchanges,
  getExchangeById,
  updateExchange,
  deleteExchange
} from '../controllers/cex.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

const router = Router();

/**
 * @swagger
 * /api/exchange/add:
 *   post:
 *     summary: Add a new Exchange (Admin only)
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - label
 *             properties:
 *               name:
 *                 type: string
 *                 example: binance
 *               label:
 *                 type: string
 *                 example: Binance Main
 *     responses:
 *       201:
 *         description: Exchange added successfully
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Exchange already exists
 *       403:
 *         description: Forbidden
 */
router.post('/add', authMiddleware, adminMiddleware, addExchange);

/**
 * @swagger
 * /api/exchange:
 *   get:
 *     summary: Get all Exchanges
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exchanges
 */
router.get('/', authMiddleware, getExchanges);

/**
 * @swagger
 * /api/exchange/{id}:
 *   get:
 *     summary: Get an Exchange by ID
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exchange found
 *       404:
 *         description: Exchange not found
 */
router.get('/:id', authMiddleware, getExchangeById);

/**
 * @swagger
 * /api/exchange/{id}:
 *   put:
 *     summary: Update an Exchange (Admin only)
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
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
 *               name:
 *                 type: string
 *               label:
 *                 type: string
 *     responses:
 *       200:
 *         description: Exchange updated
 *       404:
 *         description: Exchange not found
 *       403:
 *         description: Forbidden
 */
router.put('/:id', authMiddleware, adminMiddleware, updateExchange);

/**
 * @swagger
 * /api/exchange/{id}:
 *   delete:
 *     summary: Delete an Exchange (Admin only)
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exchange deleted
 *       404:
 *         description: Exchange not found
 *       403:
 *         description: Forbidden
 */
router.delete('/:id', authMiddleware, adminMiddleware, deleteExchange);

export default router;
