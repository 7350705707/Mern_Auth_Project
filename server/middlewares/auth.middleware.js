import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        if (!id) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const user = await userModel.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.userId = user._id;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}