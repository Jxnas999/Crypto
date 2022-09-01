import React, { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { UserContext } from "../../lib/UserContext";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
export default function nav() {
  const [hamburger, setHamburger] = useState(false);
  const { user, setUser } = useContext(UserContext);

  async function Signout() {
    await signOut(auth);

    setUser("Profile");
  }
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
          <div className='items-center hidden mr-8 text-white sm:flex'>
            <CgProfile size={30} className='mr-2' />
            {user.email ? user.email : "Profile"}
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
        <Link href='/'>
          <h1 className='hover:cursor-pointer  uppercase hover:text-[#3ca5f6] duration-150  mb-7 mt-7 font-bold border-b-4 '>
            Home
          </h1>
        </Link>

        <Link href='/Components/UserWatchlist'>
          <h1 className='uppercase hover:cursor-pointer hover:text-[#3ca5f6] duration-150  mb-7 font-bold border-b-4 '>
            Watchlist
          </h1>
        </Link>
        <Link href='/Components/Login'>
          <h1 className='uppercase hover:cursor-pointer hover:text-[#3ca5f6] duration-150  mb-7 font-bold border-b-4 '>
            Login
          </h1>
        </Link>

        <h1
          onClick={Signout}
          className='uppercase hover:cursor-pointer hover:text-[#3ca5f6] duration-150  mb-7 font-bold border-b-4 '
        >
          Sign Out
        </h1>
      </div>
    </div>
  );
}
