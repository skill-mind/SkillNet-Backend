import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import PaymentController from "../controllers/payment.controller.js";

const router = express.Router();

router.post(
    "/",
    authenticateToken,
    PaymentController.createPayment
);

router.get(
    "/sender/:id",
    authenticateToken,
    PaymentController.getSenderPayments
);

router.get(
    "/receiver/:id",
    authenticateToken,
    PaymentController.getReceiverPayments
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

router.put(
    "/:id",
    authenticateToken,
    PaymentController.updatePayment
);

router.delete(
    "/:id",
    authenticateToken,
    PaymentController.deletePayment
);

export default router;