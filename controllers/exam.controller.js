import { ExamService } from "../services/exam.service.js";

class ExamController {
  async createExam(req, res) {
    try {
      const examData = req.body;
      const exam = await ExamService.createExam(examData);
      res.status(201).json({ success: true, exam });
    } catch (error) {
      res.status(error.statusCode || 400).json({ success: false, error: error.message });
    }
  }

  async getExams(req, res) {
    try {
      const exams = await ExamService.getAllExams();
      res.json({ success: true, exams });
    } catch (error) {
      res.status(error.statusCode || 400).json({ success: false, error: error.message });
    }
  }

  async getExamById(req, res) {
    try {
      const exam = await ExamService.getExamById(req.params.id);
      res.json({ success: true, exam });
    } catch (error) {
      res.status(error.statusCode || 400).json({ success: false, error: error.message });
    }
  }

  async updateExam(req, res) {
    try {
      const exam = await ExamService.updateExam(req.params.id, req.body);
      res.json({ success: true, exam });
    } catch (error) {
      res.status(error.statusCode || 400).json({ success: false, error: error.message });
    }
  }

  async deleteExam(req, res) {
    try {
      await ExamService.deleteExam(req.params.id);
      res.json({ success: true, message: "Exam deleted" });
    } catch (error) {
      res.status(error.statusCode || 400).json({ success: false, error: error.message });
    }
  }

  // Endpoint for students to register and submit answers
  async registerExam(req, res) {
    try {
      const examId = req.params.examId;
      const studentId = req.user.id; // set via your authentication middleware
      const answers = req.body.answers; // could be an object or array of answers
      const registration = await ExamService.registerExam(examId, studentId, answers);
      res.status(201).json({ success: true, registration });
    } catch (error) {
      res.status(error.statusCode || 400).json({ success: false, error: error.message });
    }
  }

  // For admin to fetch all registrations (e.g., registered students and their answers)
  async getExamRegistrations(req, res) {
    try {
      const examId = req.params.examId;
      const registrations = await ExamService.getExamRegistrations(examId);
      res.json({ success: true, registrations });
    } catch (error) {
      res.status(error.statusCode || 400).json({ success: false, error: error.message });
    }
  }
}

export default new ExamController();
