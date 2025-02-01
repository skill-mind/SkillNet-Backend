import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
  // For now, we'll set a mock user object for all requests
  req.user = {
    id: 1,
    username: "mockuser",
    role: "instructor",
  }
  next()
}

const isInstructor = (req, res, next) => {
  // For now, we'll assume all users are instructors
  next()
}

export { authenticateToken, isInstructor }

