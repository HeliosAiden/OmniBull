import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { swaggerDocs, swaggerSpec } from './utils/swagger'

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes'
import cexAccountRoutes from './routes/cex-account.routes'
import cexRoutes from './routes/cex.routes'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


// Setup swagger api
app.use('/api/auth', authRoutes); // 👈 Mount auth routes

app.use('/api/exchanges', cexRoutes)

app.use('/api/cex-account', cexAccountRoutes)

app.use('/api/users', userRoutes)

app.use('/', swaggerDocs.serve, swaggerDocs.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true, // keep token after page reload
  },
}))

app.use(express.urlencoded({ extended: true }));

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`✅ Backend ready at http://localhost:${process.env.BACKEND_PORT}`);
});
