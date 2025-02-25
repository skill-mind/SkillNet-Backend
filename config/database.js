import { DataSource } from "typeorm";
import { Exam } from "../entities/exam.entity.js";
import { ExamRegistration } from "../entities/examRegistration.entity.js";
import  AppDataSource  from "./config.js";

// Update the existing AppDataSource with entities
AppDataSource.setOptions({
  entities: [Exam, ExamRegistration],
});

export default AppDataSource;