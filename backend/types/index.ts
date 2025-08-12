// src/types/express/index.d.ts
import { User } from '@prisma/client' // or your own User type/interface

declare global {
  namespace Express {
    interface Request {
      user?: User & { role?: string } // role optional if not always present
    }
  }
}
