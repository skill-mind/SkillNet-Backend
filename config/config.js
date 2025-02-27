import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Course } from "../entities/course.entity.js";
import { UserCourse } from "../entities/userCourse.entity.js";
import UserEntity from "../entities/user.entity.js";
import Job from "../entities/job.entity.js";
import Notification from "../entities/notification.entity.js";
import { Payment } from "../entities/payment.entity.js";
import { Exam } from "../entities/exam.entity.js";
import { ExamRegistration } from "../entities/examRegistration.entity.js";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST, 
  port: Number(process.env.DB_PORT), 
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [UserEntity, Course, UserCourse, Job, Notification, Payment, Exam, ExamRegistration],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;
