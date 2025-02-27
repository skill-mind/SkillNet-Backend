import { EntitySchema } from "typeorm";

export const ExamRegistration = new EntitySchema({
  name: "ExamRegistration",
  tableName: "exam_registrations",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    // Store answers as JSON (or text if you prefer)
    answers: {
      type: "json",
      nullable: true,
    },
    registrationDate: {
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    exam: {
      type: "many-to-one",
      target: "Exam",
      joinColumn: { name: "examId" },
      onDelete: "CASCADE",
    },
    student: {
      type: "many-to-one",
      target: "User", // reusing your User entity
      joinColumn: { name: "studentId" },
      onDelete: "CASCADE",
    },
  },
});
