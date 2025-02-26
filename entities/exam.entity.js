import { EntitySchema } from "typeorm";

const Exam = new EntitySchema({
  name: "Exam",
  tableName: "exams",
  columns: {
    id: { primary: true, type: "int", generated: true },
    title: { type: "varchar", unique: true },
    createdAt: { type: "timestamp", createDate: true },
  },
  relations: {
    createdBy: { 
      type: "many-to-one", 
      target: "User", 
      joinColumn: { name: "createdBy" },
      inverseSide: "examsCreated",  // Connects to User.examsCreated
    },
    submissions: { type: "one-to-many", target: "ExamSubmission", inverseSide: "exam" },
  },
});

export default Exam;
