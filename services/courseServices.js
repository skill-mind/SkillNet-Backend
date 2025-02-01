import AppDataSource from "../config/config.js"
import { Course } from "../entities/course.entity.js"

const courseRepository = AppDataSource.getRepository(Course)

class CourseError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.name = "CourseError"
    this.statusCode = statusCode
  }
}

export const CourseService = {
  async createCourse(courseData) {
    try {
      // Check if a course with the same title already exists
      const existingCourse = await courseRepository.findOne({ where: { title: courseData.title } })
      if (existingCourse) {
        throw new CourseError("A course with this title already exists", 409) // 409 Conflict
      }

      const course = courseRepository.create(courseData)
      return await courseRepository.save(course)
    } catch (error) {
      if (error instanceof CourseError) {
        throw error
      }
      throw new CourseError("Failed to create course", 400)
    }
  },

  async getAllCourses() {
    try {
      return await courseRepository.find()
    } catch (error) {
      throw new CourseError("Failed to fetch courses")
    }
  },

  async getCourseById(id) {
    try {
      const course = await courseRepository.findOneBy({ id })
      if (!course) {
        throw new CourseError("Course not found", 404)
      }
      return course
    } catch (error) {
      if (error instanceof CourseError) {
        throw error
      }
      throw new CourseError("Failed to fetch course")
    }
  },

  async updateCourse(id, courseData) {
    try {
      // Check if the updated title already exists for another course
      if (courseData.title) {
        const existingCourse = await courseRepository.findOne({
          where: { title: courseData.title, id: { $ne: id } },
        })
        if (existingCourse) {
          throw new CourseError("A course with this title already exists", 409)
        }
      }

      const updateResult = await courseRepository.update(id, courseData)
      if (updateResult.affected === 0) {
        throw new CourseError("Course not found", 404)
      }
      const updatedCourse = await courseRepository.findOneBy({ id })
      if (!updatedCourse) {
        throw new CourseError("Failed to fetch updated course")
      }
      return updatedCourse
    } catch (error) {
      if (error instanceof CourseError) {
        throw error
      }
      throw new CourseError("Failed to update course")
    }
  },

  async deleteCourse(id) {
    try {
      const deleteResult = await courseRepository.delete(id)
      if (deleteResult.affected === 0) {
        throw new CourseError("Course not found", 404)
      }
    } catch (error) {
      if (error instanceof CourseError) {
        throw error
      }
      throw new CourseError("Failed to delete course")
    }
  },

  async updateCourseVideo(id, videoUrl) {
    try {
      const updateResult = await courseRepository.update(id, { videoUrl })
      if (updateResult.affected === 0) {
        throw new CourseError("Course not found", 404)
      }
      const updatedCourse = await courseRepository.findOneBy({ id })
      if (!updatedCourse) {
        throw new CourseError("Failed to fetch updated course")
      }
      return updatedCourse
    } catch (error) {
      if (error instanceof CourseError) {
        throw error
      }
      throw new CourseError("Failed to update course video")
    }
  },
}

// export default CourseService

