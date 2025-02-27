import express from "express";
import ExamController from "../controllers/exam.controller.js";
import { authenticateToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// --- Admin routes for exam CRUD ---
router.post("/", authenticateToken, isAdmin, (req, res) =>
  ExamController.createExam(req, res)
);
router.get("/", authenticateToken, isAdmin, (req, res) =>
  ExamController.getExams(req, res)
);
router.get("/:id", authenticateToken, isAdmin, (req, res) =>
  ExamController.getExamById(req, res)
);
router.put("/:id", authenticateToken, isAdmin, (req, res) =>
  ExamController.updateExam(req, res)
);
router.delete("/:id", authenticateToken, isAdmin, (req, res) =>
  ExamController.deleteExam(req, res)
);

// --- Student route for registration/answer submission ---
// (No role middleware so that any authenticated student can register)
router.post("/:examId/register", authenticateToken, (req, res) =>
  ExamController.registerExam(req, res)
);

// --- Optional: Admin route to view all registrations ---
router.get("/:examId/registrations", authenticateToken, isAdmin, (req, res) =>
  ExamController.getExamRegistrations(req, res)
);

export default router;
