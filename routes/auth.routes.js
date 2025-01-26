import express from 'express';
import AuthController from '../controllers/auth.controller.js';

// Create router instance
const router = express.Router();
const authController = new AuthController();

// Define routes
router.get('/check/:walletAddress', (req, res) => authController.checkWallet(req, res));
router.post('/signup', (req, res) => authController.signup(req, res));
router.post('/signin', (req, res) => authController.signin(req, res));

// Export the router instance directly
export default router;