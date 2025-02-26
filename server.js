import AppDataSource from "./config/config.js";
import 'dotenv/config'
import express, { json } from 'express';
import authRouter from './routes/auth.routes.js';
import jobRoutes from './routes/jobRoutes.js';
import courseRoutes from "./routes/courseRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

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
    app.use('/api/jobs', jobRoutes);
    app.use("/api/courses", courseRoutes);
    app.use("/api/notifications", notificationRoutes);
    app.use("/api/payments", paymentRoutes);
    
    // Error handling
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Internal server error' });
    });
    
    // Start the server and listen on the specified port
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  // Catch and handle database connection erro
  .catch((error) => {
    console.error('Database connection failed:', error);
     // Exit the process with a failure status code
    process.exit(1);
  });