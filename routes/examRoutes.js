import express from "express";
import AppDataSource from "../config/database.js";
import { Exam } from "../entities/exam.entity.js";
import { ExamRegistration } from "../entities/examRegistration.entity.js";

const router = express.Router();

/** 
 * ✅ Create a new exam 
 * POST /api/exams/create
 */
router.post("/create", async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    const examRepo = AppDataSource.getRepository(Exam);

    const existingExam = await examRepo.findOne({ where: { title } });
    if (existingExam) return res.status(400).json({ message: "Exam already exists!" });

    const newExam = examRepo.create({ title, description, createdBy });
    await examRepo.save(newExam);
    res.status(201).json(newExam);
  } catch (error) {
    res.status(500).json({ message: "Error creating exam", error: error.message });
  }
});

/** 
 * ✅ Get all exams 
 * GET /api/exams
 */
router.get("/", async (req, res) => {
  try {
    const exams = await AppDataSource.getRepository(Exam).find();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exams", error: error.message });
  }
});

/** 
 * ✅ Get a single exam by ID 
 * GET /api/exams/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await AppDataSource.getRepository(Exam).findOne({ where: { id } });

    if (!exam) return res.status(404).json({ message: "Exam not found!" });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exam", error: error.message });
  }
});

/** 
 * ✅ Update an exam 
 * PUT /api/exams/:id
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const examRepo = AppDataSource.getRepository(Exam);

    let exam = await examRepo.findOne({ where: { id } });
    if (!exam) return res.status(404).json({ message: "Exam not found!" });

    exam.title = title || exam.title;
    exam.description = description || exam.description;

    await examRepo.save(exam);
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: "Error updating exam", error: error.message });
  }
});

/** 
 * ✅ Delete an exam 
 * DELETE /api/exams/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const examRepo = AppDataSource.getRepository(Exam);

    const exam = await examRepo.findOne({ where: { id } });
    if (!exam) return res.status(404).json({ message: "Exam not found!" });

    await examRepo.remove(exam);
    res.json({ message: "Exam deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting exam", error: error.message });
  }
});

/** 
 * ✅ Register a user for an exam 
 * POST /api/exams/register
 */
router.post("/register", async (req, res) => {
  try {
    const { userId, examId } = req.body;
    const examRegRepo = AppDataSource.getRepository(ExamRegistration);

    const existingReg = await examRegRepo.findOne({ where: { userId, examId } });
    if (existingReg) return res.status(400).json({ message: "User already registered for this exam!" });

    const registration = examRegRepo.create({ userId, examId });
    await examRegRepo.save(registration);
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: "Error registering for exam", error: error.message });
  }
});

/** 
 * ✅ Submit exam answers 
 * POST /api/exams/submit
 */
router.post("/submit", async (req, res) => {
  try {
    const { userId, examId, answers } = req.body;
    const examRegRepo = AppDataSource.getRepository(ExamRegistration);

    const registration = await examRegRepo.findOne({ where: { userId, examId } });
    if (!registration) return res.status(404).json({ message: "User not registered for this exam!" });

    registration.answers = answers;
    registration.submittedAt = new Date();
    await examRegRepo.save(registration);
    
    res.json({ message: "Answers submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting answers", error: error.message });
  }
});

export default router;
