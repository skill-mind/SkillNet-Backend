import express from "express";
import ExamController from "../controllers/exam.controller.js";
import { authenticateToken, isInstructorOrAdmin, isAuthenticatedUser, isStudent } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Endpoints for exam management (only instructors/admins)
router.post("/create", authenticateToken, isInstructorOrAdmin, ExamController.createExam);
// (Assume update and delete endpoints would be added here for instructors/admins)

// Endpoint for exam submission (accessible to all authenticated users)
router.post("/submit", authenticateToken, isAuthenticatedUser, ExamController.submitExam);

// Endpoint to fetch exam submissions (only instructors/admins)
router.get("/:examId/submissions", authenticateToken, isInstructorOrAdmin, ExamController.getExamSubmissions);

// New: Endpoint for students to register for an exam (only students allowed)
router.post("/:examId/register", authenticateToken, isStudent, ExamController.registerExam);

export default router;
