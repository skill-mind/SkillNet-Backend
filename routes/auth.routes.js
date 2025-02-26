// routes/exam.routes.js
import express from "express";
import ExamController from "../controllers/exam.controller.js";
import { 
  authenticateToken, 
  isInstructorOrAdmin, 
  isAuthenticatedUser, 
  isStudent 
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Endpoints accessible by instructors or admins (create exam, get submissions)
router.post("/create", authenticateToken, isInstructorOrAdmin, ExamController.createExam);
router.get("/:examId/submissions", authenticateToken, isInstructorOrAdmin, ExamController.getExamSubmissions);

// Endpoint accessible by any authenticated user for exam submission
router.post("/submit", authenticateToken, isAuthenticatedUser, ExamController.submitExam);

// Endpoint for students to register for an exam
router.post("/:examId/register", authenticateToken, isStudent, ExamController.registerExam);


export default router;
