import { Request, Response } from 'express'
import { prisma } from '../utils/prisma';

/**
 * CREATE - Add a new Exchange
 */
export const addExchange = async (req: Request, res: Response) => {
  try {
    const { name, label } = req.body

    if (!name || !label) {
      return res.status(400).json({ error: 'name and label are required' })
    }

    const existing = await prisma.exchange.findUnique({ where: { name } })
    if (existing) {
      return res.status(409).json({ error: 'Exchange with this name already exists' })
    }

    const exchange = await prisma.exchange.create({
      data: { name, label }
    })

    res.status(201).json({ exchange })
  } catch (err) {
    console.error('Add Exchange Error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * READ ALL - Get all Exchanges
 */
export const getExchanges = async (_req: Request, res: Response) => {
  try {
    const exchanges = await prisma.exchange.findMany({
      include: { accounts: true } // if you want to fetch linked CexAccounts
    })

    res.json({ exchanges })
  } catch (err) {
    console.error('Get Exchanges Error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * READ ONE - Get Exchange by ID
 */
export const getExchangeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const exchange = await prisma.exchange.findUnique({
      where: { id },
      include: { accounts: true }
    })

    if (!exchange) {
      return res.status(404).json({ error: 'Exchange not found' })
    }

    res.json({ exchange })
  } catch (err) {
    console.error('Get Exchange By ID Error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * UPDATE - Update an Exchange
 */
export const updateExchange = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, label } = req.body

    const existing = await prisma.exchange.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({ error: 'Exchange not found' })
    }

    const updated = await prisma.exchange.update({
      where: { id },
      data: { name, label }
    })

    res.json({ exchange: updated })
  } catch (err) {
    console.error('Update Exchange Error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * DELETE - Remove an Exchange
 */
export const deleteExchange = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const existing = await prisma.exchange.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({ error: 'Exchange not found' })
    }

    await prisma.exchange.delete({ where: { id } })

    res.json({ message: 'Exchange deleted successfully' })
  } catch (err) {
    console.error('Delete Exchange Error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}