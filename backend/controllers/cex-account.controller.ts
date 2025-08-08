// src/controllersapi/cex.controller.ts
import { encrypt } from '../utils/encryption'
import { prisma } from '../utils/prisma';

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

export const getCexAccounts = async (req, res) => {
  const userId = req.user.id
  const accounts = await prisma.cexAccount.findMany({
    where: { userId },
    include: { exchange: true }
  })
  res.json(accounts)
}

export const getCexAccountById = async (req, res) => {
  const userId = req.user.id
  const { id } = req.params

  const account = await prisma.cexAccount.findFirst({
    where: { id, userId },
    include: { exchange: true }
  })

  if (!account) return res.status(404).json({ message: 'Not found' })

  res.json(account)
}

export const updateCexAccount = async (req, res) => {
  const userId = req.user.id
  const { id } = req.params
  const { label, apiKey, apiSecret } = req.body

  const existing = await prisma.cexAccount.findFirst({ where: { id, userId } })
  if (!existing) return res.status(404).json({ message: 'Not found' })

  const dataToUpdate: any = {}
  if (label) dataToUpdate.label = label
  if (apiKey) dataToUpdate.apiKey = encrypt(apiKey)
  if (apiSecret) dataToUpdate.apiSecret = encrypt(apiSecret)

  const updated = await prisma.cexAccount.update({
    where: { id },
    data: dataToUpdate
  })

  res.json({ message: 'Updated', account: updated })
}

export const deleteCexAccount = async (req, res) => {
  const userId = req.user.id
  const { id } = req.params

  const existing = await prisma.cexAccount.findFirst({ where: { id, userId } })
  if (!existing) return res.status(404).json({ message: 'Not found' })

  await prisma.cexAccount.delete({ where: { id } })

  res.json({ message: 'Deleted' })
}
