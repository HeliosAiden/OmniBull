// src/controllers/user.controller.ts
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth.middleware'

const prisma = new PrismaClient()

// 🟢 GET /api/users
export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, role: true, createdAt: true }
    })
    res.json({ users })
  } catch (err) {
    console.error('List users error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// 🟢 GET /api/users/:id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, role: true, createdAt: true }
    })

    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ user })
  } catch (err) {
    console.error('Get user by ID error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// 🟢 GET /api/user/current
export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        wallets: true,
        cexAccounts: {
          select: {
            id: true,
            label: true,
            encrypted: true,
            exchange: { select: { name: true, label: true } }
          }
        }
      }
    })

    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ user })
  } catch (err) {
    console.error('Get current user error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
