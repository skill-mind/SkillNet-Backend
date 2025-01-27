import Joi from 'joi';

class JobValidation {
  constructor() {
    this.schema = Joi.object({
      title: Joi.string().required().min(3).max(100),
      description: Joi.string().optional().max(1000),
      company: Joi.string().required().min(2).max(100),
      location: Joi.string().optional().max(100),
      salary: Joi.number().optional().min(0),
      requiredSkills: Joi.array().items(Joi.string()).optional(),
      applicationLink: Joi.string().uri().optional()
    });
  }

  validate(jobData) {
    return this.schema.validate(jobData);
  }
}

export default new JobValidation();