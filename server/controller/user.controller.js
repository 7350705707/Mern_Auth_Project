import userModel from "../models/user.model.js";



export const getUserData = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("-password -verifyOtp -verifyOtpExpires -resetOtp -resetOtpExpires"); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user: { id: user._id, name: user.username, email: user.email, isVerified: user.isVerified } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};