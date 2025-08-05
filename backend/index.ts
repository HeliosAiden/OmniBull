import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import { addCexAccount } from './controllers/cex.controller'
import { authMiddleware } from './middleware/auth.middleware'
import userRoutes from './routes/user.routes'


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes); // 👈 Mount auth routes

app.post('/cex/add', authMiddleware, addCexAccount)

app.use('/api', userRoutes)

app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => res.send('🚀 OmniBull Backend running'));

app.listen(process.env.PORT, () => {
  console.log(`✅ Backend ready at http://localhost:${process.env.PORT}`);
});
