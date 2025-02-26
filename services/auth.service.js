// import AppDataSource from '../config/config.js';
// import jwt from 'jsonwebtoken';
// import UserEntity from '../entities/user.entity.js'; // Ensure you import UserEntity

// const { sign, verify } = jwt;

// class AuthService {
//   constructor() {
//     this.userRepository = AppDataSource.getRepository('User');
//   }

//   async walletExists(walletAddress) {
//     const user = await this.userRepository.findOne({
//       where: { walletAddress },
//       select: ['id']
//     });
//     return !!user;
//   }

//   async checkExistingUser(walletAddress, email) {
//     const existingUser = await this.userRepository.findOne({
//       where: [
//         { walletAddress },
//         { email }
//       ]
//     });

//     if (existingUser) {
//       const conflicts = [];
//       if (existingUser.walletAddress === walletAddress) conflicts.push('wallet');
//       if (existingUser.email === email) conflicts.push('email');
//       return conflicts;
//     }
//     return null;
//   }

//   async createUser(userData) {
//     const user = this.userRepository.create(userData);
//     await this.userRepository.save(user);
//     return user;
//   }

//   generateToken(user) {
//     return sign(
//       { userId: user.id, walletAddress: user.walletAddress },
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' }
//     );
//   }

//   async register(userData) {
//     const conflicts = await this.checkExistingUser(userData.walletAddress, userData.email);
//     if (conflicts) {
//       throw new Error(`Registration conflict: ${conflicts.join(', ')} already exists`);
//     }
//     const user = await this.createUser(userData);
//     const token = this.generateToken(user);
//     return {
//       user: this.sanitizeUser(user),
//       token
//     };
//   }

//   async login(walletAddress) {
//     const user = await this.userRepository.findOne({ where: { walletAddress } });
//     if (!user) {
//       throw new Error("User not found");
//     }
//     const payload = {
//       id: user.id,
//       role: user.role,
//       walletAddress: user.walletAddress
//     };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_ACCESS_TOKEN_TTL || "1h"
//     });
//     return { user, token };
//   }

//   sanitizeUser(user) {
//     return {
//       id: user.id,
//       role: user.role,
//       walletAddress: user.walletAddress,
//       email: user.email,
//       createdAt: user.createdAt
//     };
//   }
// }

// export default new AuthService(); // Export an instance


// services/auth.service.js
import AppDataSource from '../config/config.js';
import jwt from 'jsonwebtoken';
import UserEntity from '../entities/user.entity.js';
import { generateAccessToken } from '../utils/token.util.js';

const { sign, verify } = jwt;

class AuthService {
  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  async walletExists(walletAddress) {
    const user = await this.userRepository.findOne({
      where: { walletAddress },
      select: ['id']
    });
    return !!user;
  }

  async checkExistingUser(walletAddress, email) {
    const existingUser = await this.userRepository.findOne({
      where: [
        { walletAddress },
        { email }
      ]
    });

    if (existingUser) {
      const conflicts = [];
      if (existingUser.walletAddress === walletAddress) conflicts.push('wallet');
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
    const conflicts = await this.checkExistingUser(userData.walletAddress, userData.email);
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
      throw new Error("User not found");
    }
    // Use the centralized token generator
    const token = generateAccessToken(user);
    return { user, token };
  }

  sanitizeUser(user) {
    return {
      id: user.id,
      role: user.role,
      walletAddress: user.walletAddress,
      email: user.email,
      createdAt: user.createdAt
    };
  }
}

export default new AuthService(); // Export an instance
