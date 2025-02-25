import AppDataSource from "../config/config";
import { Payment } from "../entities/payment.entity";
import { AppError } from "../utils/errors";

export class PaymentService {
    constructor() {
        this.repository = AppDataSource.getRepository(Payment);
    }

    async createPayment(paymentData) {
        const existingPayment = await this.repository.findOne({
            where: {
                payment_code: paymentData.payment_code
            }
        });
        if (existingPayment) {
            throw new Error("Duplicate Payment Code");
        }
        const payment = this.repository.create(paymentData);

        return this.repository.save(payment);
    }

    async getAllPayments() {
        return this.repository.find();
    }

    async getPaymentByid(id) {
        const payment = await this.repository.findOne({ where: { id } });
        if (!payment) {
            throw new AppError(`Payment with ID ${id} not found.`, 404);
        }

        return payment;
    }

    async updatePayment(id, updateData) {
        const payment = await this.getPaymentByid(id);
        Object.assign(payment, updateData);

        return this.repository.save(payment);
    }

    async deletePayment(id) {
        const payment = await this.getPaymentByid(id);

        return this.repository.delete(id);
    }
}