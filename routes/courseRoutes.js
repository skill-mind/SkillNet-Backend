import express from "express"
import multer from "multer"
import courseController from "../controllers/course.controller.js"
import { authenticateToken, isInstructor } from "../middlewares/auth.middleware.js"

const router = express.Router()

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: "./uploads/courses",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop())
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
      cb(null, true)
    } else {
      cb(new Error("Only image and PDF files are allowed!"), false)
    }
  },
})

router.post("/", authenticateToken, isInstructor, upload.single("courseMaterial"), courseController.createCourse)
router.get("/", courseController.getAllCourses)
router.get("/:id", courseController.getCourseById)
router.put("/:id", authenticateToken, isInstructor, upload.single("courseMaterial"), courseController.updateCourse)
router.delete("/:id", authenticateToken, isInstructor, courseController.deleteCourse)

export default router

