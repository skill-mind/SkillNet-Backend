import { PaymentService } from "../services/paymentServices";
import { paymentValidation } from "../validation/payment.validation";


class PaymentController {
    constructor() {
        this.paymentService = new PaymentService();
    }

    async createPayment(req, res) {
        try {
            const { error, paymentData } = paymentValidation.createPayment.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const payment = await this.paymentService.createPayment(paymentData);

            res.status(201).json({ data: payment });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new PaymentController();