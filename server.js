import AppDataSource from "./config/config.js";
import 'dotenv/config';
import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import jobRoutes from './routes/jobRoutes.js';
import courseRoutes from "./routes/courseRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import examRoutes from "./routes/exam.routes.js";
import userRoute from "./routes/userRoutes.js";
import router from "./routes/userRoutes.js";

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected!");

    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(json());
    
    app.use(express.json());
    app.use("/api/users", router);
    app.use('/api/auth', authRouter);
    app.use('/api/jobs', jobRoutes);
    app.use("/api/courses", courseRoutes);
    app.use("/api/notifications", notificationRoutes);
    app.use("/api/payments", paymentRoutes);
    app.use("/api/exams", examRoutes);

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(error => console.error("❌ Database connection failed:", error));
