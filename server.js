import 'dotenv/config'
import AppDataSource from "./config/config.js";
import express, { json } from 'express';
import authRouter from './routes/auth.routes.js';
import helmet from 'helmet';
import cors from 'cors';

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    
    const app = express();
    
    // Middleware
    app.use(helmet());
    app.use(cors());
    app.use(json());
    
    // Routes
    app.use('/api/auth', authRouter);
    
    // Error handling
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Internal server error' });
    });
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });