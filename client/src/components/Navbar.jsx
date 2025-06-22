import React from 'react'
import {assets} from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'


const Navbar = () => {

  const navigate = useNavigate();

  const { isLoggedIn,setIsLoggedIn, setUserData, userData, backendUrl } = useAppContext();
  const [isLogOutPending, setIsLogOutPending] = React.useState(false);

  const handleLogin = () => {
    navigate('/login');
  }


  const sendOtpMutation = useMutation({
      mutationFn: async () => {
        const response = await axios.post(`${backendUrl}/api/auth/send-verification-otp`, {}, { withCredentials: true });
        return response.data;
      },
      onSuccess: (data) => {
        toast.success("Verification OTP sent successfully!");
        navigate('/verify-email');
      },
      onError: (error) => {
        toast.error(error.response?.data.message || "Failed to send verification OTP. Please try again.");
        console.error("Error sending verification OTP:", error);
      },
      
    });


  const sendVerificationOtp = async () => {
    try {

      sendOtpMutation.mutate();
     
    } catch (error) {
      console.error("Error sending verification OTP:", error);
      toast.error("Failed to send verification OTP.");
    }
  }

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      return res;
    },
    onSuccess: (data) => {
      toast.success("Logged out successfully!");
      setIsLoggedIn(false);
      setUserData(null);
      navigate('/');
    },
    onError: (error) => {
      toast.error("Failed to log out. Please try again.");
      console.error("Error logging out:", error);
    },
    onMutate: () => {
      setIsLogOutPending(true);
    },
    onSettled: () => {
      setIsLogOutPending(false);
    }

  });

  const handleLogout = async () => {
    logoutMutation.mutate();
  };

  return (
    <div className='flex w-full justify-between items-center bg-white p-4 shadow-md absolute top-0 md:px-20'>
        <img src={assets.logo} alt="Logo" className='w-28 sm:w-32' />
        {userData && isLoggedIn ? (
          <div className='w-8 ml-10 h-8 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 relative group' >
           {userData.name[0].toUpperCase()}
           <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
            <p className='text-sm text-center font-semibold px-2 py-1 bg-gray-100 shadow-md rounded'>{userData.name}!</p>
            
           <ul className='list-none m-0 p-2 bg-gray-100 shadow-lg rounded'>
            {
                !userData?.isVerified && (
                  sendOtpMutation.isPending ? (
                    <li className='py-1 mb-1 px-2 bg-gray-200 cursor-not-allowed rounded-2xl'>Sending...</li>
                  ) : (
                    <li onClick={sendVerificationOtp} className='py-1 mb-1 px-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-2xl'>Verify Email</li>
                  )
              )
            }
            <li onClick={handleLogout} className='py-1 mb-1 px-2 bg-gray-200 hover:bg-gray-300 cursor-pointer pr-20 rounded-2xl'>{isLogOutPending ? "Logging out..." : "Logout"}</li>
           </ul>
           </div>
          </div>
        ) : (
          <button onClick={handleLogin} className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:scale-105 flex items-center'>Login <img className='pl-2' src={assets.arrow_icon} alt="" /></button>
        )}
    </div>
  )
}

export default Navbar