// src/controllers/cex.controller.ts
import { PrismaClient } from '@prisma/client'
import { encrypt } from '../utils/encryption'

const prisma = new PrismaClient()

export const addCexAccount = async (req, res) => {
  const userId = req.user.id
  const { exchangeName, apiKey, apiSecret, label } = req.body

  const exchange = await prisma.exchange.upsert({
    where: { name: exchangeName },
    update: {},
    create: { name: exchangeName, label: exchangeName }
  })

  const encryptedKey = encrypt(apiKey)
  const encryptedSecret = encrypt(apiSecret)

  const cexAccount = await prisma.cexAccount.create({
    data: {
      userId,
      exchangeId: exchange.id,
      apiKey: encryptedKey,
      apiSecret: encryptedSecret,
      encrypted: true,
      label
    }
  })

  res.json({ message: 'CEX account added', account: cexAccount })
}
