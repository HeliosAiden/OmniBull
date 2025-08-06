import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const JWT_SECRET = process.env.JWT_SECRET!

export interface AuthRequest extends Request {
  user?: { id: string; email?: string }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (!token) return res.status(401).json({ error: 'Missing token' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email?: string }
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

