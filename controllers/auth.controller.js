import AuthService from '../services/auth.service.js';
import validateRegistration from '../validation/auth.validation.js';

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  // Asynchronous function to check if a wallet address exists
  async checkWallet(req, res) {
    try {
      // Extract the `walletAddress` from the request parameters
      const { walletAddress } = req.params;
       // Check if the wallet address exists using the `authService.walletExists` method
      const exists = await this.authService.walletExists(walletAddress);
      res.json({ exists });
    } catch (error) {
      // If an error occurs, handle it using the `handleError` method
      this.handleError(res, error);
    }
  }

  // Asynchronous function to handle user registration (signup)
  async signup(req, res) {
    try {
      // Validate the registration data from the request body
      const { error } = validateRegistration(req.body);
       // If there's a validation error, return a 400 Bad Request response with the error message
      if (error) return res.status(400).json({ error: error.details[0].message });

      const { user, token } = await this.authService.register(req.body);
      // If registration is successful, return a 201 Created response with the user details and token
      res.status(201).json({
        success: true,  // Indicates the registration was successful
        user: {
          id: user.id, // Include the user's ID
          role: user.role, // Include the user's role
          walletAddress: user.walletAddress // Include the user's wallet address
        },
        token
      });
    } catch (error) {
      // handles error during the process
      this.handleError(res, error);
    }
  }

  async signin(req, res) {
    try {
      // Extract the wallet address from the request body and validate it
      const { walletAddress } = req.body;
      if (!walletAddress) return res.status(400).json({ error: 'Wallet address required' });
      
      // Authenticate the user using the wallet address and retrieve the user details and token
      const { user, token } = await this.authService.login(walletAddress);
      // Respond with the authenticated user's details and generated token
      res.json({
        success: true,
        user: {
          id: user.id,
          role: user.role,
          walletAddress: user.walletAddress
        },
        token
      });
    } catch (error) {
      // Handle any errors that occur during the sign-in process
      this.handleError(res, error);
    }
  }

  handleError(res, error) {
    // Log the error details for debugging purposes
    console.error('Auth Error:', error);
    // Determine the appropriate HTTP status code based on the error message
    const statusCode = error.message.includes('not found') ? 404 : 
                      error.message.includes('conflict') ? 409 : 400;
      // Send a JSON response with the error message and appropriate status code
      res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
}

export default AuthController;