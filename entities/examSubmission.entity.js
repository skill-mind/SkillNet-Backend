import { EntitySchema } from "typeorm";

const ExamSubmission = new EntitySchema({
  name: "ExamSubmission",
  tableName: "exam_submissions",
  columns: {
    id: { primary: true, type: "int", generated: true },
    examId: { type: "int" },
    userId: { type: "int" },
    answers: { type: "json" },
    submittedAt: { type: "timestamp", createDate: true },
  },
  relations: {
    exam: { type: "many-to-one", target: "Exam", joinColumn: { name: "examId" } },
    user: { type: "many-to-one", target: "User", joinColumn: { name: "userId" } },
  },
});

export default ExamSubmission;
