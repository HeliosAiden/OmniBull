// /controllers/exchange.controller.ts
import { Request, Response } from "express";
import { getAccountData } from "../services/exchange.service";
import { ExchangeKeys, ExchangeName } from "../types/exchange"; // adjust path as needed

async function fetchExchangeData(res: Response, exchange: ExchangeName, keys: ExchangeKeys) {
  try {
    const data = await getAccountData(exchange, keys);
    res.json(data);
  } catch (err: any) {
    const status = err.response?.status || 500;
    res.status(status).json({
      error: err.response?.data || err.message,
    });
  }
}

export async function fetchBinanceData(req: Request, res: Response) {
  const { keys } = req.body;
  if (!keys) return res.status(400).json({ error: "Missing keys" });
  return fetchExchangeData(res, "binance", keys);
}

export async function fetchOKXData(req: Request, res: Response) {
  console.log(req.body)
  const { apiKey, secretKey, passphrase } = req.body;

  if (!apiKey || !secretKey || !passphrase) {
    return res.status(400).json({ error: "Missing keys" });
  }
  return fetchExchangeData(res, "okx", { apiKey, secretKey, passphrase });
}

export async function fetchBybitData(req: Request, res: Response) {
  const { keys } = req.body;
  if (!keys) return res.status(400).json({ error: "Missing keys" });
  return fetchExchangeData(res, "bybit", keys);
}

export async function fetchBitgetData(req: Request, res: Response) {
  const { keys } = req.body;
  if (!keys) return res.status(400).json({ error: "Missing keys" });
  return fetchExchangeData(res, "bitget", keys);
}

export async function fetchBingXData(req: Request, res: Response) {
  const { keys } = req.body;
  if (!keys) return res.status(400).json({ error: "Missing keys" });
  return fetchExchangeData(res, "bingx", keys);
}
