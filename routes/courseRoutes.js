// routes/courseRoutes.js
import express from "express";
import { authenticateToken, isInstructor } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Your routes here...
router.post("/create", authenticateToken, isInstructor, (req, res) => {
  res.send("Course created successfully");
});

export default router;
