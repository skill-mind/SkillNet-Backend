import { EntitySchema } from "typeorm";

export const Exam = new EntitySchema({
  name: "Exam",
  tableName: "exams",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    title: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    description: {
      type: "text",
      nullable: true,
    },
    createdBy: {
      type: "int",
      nullable: false,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    registeredUsers: {
      type: "one-to-many",
      target: "ExamRegistration",
      inverseSide: "exam",
    },
  },
});
