import AppDataSource from "../config/config.js";
import Exam from "../entities/exam.entity.js";
import ExamSubmission from "../entities/examSubmission.entity.js";
import User from "../entities/user.entity.js";
import ExamRegistration from "../entities/examRegistration.entity.js"; 

class ExamService {
  static async createExam(userId, title) {
    try {
      const examRepository = AppDataSource.getRepository(Exam);
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOne({ where: { id: userId } });
      if (!user) throw new Error(`User with ID ${userId} not found`);

      const existingExam = await examRepository.findOne({ where: { title } });
      if (existingExam) throw new Error("Exam with this title already exists");

      const exam = examRepository.create({ title, createdBy: user.id });
      await examRepository.save(exam);
      return exam;
    } catch (error) {
      console.error("Error creating exam:", error);
      throw error;
    }
  }

  static async submitExam(userId, examId, answers) {
    try {
      const submissionRepository = AppDataSource.getRepository(ExamSubmission);
      const examRepository = AppDataSource.getRepository(Exam);
      const userRepository = AppDataSource.getRepository(User);

      const exam = await examRepository.findOne({ where: { id: examId } });
      if (!exam) throw new Error(`Exam with ID ${examId} not found`);

      const user = await userRepository.findOne({ where: { id: userId } });
      if (!user) throw new Error(`User with ID ${userId} not found`);

      // Prevent duplicate submissions
      const existingSubmission = await submissionRepository.findOne({ where: { examId, userId } });
      if (existingSubmission) throw new Error("You have already submitted this exam.");

      const submission = submissionRepository.create({ examId, userId, answers });
      await submissionRepository.save(submission);
      return submission;
    } catch (error) {
      console.error("Error submitting exam:", error);
      throw error;
    }
  }

  static async getExamSubmissions(examId) {
    try {
      const submissionRepository = AppDataSource.getRepository(ExamSubmission);
      const submissions = await submissionRepository.find({ 
        where: { examId },
        relations: ["user"]
      });
      return submissions;
    } catch (error) {
      console.error("Error fetching exam submissions:", error);
      throw error;
    }
  }

  // Register a student for an exam
  static async registerExam(userId, examId) {
    try {
      const registrationRepository = AppDataSource.getRepository(ExamRegistration);
      const examRepository = AppDataSource.getRepository(Exam);
      const userRepository = AppDataSource.getRepository(User);

      const exam = await examRepository.findOne({ where: { id: examId } });
      if (!exam) throw new Error(`Exam with ID ${examId} not found`);

      const user = await userRepository.findOne({ where: { id: userId } });
      if (!user) throw new Error(`User with ID ${userId} not found`);

      // Prevent duplicate registration
      const existingRegistration = await registrationRepository.findOne({
        where: { exam: { id: examId }, user: { id: userId } }
      });
      if (existingRegistration) throw new Error("You are already registered for this exam");

      const registration = registrationRepository.create({ exam, user });
      await registrationRepository.save(registration);
      return registration;
    } catch (error) {
      console.error("Error registering for exam:", error);
      throw error;
    }
  }
}

export default ExamService;
