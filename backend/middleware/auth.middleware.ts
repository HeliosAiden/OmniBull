// src/middleware/auth.middleware.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';
import { prisma } from '../utils/prisma';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthRequest extends Request {
  // Match the full Prisma User shape (plus optional role override).
  user?: User & { role?: string };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    // fetch the full user from DB so types align
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) return res.status(401).json({ error: 'Invalid token: user not found' });

    // Optionally remove password from the object before attaching if you want runtime safety.
    // But type expects password field — keep it if you matched types exactly.
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
