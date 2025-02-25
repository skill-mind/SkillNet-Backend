import { PaymentService } from "../services/paymentServices";
import { AppError } from "../utils/errors";
import {
    createPaymentValidation, updatePaymentValidation
} from "../validation/payment.validation";


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
            const id = req.params.id;
            const data = updatePaymentValidation(req.body);
            const payment = await this.paymentService.updatePayment(id, data);

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