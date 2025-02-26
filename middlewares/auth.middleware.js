// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import AppDataSource from "../config/config.js";
import User from "../entities/user.entity.js";

export const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    // Verify that the user exists in the database
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: req.user.id } });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

export const isInstructor = async (req, res, next) => {
  if (!req.user || req.user.role !== "instructor") {
    return res
      .status(403)
      .json({ message: "Access Denied: Instructors Only" });
  }
  next();
};

export const isInstructorOrAdmin = async (req, res, next) => {
  if (
    !req.user ||
    (req.user.role !== "instructor" && req.user.role !== "admin")
  ) {
    return res
      .status(403)
      .json({ message: "Access Denied: Instructors or Admins Only" });
  }
  next();
};

export const isStudent = async (req, res, next) => {
  if (!req.user || req.user.role !== "student") {
    return res
      .status(403)
      .json({ message: "Access Denied: Students Only" });
  }
  next();
};

export const isAuthenticatedUser = async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Access Denied: User Not Authenticated" });
  }
  next();
};
