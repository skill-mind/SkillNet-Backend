import AppDataSource from '../config/config.js';
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

class AuthService {
  constructor() {
    this.userRepository = AppDataSource.getRepository('User');
  }

  async walletExists(walletAddress) {
    // Query the database to check if a user with the given wallet address exists
    const user = await this.userRepository.findOne({
      where: { walletAddress },
      select: ['id']
    });
    // Return true if the user exists, otherwise return false
    return !!user;
  }

  async checkExistingUser(walletAddress, email) {
    // Query the database to find a user with the given wallet address or email
    const existingUser = await this.userRepository.findOne({
      where: [
        { walletAddress },
        { email }
      ]
    });

    if (existingUser) {
      const conflicts = [];
      // Check if the wallet address already exists and add it to conflicts
      if (existingUser.walletAddress === walletAddress) conflicts.push('wallet');

      // Check if the email already exists and add it to conflicts
      if (existingUser.email === email) conflicts.push('email');
      
      // Return the list of conflicts if any exist
      return conflicts;
    }
    // Return null if no conflicts are found
    return null;
  }

  async createUser(userData) {
    // Create a new user instance using the provided user data
    const user = this.userRepository.create(userData);

    // Save the newly created user to the database
    await this.userRepository.save(user);
    
    // Return the saved user object
    return user;
  }

  generateToken(user) {
    // Generate a JWT token containing the user's ID and wallet address
    return sign(
      { userId: user.id, walletAddress: user.walletAddress },
      
      // Use the secret key from environment variables to sign the token
      process.env.JWT_SECRET,

      // Set the token expiration time to 24 hours
      { expiresIn: '24h' }
    );
  }

  async register(userData) {
    // Check if a user with the same wallet address or email already exists
    const conflicts = await this.checkExistingUser(
      userData.walletAddress,
      userData.email
    );

    if (conflicts) {
      throw new Error(`Registration conflict: ${conflicts.join(', ')} already exists`);
    }

    const user = await this.createUser(userData);
   // Generate an authentication token for the newly created user
    const token = this.generateToken(user);
    
    // Return the sanitized user object (excluding sensitive fields) along with the generated authentication token.
    return {
      user: this.sanitizeUser(user),
      token
    };
  }

  async login(walletAddress) {
    // Find a user in the database by their wallet address
    const user = await this.userRepository.findOne({ where: { walletAddress } });
    
    // Throw an error if no user is found with the provided wallet address
    if (!user) {
      throw new Error('User not found');
    }
    // Generate a token for the authenticated user
    const token = this.generateToken(user);
    
    // Return the sanitized user data (e.g., excluding sensitive fields) and the generated token
    return {
      user: this.sanitizeUser(user),
      token
    };
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

export default AuthService;