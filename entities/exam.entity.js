import { EntitySchema } from "typeorm";

export const Exam = new EntitySchema({
  name: "Exam",
  tableName: "exams",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
      unique: true, // prevents duplicate exam creation
    },
    description: {
      type: "text",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
});
