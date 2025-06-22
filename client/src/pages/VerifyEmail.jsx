import React, { useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState("");


  const { backendUrl, userData, setUserData, isLoggedIn, setIsLoggedIn } = useAppContext();
  const VerifyOtpMutation = useMutation({
    mutationFn: async (otp) => {
      const response = await axios.post(`${backendUrl}/api/auth/verify-email`, { otp }, { withCredentials: true });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Email verified successfully!");
      setUserData(data.user);
      setIsLoggedIn(true);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data.message || "Failed to verify email. Please try again.");
      console.error("Error verifying email:", error);
    },
  });

  const VerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      console.log("Verifying OTP:", otp);
      VerifyOtpMutation.mutate(otp);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    }

  }


  useEffect(() => {
    // Check if user is already logged in and verified
    if (!(isLoggedIn && userData && !userData?.isVerified)) {
      console.log("User not logged in or not verified, redirecting to login");
      navigate("/");
    }
  }, [isLoggedIn, userData, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
     <img onClick={() => navigate("/")}
             className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
             src={assets.logo}
             alt="Login"
           />

    <form className='bg-slate-900 p-8 rounded-lg ' action="">
      <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify Otp</h1>
      <p className='text-white text-sm mb-6'>Please enter your OTP to verify your email.</p>
      <div className='flex flex-col items-center gap-4'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
        {Array(6).fill("").map((_, index) => (
          <input
            key={index}
            type="number"
            maxLength={1}
            placeholder='-'
            className="p-2 rounded bg-white text-center text-black w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={otp[index] || ""}
            onChange={(e) => {
              const newOtp = otp.split("");
              newOtp[index] = e.target.value; // Only keep the last digit
              setOtp(newOtp.join(""));
              
              // Focus next input if a digit was entered
              if (e.target.value && index < 5) {
                const nextInput = e.target.parentElement.children[index + 1];
                nextInput.focus();
              }
            }}
            onKeyDown={(e) => {
              // Focus previous input if backspace is pressed and current input is empty
              if (e.key === "Backspace" && !otp[index] && index > 0) {
                const prevInput = e.target.parentElement.children[index - 1];
                prevInput.focus();
              }
            }}
            ref={(input) => {
              // Auto focus the first empty input on load
              if (input && index === otp.length && index < 6) {
                input.focus();
              }
            }}
          />
        ))}
      </div>
      <button onClick={VerifyOtp} type="submit" className="bg-blue-500 text-nowrap text-white px-4 py-2 rounded w-2/5">Verify OTP</button>
      </div>
    </form>
    </div>
  )
}

export default VerifyEmail