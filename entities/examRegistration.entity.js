import { EntitySchema } from "typeorm";

const ExamRegistration = new EntitySchema({
  name: "ExamRegistration",
  tableName: "exam_registrations",
  columns: {
    id: { primary: true, type: "int", generated: true },
    createdAt: { type: "timestamp", createDate: true },
  },
  relations: {
    user: { type: "many-to-one", target: "User", joinColumn: { name: "userId" } },
    exam: { type: "many-to-one", target: "Exam", joinColumn: { name: "examId" } },
  },
  uniques: [{ columns: ["user", "exam"] }], // Prevent duplicate registrations
});

export default ExamRegistration;
