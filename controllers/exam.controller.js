import ExamService from "../services/exam.service.js";

class ExamController {
  async createExam(req, res) {
    try {
      const { title } = req.body;
      const createdBy = req.user.id; 
      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }
      const exam = await ExamService.createExam(createdBy, title);
      return res.status(201).json(exam);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async submitExam(req, res) {
    try {
      const { examId, answers } = req.body;
      const userId = req.user.id;
      if (!examId || !answers) {
        return res.status(400).json({ error: "Exam ID and answers are required" });
      }
      const submission = await ExamService.submitExam(userId, examId, answers);
      return res.status(201).json(submission);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getExamSubmissions(req, res) {
    try {
      const { examId } = req.params;
      const submissions = await ExamService.getExamSubmissions(examId);
      return res.status(200).json(submissions);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  
  async registerExam(req, res) {
    try {
      const { examId } = req.params; 
      const userId = req.user.id;      

      
      const registration = await ExamService.registerExam(userId, examId);
      return res.status(201).json({ message: "Successfully registered for the exam", registration });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ExamController();
