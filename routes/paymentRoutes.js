import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import PaymentController from "../controllers/payment.controller";

const router = express.Router();

router.post(
    "/",
    authenticateToken,
    PaymentController.createPayment
);

router.get(
    "/",
    authenticateToken,
    PaymentController.getAllPayments
);

router.get(
    "/:id",
    authenticateToken,
    PaymentController.getPaymentById
);