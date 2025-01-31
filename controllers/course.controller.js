import { CourseService } from "../services/courseServices.js"
import courseValidation from "../validation/course.validation.js"

class CourseController {
  async createCourse(req, res) {
    try {
      const { error, value } = courseValidation.createCourse.validate(req.body)
      if (error) {
        return res.status(400).json({ message: error.details[0].message })
      }

      const course = await CourseService.createCourse(value)
      res.status(201).json(course)
    } catch (error) {
      if (error.message === "Course already exists") {
        res.status(409).json({ message: error.message })
      } else {
        res.status(400).json({ message: "Error creating course", error: error.message })
      }
    }
  }

  async getAllCourses(req, res) {
    try {
      const courses = await CourseService.getAllCourses()
      res.json(courses)
    } catch (error) {
      res.status(500).json({ message: "Error fetching courses", error: error.message })
    }
  }

  async getCourseById(req, res) {
    try {
      const { error, value } = courseValidation.courseIdParam.validate({ id: req.params.id })
      if (error) {
        return res.status(400).json({ message: error.details[0].message })
      }

      const course = await CourseService.getCourseById(value.id)
      if (course) {
        res.json(course)
      } else {
        res.status(404).json({ message: "Course not found" })
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching course", error: error.message })
    }
  }

  async updateCourse(req, res) {
    try {
      const idValidation = courseValidation.courseIdParam.validate({ id: req.params.id })
      if (idValidation.error) {
        return res.status(400).json({ message: idValidation.error.details[0].message })
      }

      const { error, value } = courseValidation.updateCourse.validate(req.body)
      if (error) {
        return res.status(400).json({ message: error.details[0].message })
      }

      const course = await CourseService.updateCourse(idValidation.value.id, value)
      if (course) {
        res.json(course)
      } else {
        res.status(404).json({ message: "Course not found" })
      }
    } catch (error) {
      if (error.message === "Course already exists") {
        res.status(409).json({ message: error.message })
      } else {
        res.status(400).json({ message: "Error updating course", error: error.message })
      }
    }
  }

  async deleteCourse(req, res) {
    try {
      const { error, value } = courseValidation.courseIdParam.validate({ id: req.params.id })
      if (error) {
        return res.status(400).json({ message: error.details[0].message })
      }

      await CourseService.deleteCourse(value.id)
      res.status(204).send()
    } catch (error) {
      if (error.message === "Course not found") {
        res.status(404).json({ message: error.message })
      } else {
        res.status(500).json({ message: "Error deleting course", error: error.message })
      }
    }
  }

  async updateCourseVideo(req, res) {
    try {
      const { error: idError, value: idValue } = courseValidation.courseIdParam.validate({ id: req.params.id })
      if (idError) {
        return res.status(400).json({ message: idError.details[0].message })
      }

      if (!req.file) {
        return res.status(400).json({ message: "No video file uploaded" })
      }

      const videoUrl = `/uploads/courses/videos/${req.file.filename}`

      const { error, value } = courseValidation.updateCourseVideo.validate({ videoUrl })
      if (error) {
        return res.status(400).json({ message: error.details[0].message })
      }

      const updatedCourse = await CourseService.updateCourseVideo(idValue.id, value.videoUrl)
      if (updatedCourse) {
        res.json(updatedCourse)
      } else {
        res.status(404).json({ message: "Course not found" })
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating course video", error: error.message })
    }
  }
}

export default new CourseController()

