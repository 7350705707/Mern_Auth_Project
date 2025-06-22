import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext.jsx";
import { useMutation } from "@tanstack/react-query";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [reEnterPassword, setReEnterPassword] = React.useState("");
  const [otpSending, setOtpSending] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = React.useState(false);
  const [newPassSending, setNewPassSending] = React.useState(false);
  const [otpStatus, setOtpStatus] = React.useState(false);
  const { backendUrl } = useAppContext();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    resetPasswordMutation.mutate();
  };
  const resetPasswordMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        { email }
      );
      return response;
    },
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(
          "Reset password OTP sent successfully! Please check your email."
        );
        setOtpStatus(true);
      }
    },
    onError: (error) => {
      console.error("Error sending reset password OTP:", error);
      toast.error(
        error.response?.data.message || "Failed to send reset password OTP."
      );
    },
    onSettled: () => {
      setOtpSending(false);
    },
    onMutate: () => {
      setOtpSending(true);
    },
  });

  const VerifyOtpMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${backendUrl}/api/auth/verify-reset-otp`,
        { email, otp, newPassword }
      );
      return response;
    },
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(
          "Reset password OTP verified successfully! Your password has been reset."
        );
        navigate("/login");
      }
    },
    onMutate: () => {
      setNewPassSending(true);
    },
    onSettled: () => {
      setNewPassSending(false);
    },
    onError: (error) => {
      console.error("Error sending reset password OTP:", error);
      toast.error(
        error.response?.data.message || "Failed to send reset password OTP."
      );
    },
  });

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP sent to your email.");
      return;
    }
    if (!newPassword || !reEnterPassword) {
      toast.error(error.response?.data.message || "Failed to verify OTP.");
    }

    if (newPassword !== reEnterPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    VerifyOtpMutation.mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        src={assets.logo}
        alt="Login"
      />

      <form className="bg-slate-900 p-8 rounded-lg w-[90%] sm:w-[70%] lg:w-[50%] xl:w-[30%]" action="">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Reset/Forget Password!
        </h1>
        <p className="text-white text-sm mb-6">
          Please enter your email to receive a password reset OTP.
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]">
            <img src={assets.mail_icon} alt="Email" />
            <input
              className="bg-transparent outline-none text-white"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
          </div>
          {otpSending ? (
            <button
              disabled
              className="bg-blue-300 text-nowrap text-black px-4 py-2 rounded"
            >
              Sending OTP... Please wait.
            </button>
          ) : (
            <button
              onClick={handleResetPassword}
              type="submit"
              className="bg-blue-500 text-nowrap cursor-pointer hover:scale-105 text-white px-4 py-2 rounded "
            >
              {otpStatus ? "Resend Reset OTP" : "Send Reset OTP"}
            </button>
          )}


          {otpStatus && (
            <div className="flex flex-col items-center gap-4 mt-6">
              <p className="text-white text-sm mt-4">
                An OTP has been sent to your email. Please check your inbox.
              </p>
              <p className="text-white text-sm mt-2">
                If you don't receive the OTP, please check your spam folder or
                click the button above to resend it.
              </p>
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333a5c] w-[50%]">
                <img src={assets.mail_icon} alt="Email" />
                <input
                  className="bg-transparent outline-none text-white"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
              </div>
              <div className="flex w-[90%] items-center gap-3 px-5 py-2.5 rounded-full bg-[#333a5c]">
                <img src={assets.lock_icon} alt="New Password" />
                <div className="flex items-center justify-between gap-2 w-full">
                  <input
                  className="bg-transparent outline-none text-white"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white"
                >
                  {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                </button>
                </div>
                
              </div>
              <div className="flex items-center gap-3 w-[90%] px-5 py-2.5 rounded-full bg-[#333a5c]">
                <img src={assets.lock_icon} alt="Re-enter New Password" />
                <div className="flex items-center justify-between gap-2 w-full">
                  <input
                    className="bg-transparent outline-none text-white"
                    type={showReEnterPassword ? "text" : "password"}
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                    placeholder="Re-enter New Password"
                    required
                  />
                  <button
                    type="button"
                  onClick={() => setShowReEnterPassword(!showReEnterPassword)}
                  className="text-white"
                >
                  {showReEnterPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                </button>
                </div>
              </div>
              <button
                onClick={handleVerifyOtp}
                className="bg-green-500 text-white px-4 py-2 hover:scale-105 cursor-pointer rounded w-2/5 mt-4"
              >
                {newPassSending ? "Verifying OTP..." : "Verify OTP and Reset Password"}
              </button>

              <button
                onClick={() => navigate("/login")}
                className="bg-red-500 text-white px-4 py-2 hover:scale-105 cursor-pointer rounded w-2/5 mt-4"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
