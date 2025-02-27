import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  // In production, decode the JWT token here and set req.user accordingly.
  // For example:
  // const token = req.headers.authorization?.split(" ")[1];
  // jwt.verify(token, process.env.JWT_SECRET, (err, user) => { ... });
  // For now, we use a mock user:
  req.user = {
    id: 1,
    username: "adminUser",
    role: "admin", // change as needed for testing different roles
  };
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ error: "Forbidden: Admins only" });
  }
};

const isStudent = (req, res, next) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    return res.status(403).json({ error: "Forbidden: Students only" });
  }
};

export { authenticateToken, isAdmin, isStudent };
