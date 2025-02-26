import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
    walletAddress: user.walletAddress,
  };

  const options = {
    expiresIn: process.env.JWT_ACCESS_TOKEN_TTL || '1h',
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};
