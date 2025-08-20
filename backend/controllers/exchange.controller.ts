// /controllers/exchange.controller.ts
import { Request, Response } from "express";
import { getAccountData } from "../services/exchange.service";
import { ExchangeKeys, ExchangeName } from "../types/exchange"; // adjust path as needed
import { decrypt } from "../utils/encryption";
import { prisma } from "../utils/prisma";


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
  try {
    const userId = req.user?.id; // set by your authMiddleware

    // 1. Get the *only* Binance account for this user
    const account = await prisma.cexAccount.findFirst({
      where: {
        userId: userId,
        exchange: { name: "binance" },
        status: "active"
      },
      include: { exchange: true }
    });

    if (!account) {
      return res.status(404).json({ error: "Binance account not linked" });
    }

    // 2. Decrypt keys
    const apiKey = decrypt(account.apiKey);
    const secretKey = account.apiSecret ? decrypt(account.apiSecret) : '';

    // 3. Pass to service layer
    return fetchExchangeData(res, "binance", { apiKey, secretKey });
  } catch (err) {
    console.error("Error fetching Binance data:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function fetchOKXData(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    const account = await prisma.cexAccount.findFirst({
      where: {
        userId,
        exchange: { name: "okx" },
        status: "active"
      },
      include: { exchange: true }
    });

    if (!account) {
      return res.status(404).json({ error: "OKX account not linked" });
    }

    const apiKey = decrypt(account.apiKey);
    const secretKey = account.apiSecret ? decrypt(account.apiSecret) : "";
    const passphrase = account.passphrase ? decrypt(account.passphrase) : "";

    return fetchExchangeData(res, "okx", { apiKey, secretKey, passphrase });
  } catch (err) {
    console.error("Error fetching OKX data:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function fetchBybitData(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    const account = await prisma.cexAccount.findFirst({
      where: {
        userId,
        exchange: { name: "bybit" },
        status: "active"
      },
      include: { exchange: true }
    });

    if (!account) {
      return res.status(404).json({ error: "Bybit account not linked" });
    }

    const apiKey = decrypt(account.apiKey);
    const secretKey = account.apiSecret ? decrypt(account.apiSecret) : "";

    return fetchExchangeData(res, "bybit", { apiKey, secretKey });
  } catch (err) {
    console.error("Error fetching Bybit data:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function fetchBitgetData(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    const account = await prisma.cexAccount.findFirst({
      where: {
        userId,
        exchange: { name: "bitget" },
        status: "active"
      },
      include: { exchange: true }
    });

    if (!account) {
      return res.status(404).json({ error: "Bitget account not linked" });
    }

    const apiKey = decrypt(account.apiKey);
    const secretKey = account.apiSecret ? decrypt(account.apiSecret) : "";
    const passphrase = account.passphrase ? decrypt(account.passphrase) : "";

    return fetchExchangeData(res, "bitget", { apiKey, secretKey, passphrase });
  } catch (err) {
    console.error("Error fetching Bitget data:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function fetchBingXData(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    const account = await prisma.cexAccount.findFirst({
      where: {
        userId,
        exchange: { name: "bingx" },
        status: "active"
      },
      include: { exchange: true }
    });

    if (!account) {
      return res.status(404).json({ error: "BingX account not linked" });
    }

    const apiKey = decrypt(account.apiKey);
    const secretKey = account.apiSecret ? decrypt(account.apiSecret) : "";

    return fetchExchangeData(res, "bingx", { apiKey, secretKey });
  } catch (err) {
    console.error("Error fetching BingX data:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
