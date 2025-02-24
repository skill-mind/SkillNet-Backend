import AppDataSource from "../config/config";
import { Payment } from "../entities/payment.entity";

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
}