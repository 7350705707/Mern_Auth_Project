
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,

    },
    verifyOtp:{
        type: String,
        default: "",

    },
    verifyOtpExpires: {
        type: Number,
        default: 0,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetOtp: {
        type: String,
        default: "",
    },
    resetOtpExpires: {
        type: Number,
        default: 0,
    },

});


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
    // Hash the password before saving
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};



const userModel = mongoose.models.user || mongoose.model("User", userSchema);

export default userModel;