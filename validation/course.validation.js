import Joi from "joi"

const courseValidation = {
  createCourse: Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10).max(1000),
    instructorId: Joi.number().integer().positive().required(),
    duration: Joi.number().integer().positive().required(),
    level: Joi.string().valid("beginner", "intermediate", "advanced").required(),
    tags: Joi.array().items(Joi.string()).min(1).max(5),
    price: Joi.number().precision(2).min(0),
    isPublished: Joi.boolean().default(false),
    videoUrl: Joi.string().uri().allow(null, ""), // Allow null or empty string for initial creation without video
  }),

  updateCourse: Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10).max(1000),
    duration: Joi.number().integer().positive(),
    level: Joi.string().valid("beginner", "intermediate", "advanced"),
    tags: Joi.array().items(Joi.string()).min(1).max(5),
    price: Joi.number().precision(2).min(0),
    isPublished: Joi.boolean(),
    videoUrl: Joi.string().uri().allow(null, ""),
  }).min(1), // At least one field must be present for update

  updateCourseVideo: Joi.object({
    videoUrl: Joi.string().uri().required(),
  }),

  courseIdParam: Joi.object({
    id: Joi.number().integer().positive().required(),
  }),
}

export default courseValidation

