import React from 'react'
import { assets } from '../assets/assets.js'
import { useAppContext } from '../context/AppContext.jsx'

const Header = () => {

  const {userData} = useAppContext();

  return (
    <div className='p-6 pt-20 flex flex-col items-center justify-center h-screen'>
        <img src={assets.header_img} alt="Header" className='w-36 h-36 rounded-full mb-6' />
        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name : "Developer"}! <img className='w-8 aspect-square' src={assets.hand_wave} alt="" /></h1>
        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our App</h2>
        <p className='text-sm sm:text-base mb-8 max-w-md'>Let's start with the quick product tour and we will have you up and running in no time!</p>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:scale-105'>Get Started</button>
    </div>
  )
}

export default Header