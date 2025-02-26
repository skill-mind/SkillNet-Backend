import dotenv from "dotenv"
import { DataSource } from "typeorm";
import { Course } from "../entities/course.entity.js"
import { UserCourse } from "../entities/userCourse.entity.js"
import  UserEntity  from "../entities/user.entity.js";
import Job  from "../entities/job.entity.js";
import Notification from "../entities/notification.entity.js";

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
  entities: [UserEntity, Course, UserCourse, Job, Notification],
  subscribers: [],
  migrations: [],
})


export default AppDataSource;

