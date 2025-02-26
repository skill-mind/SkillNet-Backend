import AuthService from '../services/auth.service.js';
import validateRegistration from '../validation/auth.validation.js'; // Assuming you have this validation

class AuthController {
  constructor() {
    this.authService = AuthService;
  }

  async checkWallet(req, res) {
    try {
      const { walletAddress } = req.params;
      const exists = await this.authService.walletExists(walletAddress);
      res.json({ exists });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async signup(req, res) {
    try {
      const { error } = validateRegistration(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const { user, token } = await this.authService.register(req.body);
      res.status(201).json({
        success: true,
        user: {
          id: user.id,
          role: user.role,
          walletAddress: user.walletAddress
        },
        token
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async signin(req, res) {
    try {
      const { walletAddress } = req.body;
      if (!walletAddress) return res.status(400).json({ error: 'Wallet address required' });
      
      const { user, token } = await this.authService.login(walletAddress);
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
      res.status(500).json({ success: false, error: error.message });
    }
  }

  handleError(res, error) {
    console.error('Auth Error:', error);
    const statusCode = error.message.includes('not found') ? 404 : 
                      error.message.includes('conflict') ? 409 : 400;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
}

export default AuthController;
