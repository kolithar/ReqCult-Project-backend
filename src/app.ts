import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const FRONT = process.env.FRONTEND_URL || 'http://localhost:5173';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: FRONT, credentials: true }));

app.use('/api', routes);

app.get('/', (_req, res) => res.send('Juice Shop API'));

app.use(errorHandler);

export default app;
