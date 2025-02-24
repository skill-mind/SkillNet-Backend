import express from "express";
import NotificationController from "../controllers/notification.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js"

const router = express.Router();
router.use(authenticateToken);

router.post("/", (req, res) => NotificationController.create(req, res));
router.get("/", (req, res) => NotificationController.findAll(req, res));
router.get("/:id", (req, res) => NotificationController.findById(req, res));
router.get("/sender/:senderId", (req, res) => NotificationController.findBySender(req, res));
router.get("/receiver/:receiverId", (req, res) => NotificationController.findByReceiver(req, res));
router.get("/type/:type", (req, res) => NotificationController.findByType(req, res));
router.put("/:id", (req, res) => NotificationController.update(req, res));
router.delete("/:id", (req, res) => NotificationController.delete(req, res));

export default router;
