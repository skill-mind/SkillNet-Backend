import { PaymentService } from "../services/paymentServices.js";
import { AppError } from "../utils/errors.js";
import { idParamValidation } from "../validation/common.validation.js";
import {
    createPaymentValidation, updatePaymentValidation
} from "../validation/payment.validation.js";


class PaymentController {
    constructor() {
        this.paymentService = new PaymentService();
    }

    async createPayment(req, res) {
        try {
            const { error, value } = createPaymentValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const payment = await this.paymentService.createPayment(value);

            res.status(201).json({ data: payment });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getSenderPayments(req, res) {
        try {
            const senderId = idParamValidation(req.params);
            const payments = await this.paymentService.getSenderPayments(senderId);

            res.status(200).json({ data: payments });
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async getReceiverPayments(req, res) {
        try {
            const receiverId = req.params.id;
            const payments = await this.paymentService.getReceiverPayments(receiverId);

            res.status(200).json({ data: payments });
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async getAllPayments(req, res) {
        try {
            const payments = await this.paymentService.getAllPayments();

            res.status(200).json({ data: payments });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getPaymentById(req, res) {
        try {
            const id = req.params.id;
            const payment = await this.paymentService.getPaymentByid(id);

            res.status(200).json({ data: payment });
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async updatePayment(req, res) {
        try {
            const id = idParamValidation(req.params);
            const { error, value } = updatePaymentValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const payment = await this.paymentService.updatePayment(id, value);

            res.status(200).json({ data: payment });
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async deletePayment(req, res) {
        try {
            const id = req.params.id;
            await this.paymentService.deletePayment(id);
            res.status(200).json({ message: "Delete operation was successful"});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new PaymentController();