import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";


// Function to register a new user
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = new userModel({
            username:name,
            email,
            password,
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // sending welcome email (optional)
        const mainOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Our Service Auth Project",
            text: `Hello ${name},\n\nThank you for registering with us! We're excited to have you on board.\n\nBest regards,\nThe Team`,
        };

        await transporter.sendMail(mainOptions);

        res.status(201).json({ message: "User registered successfully", user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Function to log in the user
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({ message: "User logged in successfully", user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Function to log out the user
export const logout = (req, res) => {

    try {
        // Check if the user is authenticated
        if (!req.cookies.token) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        // Clear the cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
        });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

// Function to send verification OTP
export const sendVerifyOtp = async (req, res) => {

    try {
        // Check if the user is authenticated
        if (!req.userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }


         const user = await userModel.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if( user.isVerified) {
        return res.status(400).json({ message: "User already verified" });
    }
     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    user.verifyOtp = otp;
    user.verifyOtpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();
    // Send OTP via email

    console.log("Sending OTP to:", user.email);

    const mainOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Verify Your Email",
        text: `Your verification code is ${otp}. It is valid for 10 minutes.`,
    };

    const emailSent = await transporter.sendMail(mainOptions);
    if (!emailSent) {
        return res.status(500).json({ message: "Failed to send verification OTP" });
    }

    return res.status(200).json({ message: "Verification OTP sent to your email" });

    } catch (error) {
        console.error("Error sending verification OTP:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


// Function to verify email using OTP
export const verifyEmail = async (req, res) => {
    const {otp} = req.body;
    const user = await userModel.findById(req.userId);
    if (!user){
        return res.status(404).json({message:"User not found!"});
    }

    if(user.isVerified){
        return res.status(400).json({message: "User already verified!"});
    }
    if(!otp || otp !== user.verifyOtp || Date.now() > user.verifyOtpExpires) {
        return res.status(400).json({message:"Invalid or expired OTP!"});
    }

    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpires = 0;
    await user.save();

    res.status(200).json({message:"Email verified successfully!"});
}

// Function to check if the user is authenticated
export const isAuthenticated = async (req,res) => {
    try {
        // Check if the user is authenticated
        if (!req.userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Find the user by ID
        const user = await userModel.findById(req.userId);
        if (!user.isVerified) {
            return res.status(404).json({ message: "User not found or not verified" });
        }

        res.status(200).json({ message: "User is authenticated", user: { id: user._id, name: user.name, email: user.email, isVerified: user.isVerified } });
    } catch (error) {
        console.error("Authentication check error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Function to send reset OTP
export const sendResetOtp = async (req,res) => {
        try{
        // Check if the user is authenticated
        const {email} = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: "User email is not verified" });
        }
        

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
        user.resetOtp = otp;
        user.resetOtpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        // Send OTP via email

        const mainOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Reset Your Password",
            text: `Your password reset code is ${otp}. It is valid for 10 minutes.`,
        };

        const emailSent = await transporter.sendMail(mainOptions);
        if (!emailSent) {
            return res.status(500).json({ message: "Failed to send reset OTP" });
        }

        return res.status(200).json({ message: "Reset OTP sent to your email" });

    } catch (error) {
        console.error("Error sending reset OTP:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


// Function to reset password using OTP
export const verifyResetOtp = async (req, res) => {
    const {email, otp, newPassword} = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (otp !== user.resetOtp || Date.now() > user.resetOtpExpires) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.password = newPassword;
        user.resetOtp = "";
        user.resetOtpExpires = 0;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}