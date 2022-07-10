import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
export default function nav() {
  const [hamburger, setHamburger] = useState(false);
  function handleClick() {
    setHamburger(!hamburger);
  }
  return (
    <div className='overflow-x-hidden font-poppins'>
      <div className='bg-[#080512]  w-screen justify-between shadow-xl h-16 flex items-center'>
        <h1 className='ml-4 font-bold text-2xl md:text-3xl text-[#3ca5f6] drop-shadow-md'>
          Crypto Hero.
        </h1>
        <div className='flex items-center'>
          <div className='text-white mr-8 flex items-center'>
            <CgProfile size={30} className='mr-2' />
            Profile
          </div>

          {hamburger ? (
            <AiOutlineClose
              size={30}
              color='#3ca5f6'
              className='mr-6 hover:cursor-pointer'
              onClick={handleClick}
            />
          ) : (
            <FiMenu
              size={30}
              color='#3ca5f6'
              className='mr-6 hover:cursor-pointer'
              onClick={handleClick}
            />
          )}
        </div>
      </div>
      <div
        className={
          hamburger
            ? "fixed top-0 left-0 border-4 ease-in-out duration-300 border-[#ffffff] bg-[#ffffff] w-[60%] h-screen shadow-2xl text-2xl md:text-4xl"
            : "fixed top-0 left-[-100%] border-4 ease-in-out duration-300 border-[#ffffff] bg-[#ffffff] w-[60%] h-screen shadow-2xl text-2xl md:text-4xl"
        }
      >
        <h1 className='hover:cursor-pointer hover:text-[#3ca5f6] duration-150  mb-7 mt-7 font-bold border-b-4 '>
          Home
        </h1>
        <h1 className='hover:cursor-pointer hover:text-[#3ca5f6] duration-150  mb-7 font-bold border-b-4 '>
          Crypto
        </h1>
        <h1 className='hover:cursor-pointer hover:text-[#3ca5f6] duration-150  mb-7 font-bold border-b-4 '>
          Contact
        </h1>
        <h1 className='hover:cursor-pointer hover:text-[#3ca5f6] duration-150  mb-7 font-bold border-b-4 '>
          Login
        </h1>
      </div>
    </div>
  );
}