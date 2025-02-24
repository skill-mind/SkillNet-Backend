import express from "express";
import NotificationController from "../controllers/notificationController.js";

const router = express.Router();

router.post("/", NotificationController.create);
router.get("/", NotificationController.findAll);
router.get("/:id", NotificationController.findById);
router.get("/sender/:senderId", NotificationController.findBySender);
router.get("/receiver/:receiverId", NotificationController.findByReceiver);
router.get("/type/:type", NotificationController.findByType);
router.put("/:id", NotificationController.update);
router.delete("/:id", NotificationController.delete);

export default router;
