// /routes/exchange.routes.ts
import { Router } from "express";
import {
  fetchBinanceData,
  fetchOKXData,
  fetchBingXData,
  fetchBybitData,
  fetchBitgetData
} from "../controllers/exchange.controller";

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
 *     ExchangeRequest:
 *       type: object
 *       required:
 *         - apiKey
 *         - secretKey
 *       properties:
 *         apiKey:
 *           type: string
 *           description: The API key from the exchange
 *         secretKey:
 *           type: string
 *           description: The API secret from the exchange
 *         passphrase:
 *           type: string
 *           description: Passphrase required for OKX/Bitget (optional for others)
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
 *   post:
 *     summary: Fetch account data from Binance
 *     tags: [Exchange]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExchangeRequest'
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExchangeResponse'
 */
router.post("/binance/data", fetchBinanceData);

/**
 * @swagger
 * /api/exchange/okx/data:
 *   post:
 *     summary: Fetch account data from OKX
 *     tags: [Exchange]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExchangeRequest'
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExchangeResponse'
 */
router.post("/okx/data", fetchOKXData);

/**
 * @swagger
 * /api/exchange/bingx/data:
 *   post:
 *     summary: Fetch account data from BingX
 *     tags: [Exchange]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExchangeRequest'
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExchangeResponse'
 */
router.post("/bingx/data", fetchBingXData);

/**
 * @swagger
 * /api/exchange/bybit/data:
 *   post:
 *     summary: Fetch account data from Bybit
 *     tags: [Exchange]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExchangeRequest'
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExchangeResponse'
 */
router.post("/bybit/data", fetchBybitData);

/**
 * @swagger
 * /api/exchange/bitget/data:
 *   post:
 *     summary: Fetch account data from Bitget
 *     tags: [Exchange]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExchangeRequest'
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExchangeResponse'
 */
router.post("/bitget/data", fetchBitgetData);

export default router;
