import express from "express"
import multer from "multer"
import { authenticateToken, isInstructor } from "../middlewares/auth.middleware.js"
import CourseController from "../controllers/course.controller.js"

const router = express.Router()
const upload = multer()

router.post(
  "/",
  authenticateToken,
  isInstructor,
  upload.fields([
    { name: "courseMaterial", maxCount: 1 },
    { name: "courseVideo", maxCount: 1 },
  ]),
  CourseController.createCourse,
)

router.get("/", CourseController.getAllCourses)
router.get("/:id", CourseController.getCourseById)

router.put(
  "/:id",
  authenticateToken,
  isInstructor,
  upload.fields([
    { name: "courseMaterial", maxCount: 1 },
    { name: "courseVideo", maxCount: 1 },
  ]),
  CourseController.updateCourse,
)

router.delete("/:id", authenticateToken, isInstructor, CourseController.deleteCourse)

router.put(
  "/:id/video",
  authenticateToken,
  isInstructor,
  upload.single("courseVideo"),
  CourseController.updateCourseVideo,
)

export default router

