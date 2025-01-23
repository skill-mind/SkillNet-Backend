import AppDataSource from '../config/config.js';
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

class AuthService {
  constructor() {
    this.userRepository = AppDataSource.getRepository('User');
  }

  async checkExistingUser(walletAddress, username, email) {
    const existingUser = await this.userRepository.findOne({
      where: [
        { walletAddress },
        { username },
        { email }
      ]
    });

    if (existingUser) {
      const conflicts = [];
      if (existingUser.walletAddress === walletAddress) conflicts.push('wallet');
      if (existingUser.username === username) conflicts.push('username');
      if (existingUser.email === email) conflicts.push('email');
      return conflicts;
    }
    return null;
  }

  async createUser(userData) {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user;
  }

  generateToken(user) {
    return sign(
      { userId: user.id, walletAddress: user.walletAddress },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  async register(userData) {
    const conflicts = await this.checkExistingUser(
      userData.walletAddress,
      userData.username,
      userData.email
    );

    if (conflicts) {
      throw new Error(`Registration conflict: ${conflicts.join(', ')} already exists`);
    }

    const user = await this.createUser(userData);
    const token = this.generateToken(user);
    
    return {
      user: this.sanitizeUser(user),
      token
    };
  }

  async login(walletAddress) {
    const user = await this.userRepository.findOne({ where: { walletAddress } });
    
    if (!user) {
      throw new Error('User not found');
    }

    const token = this.generateToken(user);
    return {
      user: this.sanitizeUser(user),
      token
    };
  }

  sanitizeUser(user) {
    return {
      id: user.id,
      role: user.role,
      username: user.username,
      walletAddress: user.walletAddress,
      email: user.email,
      createdAt: user.createdAt
    };
  }
}

export default AuthService;