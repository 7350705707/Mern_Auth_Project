import express from "express";


const userRouter = express.Router();

// Import the user controller
import { getUserData } from "../controller/user.controller.js";
// Import the authentication middleware
import { authMiddleware } from "../middlewares/auth.middleware.js";
// Apply the authentication middleware to protect routes
userRouter.use(authMiddleware);

// Middleware to protect routes
userRouter.get("/get-user-data", getUserData);




// Export the user router
export default userRouter;