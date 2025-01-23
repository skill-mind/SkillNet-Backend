import Joi from 'joi';

// StarkNet addresses can be 63-65 hex characters (Argent/Braavos wallets)
const STARKNET_ADDRESS_REGEX = /^0x[a-fA-F0-9]{63,65}$/;

export const validateRegistration = (data) => {
  const schema = Joi.object({
    role: Joi.string().valid('job_seeker', 'employer', 'tutor', 'institution').required(),
    walletAddress: Joi.string().pattern(STARKNET_ADDRESS_REGEX).required(),
    fullName: Joi.string().min(2).max(100).required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    title: Joi.string().max(100).required(),
    experience: Joi.string().max(500).required(),
    skills: Joi.array().items(Joi.string().max(50)).max(15).required()
  });

  return schema.validate(data);
};

export default validateRegistration;