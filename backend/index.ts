import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
  res.json({ user: { id: user.id, email: user.email, role: user.role }, token });
});

app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });

  res.json({ success: true, user: { id: user.id, email: user.email } });
});

app.listen(process.env.PORT, () => {
  console.log(`Backend running on http://localhost:${process.env.PORT}`);
});
