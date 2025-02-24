import Joi from 'joi';

export const createPaymentValidation = (data) => {
    const schema = Joi.object({
        senderId: Joi.number()
            .integer().positive().allow(null)
            .messages({
                "number.base": "Sender ID must be a number.",
                "number.integer": "Sender ID must be an integer.",
                "number.positive": "Sender ID must be a positive number."
            }),

        receiverId: Joi.number()
            .integer().positive().allow(null)
            .messages({
                "number.base": "Receiver ID must be a number.",
                "number.integer": "Receiver ID must be an integer.",
                "number.positive": "Receiver ID must be a positive number."
            }),

        date: Joi.date()
            .iso().required()
            .messages({
                "date.base": "Date must be a valid date.",
                "date.format": "Date must be in ISO format.",
                "any.required": "Date is required."
            }),

        amount: Joi.number()
            .precision(5).positive().required()
            .messages({
                "number.base": "Amount must be a number.",
                "number.positive": "Amount must be a positive number.",
                "number.precision": "Amount must have at most 5 decimal places.",
                "any.required": "Amount is required."
            }),

        payment_code: Joi.string()
            .max(50).required()
            .messages({
                "string.base": "Payment code must be a string.",
                "string.max": "Payment code cannot exceed 50 characters.",
                "any.required": "Payment code is required."
            }),

        transaction_type: Joi.string()
            .valid("course_creation", "course_enrollment", "certification_exam")
            .required()
            .messages({
                "any.only": "Transaction type must be one of: course_creation, course_enrollment, certification_exam.",
                "any.required": "Transaction type is required."
            }),
    });

    return schema.validate(data);
}
