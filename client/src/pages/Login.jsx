import React, { useEffect } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [state, setState] = React.useState("Sign Up");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();

  const {name, email, password} = formData;

  const { backendUrl, userData, setUserData, isLoggedIn,setIsLoggedIn } = useAppContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // API functions
  const createUserAccount = async (userData) => {
    const response = await axios.post(`${backendUrl}/api/auth/register`, userData, { withCredentials: true });
    return response.data;
  };

  const loginUser = async (userData) => {
    const response = await axios.post(`${backendUrl}/api/auth/login`, userData,{withCredentials: true});
    return response.data;
  };

  // Sign up mutation
  const signupMutation = useMutation({
    mutationFn: createUserAccount,
    onSuccess: (data) => {
      toast.success("Account created successfully!"); 
      setUserData(data.user);
      setIsLoggedIn(true);
      navigate("/");
    },
    onError: (error) => {
    
      // Show a toast notification for error
      toast.error(error.response?.data.message || "Failed to create account. Please try again.");
    }
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successful!");
      setUserData(data.user);
      setIsLoggedIn(true);
      navigate("/");
    },
    onError: (error) => {
     
      // Show a toast notification for error
      toast.error(error.response?.data.message || "Failed to log in. Please check your credentials and try again.");
    }
  });

  const handleLogin = (action) => {
    if (action === "Sign Up") {
      if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
      }
      // Call the signup mutation with form data
      signupMutation.mutate({ name, email, password });
    } else {
      if (!email || !password) {
        alert("Please fill in all fields.");
        return;
      }
      // Call the login mutation with email and password
      loginMutation.mutate({ email, password });
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    if (isLoggedIn && userData) {
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
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm text-center">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Log In"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Please fill in the details to create an account."
            : "Please enter your credentials to log in."}
        </p>

        <form action="">
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]">
              <img src={assets.person_icon} alt="Login" />
              <input
                name="name"
                value={name}
              onChange={handleInputChange}
                className="bg-transparent outline-none "
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]">
            <img src={assets.mail_icon} alt="Login" />
            <input
              onChange={handleInputChange}
              name="email"
              value={email}
              className="bg-transparent outline-none "
              type="email"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]">
            <img src={assets.lock_icon} alt="Login" />
            <div className="flex items-center justify-between gap-2 w-full">
              <input
                onChange={handleInputChange}
                name="password"
                value={password}
                className="bg-transparent outline-none "
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
            </div>
           
          </div>
          <div className="mb-4">
            <span className="text-center text-sm underline cursor-pointer" onClick={() => navigate("/reset-password")}>
              Forget Password?
            </span>
            </div>
          <button
            className="w-full bg-gradient-to-br from-indigo-500 to-indigo-900 text-white px-4 py-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 mb-4"
            onClick={(e) => {
              e.preventDefault();
              handleLogin(state);
            }}
            disabled={signupMutation.isPending || loginMutation.isPending}
          >
            {state === "Sign Up" 
              ? (signupMutation.isPending ? "Creating Account..." : "Create Account") 
              : (loginMutation.isPending ? "Logging in..." : "Login")}
          </button>
          <p className="text-center text-sm mb-6">Already have an Account?</p>
          <button
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="w-full bg-gradient-to-br from-purple-500 to-purple-900 text-white px-4 py-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-300"
          >
            {state === "Sign Up"
              ? "Login to Existing Account"
              : "Create New Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
