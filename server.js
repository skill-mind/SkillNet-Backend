import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import AppDataSource from "./config/config.js";
import authRouter from "./routes/auth.routes.js";
import jobRoutes from "./routes/jobRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import examRoutes from "./routes/examRoutes.js"; // ✅ Import Exam Routes
const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");

    const app = express();

    // Middleware
    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use("/api/auth", authRouter);
    app.use("/api/jobs", jobRoutes);
    app.use("/api/courses", courseRoutes);
    app.use("/api/exams", examRoutes); // ✅ Add Exam Routes

    // Error Handling Middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: "Internal server error" });
    });

    // Start Server
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });
