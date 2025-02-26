import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import PaymentController from "../controllers/payment.controller.js";

const router = express.Router();

router.post(
    "/",
    authenticateToken,
    (req, res) => PaymentController.createPayment(req, res)
);

router.get(
    "/sender/:id",
    authenticateToken,
    (req, res) => PaymentController.getSenderPayments(req, res)
);

router.get(
    "/receiver/:id",
    authenticateToken,
    (req, res) => PaymentController.getReceiverPayments(req, res)
);

router.get(
    "/",
    authenticateToken,
    (req, res) => PaymentController.getAllPayments(req, res)
);

router.get(
    "/:id",
    authenticateToken,
    (req, res) => PaymentController.getPaymentById(req, res)
);

router.put(
    "/:id",
    authenticateToken,
    (req, res) => PaymentController.updatePayment(req, res)
);

router.delete(
    "/:id",
    authenticateToken,
    (req, res) => PaymentController.deletePayment(req, res)
);

export default router;