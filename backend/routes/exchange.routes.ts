// /routes/exchange.routes.ts
import { Router } from "express";
import {
  fetchBinanceData,
  fetchOKXData,
  fetchBingXData,
  fetchBybitData,
  fetchBitgetData
} from "../controllers/exchange.controller";
import { authMiddleware } from '../middleware/auth.middleware'


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Exchange
 *   description: API for connecting to and fetching data from crypto exchanges
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExchangeResponse:
 *       type: object
 *       properties:
 *         accountInfo:
 *           type: object
 *         positions:
 *           type: array
 *           items:
 *             type: object
 *         pnl:
 *           type: number
 *         assets:
 *           type: array
 *           items:
 *             type: object
 */

/**
 * @swagger
 * /api/exchange/binance/data:
 *   get:
 *     summary: Fetch account data from Binance
 *     tags: [Exchange]
 *     description: >
 *       Fetches Binance account data for the authenticated user.  
 *       API keys are stored securely in the database when linked, so you don’t need to provide them here.
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExchangeResponse'
 *       401:
 *         description: Unauthorized (user not logged in)
 *       404:
 *         description: Binance account not linked
 */
router.get("/binance/data", authMiddleware, fetchBinanceData);

/**
 * @swagger
 * /api/exchange/okx/data:
 *   get:
 *     summary: Fetch account data from OKX
 *     tags: [Exchange]
 *     description: >
 *       Fetches OKX account data for the authenticated user.  
 *       API keys are stored securely in the database when linked, so you don’t need to provide them here.  
 *       (Requires API Key, Secret, and Passphrase to be linked beforehand.)
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExchangeResponse'
 *       401:
 *         description: Unauthorized (user not logged in)
 *       404:
 *         description: OKX account not linked
 */
router.get("/okx/data", authMiddleware, fetchOKXData);

/**
 * @swagger
 * /api/exchange/bingx/data:
 *   get:
 *     summary: Fetch account data from BingX
 *     tags: [Exchange]
 *     description: >
 *       Fetches BingX account data for the authenticated user.  
 *       API keys are stored securely in the database when linked, so you don’t need to provide them here.  
 *       (Requires API Key and Secret to be linked beforehand.)
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExchangeResponse'
 *       401:
 *         description: Unauthorized (user not logged in)
 *       404:
 *         description: BingX account not linked
 */
router.get("/bingx/data", authMiddleware, fetchBingXData);

/**
 * @swagger
 * /api/exchange/bybit/data:
 *   get:
 *     summary: Fetch account data from Bybit
 *     tags: [Exchange]
 *     description: >
 *       Fetches Bybit account data for the authenticated user.  
 *       API keys are stored securely in the database when linked, so you don’t need to provide them here.  
 *       (Requires API Key and Secret to be linked beforehand.)
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExchangeResponse'
 *       401:
 *         description: Unauthorized (user not logged in)
 *       404:
 *         description: Bybit account not linked
 */
router.get("/bybit/data", authMiddleware, fetchBybitData);

/**
 * @swagger
 * /api/exchange/bitget/data:
 *   get:
 *     summary: Fetch account data from Bitget
 *     tags: [Exchange]
 *     description: >
 *       Fetches Bitget account data for the authenticated user.  
 *       API keys are stored securely in the database when linked, so you don’t need to provide them here.  
 *       (Requires API Key, Secret, and optionally Passphrase to be linked beforehand.)
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExchangeResponse'
 *       401:
 *         description: Unauthorized (user not logged in)
 *       404:
 *         description: Bitget account not linked
 */
router.get("/bitget/data", authMiddleware, fetchBitgetData);

export default router;
