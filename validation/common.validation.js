import Joi from "joi";

export const idParamValidation = (data) => {
    const schema = Joi.object({
        id: Joi.number().integer().required().min(1).messages({
          'number.base': 'ID must be a number.',
          'number.integer': 'ID must be an integer.',
          'number.min': 'ID must be a positive number.',
          'any.required': 'ID is required.'
        })
    });

    const { error, value } = schema.validate(data)
    if (error) {
        throw new Error(error.details[0].message);
    }

    return value.id;
}