import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

// Import the auth controller
import { login, register, logout,sendVerifyOtp,verifyEmail,sendResetOtp,verifyResetOtp, isAuthenticated } from '../controller/auth.controller.js';

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', authMiddleware, logout);
authRouter.post("/is-logged-in", authMiddleware, isAuthenticated);
authRouter.post("/send-verification-otp", authMiddleware, sendVerifyOtp);
authRouter.post("/verify-email", authMiddleware, verifyEmail);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/verify-reset-otp", verifyResetOtp);


export default authRouter;