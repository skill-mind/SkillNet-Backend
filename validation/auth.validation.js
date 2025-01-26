import Joi from 'joi';

// StarkNet addresses (63-65 hex chars including 0x prefix)
const STARKNET_ADDRESS_REGEX = /^0x[a-fA-F0-9]{63,65}$/;

export const validateRegistration = (data) => {
  const schema = Joi.object({
    role: Joi.string()
      .valid('job_seeker', 'employer', 'tutor', 'institution')
      .required()
      .messages({
        'any.only': 'Invalid role. Valid roles: job_seeker, employer, tutor, institution',
        'any.required': 'Role is required'
      }),
    
    walletAddress: Joi.string()
      .pattern(STARKNET_ADDRESS_REGEX)
      .required()
      .messages({
        'string.pattern.base': 'Invalid StarkNet wallet address format',
        'any.required': 'Wallet address is required'
      }),
    
    name: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must be at most 100 characters',
        'any.required': 'Name is required'
      }),
    
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required'
      }),
    
    // Conditional fields
    title: Joi.when('role', {
      is: 'tutor',
      then: Joi.string().max(100).required().messages({
        'any.required': 'Title is required for tutors',
        'string.max': 'Title must be at most 100 characters'
      }),
      otherwise: Joi.forbidden().messages({
        'any.unknown': 'Title is only allowed for tutor role'
      })
    }),
    
    bio: Joi.string()  // bio/description
      .max(500)
      .required()
      .messages({
        'any.required': 'Bio/description is required',
        'string.max': 'Bio/description must be at most 500 characters'
      }),
    
    skills: Joi.when('role', {
      is: 'tutor',
      then: Joi.array()
        .items(Joi.string().max(50))
        .min(5)
        .max(15)
        .required()
        .messages({
          'any.required': 'Skills are required for tutors',
          'array.min': 'At least 5 skills are required for tutors',
          'array.max': 'Maximum 15 skills allowed',
          'string.max': 'Each skill must be at most 50 characters'
        }),
      otherwise: Joi.forbidden().messages({
        'any.unknown': 'Skills are only allowed for tutor role'
      })
    })
  });

  return schema.validate(data, { abortEarly: false });
};

export default validateRegistration;