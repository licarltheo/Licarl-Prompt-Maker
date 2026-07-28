import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';
import { promptsRouter } from './routes/prompts';
import { providersRouter } from './routes/providers';
import { healthRouter } from './routes/health';
import { errorHandler } from './middleware/errorHandler';
import { authenticate } from './middleware/auth';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.APP_URL || 'http://localhost:5173', credentials: true },
});

const PORT = Number(process.env.PORT) || 3001;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.APP_URL || 'http://localhost:5173', credentials: true }));
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/prompts', authenticate, promptsRouter);
app.use('/api/providers', authenticate, providersRouter);

io.on('connection', (socket) => {
  console.log(`WS connected: ${socket.id}`);
  socket.on('join', (room: string) => socket.join(room));
  socket.on('disconnect', () => console.log(`WS disconnected: ${socket.id}`));
});

app.set('io', io);
app.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`Licarl API running on http://localhost:${PORT}`);
});

export { app, io };
