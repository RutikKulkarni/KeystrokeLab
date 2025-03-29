import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import authRoutes from './routes/auth.routes';
import sessionRoutes from './routes/session.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

// Error handling
app.use(errorHandler);

export default app;