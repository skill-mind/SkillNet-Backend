import AppDataSource from "../config/config.js";

const examRepository = AppDataSource.getRepository("Exam");
const examRegistrationRepository = AppDataSource.getRepository("ExamRegistration");

class ExamError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "ExamError";
    this.statusCode = statusCode;
  }
}

export const ExamService = {
  async createExam(examData) {
    // Prevent duplicate exam creation by checking the title
    const existingExam = await examRepository.findOne({ where: { title: examData.title } });
    if (existingExam) {
      throw new ExamError("An exam with this title already exists", 409);
    }
    const exam = examRepository.create(examData);
    return await examRepository.save(exam);
  },

  async getAllExams() {
    return await examRepository.find();
  },

  async getExamById(id) {
    const exam = await examRepository.findOne({ where: { id } });
    if (!exam) {
      throw new ExamError("Exam not found", 404);
    }
    return exam;
  },

  async updateExam(id, examData) {
    const exam = await this.getExamById(id);
    if (examData.title && examData.title !== exam.title) {
      const duplicateExam = await examRepository.findOne({ where: { title: examData.title } });
      if (duplicateExam) {
        throw new ExamError("An exam with this title already exists", 409);
      }
    }
    await examRepository.update(id, examData);
    return await this.getExamById(id);
  },

  async deleteExam(id) {
    const deleteResult = await examRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new ExamError("Exam not found", 404);
    }
  },

  async registerExam(examId, studentId, answers) {
    // Prevent duplicate registration for the same exam/student
    const existingRegistration = await examRegistrationRepository.findOne({
      where: {
        exam: { id: examId },
        student: { id: studentId },
      },
      relations: ["exam", "student"],
    });
    if (existingRegistration) {
      throw new ExamError("Student already registered for this exam", 409);
    }

    // Ensure the exam exists
    const exam = await examRepository.findOne({ where: { id: examId } });
    if (!exam) {
      throw new ExamError("Exam not found", 404);
    }

    const registration = examRegistrationRepository.create({
      exam,
      student: { id: studentId },
      answers, // This can be empty initially or provided during submission
    });
    return await examRegistrationRepository.save(registration);
  },

  async getExamRegistrations(examId) {
    // Fetch registrations with related student details
    const exam = await examRepository.findOne({ where: { id: examId } });
    if (!exam) {
      throw new ExamError("Exam not found", 404);
    }
    return await examRegistrationRepository.find({
      where: { exam: { id: examId } },
      relations: ["student"],
    });
  },
};
