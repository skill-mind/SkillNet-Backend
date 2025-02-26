import dotenv from "dotenv"
import { DataSource } from "typeorm";
import { Course } from "../entities/course.entity.js"
import { UserCourse } from "../entities/userCourse.entity.js"
import  UserEntity  from "../entities/user.entity.js";
import Job  from "../entities/job.entity.js";
import Notification from "../entities/notification.entity.js";
import { Payment } from "../entities/payment.entity.js";
import Exam from "../entities/exam.entity.js";
import ExamSubmission from "../entities/examSubmission.entity.js";

dotenv.config()

const AppDataSource = new DataSource({
 type: "postgres",
host: process.env.DB_HOST || "localhost",
port: (process.env.DB_PORT) || 5432,
username: process.env.DB_USER || "postgres",
password: process.env.DB_PASSWORD || "5028nuyo",
database: process.env.DB_NAME || "skillnet",
synchronize: true,
  logging: true,
  entities: [UserEntity, Exam, Course, UserCourse, Job, Notification, Payment, ExamSubmission],
  subscribers: [],
  migrations: [],
})

export default AppDataSource;

