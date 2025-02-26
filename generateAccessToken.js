import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import AppDataSource from "./config/config.js";
import User from "./entities/user.entity.js";

dotenv.config({ path: "./.env.example" });

const generateAccessTokenForUser = async (walletAddress) => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { walletAddress } });
  
  if (!user) {
    throw new Error(`User with wallet address "${walletAddress}" not found`);
  }
  
  const payload = {
    id: user.id,
    role: user.role,
    walletAddress: user.walletAddress,
  };
  
  const options = {
    expiresIn: process.env.JWT_ACCESS_TOKEN_TTL || "1h",
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

(async () => {
  try {
    const walletAddress = process.argv[2] || "0x12345abcdef";
    const token = await generateAccessTokenForUser(walletAddress);
    console.log("Your JWT Access Token:", token);
    process.exit(0);
  } catch (error) {
    console.error("Error generating token:", error.message);
    process.exit(1);
  }
})();
