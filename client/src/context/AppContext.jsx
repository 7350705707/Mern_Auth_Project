

import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const AppContext = createContext();

export const AppProvider = ({ children }) => {



    const navigate = useNavigate();
    const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);

     const getUserData = async() => {
      try {
        // Make a request to the backend to get user data
        const response = await axios.get(`${backendUrl}/api/user/get-user-data`, {
          withCredentials: true
        });
        
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUserData(response.data.user);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    useEffect(() => {

        // Check if user is logged in by checking localStorage or cookies
       const response = getUserData();
      //  console.log(response);
      // 
    }, []);

 


  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
