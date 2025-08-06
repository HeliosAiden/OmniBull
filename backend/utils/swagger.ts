// src/utils/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Omni Bull backend',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.ts', './index.ts'], // Path to your route files with JSDoc comments
}

export const swaggerSpec = swaggerJsdoc(options)
export const swaggerDocs = swaggerUi
