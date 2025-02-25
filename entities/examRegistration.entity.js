import { EntitySchema } from "typeorm";

export const ExamRegistration = new EntitySchema({
  name: "ExamRegistration",
  tableName: "exam_registrations",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    userId: {
      type: "int",
      nullable: false,
    },
    examId: {
      type: "int",
      nullable: false,
    },
    answers: {
      type: "jsonb", // Stores answers in JSON format
      nullable: true,
    },
    submittedAt: {
      type: "timestamp",
      nullable: true,
    },
  },
  relations: {
    exam: {
      type: "many-to-one",
      target: "Exam",
      onDelete: "CASCADE",
    },
  },
  uniqueConstraints: [
    {
      name: "unique_user_exam",
      columns: ["userId", "examId"], // Prevent duplicate registrations
    },
  ],
});
