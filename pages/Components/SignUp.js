import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Link from "next/link";
import Navbar from './Navbar'
import { UserContext } from "../Helper/UserContext";
export default function SignUp() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const {user, setUser} = useContext(UserContext)
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const create = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
     await setUser(create.user.email);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
    <Navbar/>
    <div className='flex justify-center m-auto min-h-screen bg-[#000000] md:bg-[#0b0a0f] h-screen md:h-full shadow-lg shadow-white'>
      <div className=' md:mt-[10%]  text-[#ffffff] shadow-xl   flex-col flex rounded-xl md:p-40 bg-[#000000]  my-auto'>
        <h1 className='mx-auto text-3xl font-bold shadow-2xl '>REGISTER</h1>
        <p className='mx-auto shadow-2xl'>Enter your information to register</p>

        <form className='p-6 mx-auto text-black' onSubmit={handleSubmit}>
          <input
            onChange={(e) => {
              setRegisterEmail(e.target.value);
            }}
            type='email'
            className='border-gray-400 border my-2 px-2 py-2 w-full rounded-xl outline-none focus:border-[#222223]'
            placeholder='johnsmith@example.com'
          />

          <input
            type='password'
            onChange={(e) => {
              setRegisterPassword(e.target.value);
            }}
            className='border-gray-400 border px-2 my-2  w-full py-2 rounded-xl outline-none focus:border-[#222223]'
            placeholder='Password'
          />
          <button
            type='submit'
            className='block my-2 w-full max-w-xs mx-auto  bg-[#02bcff] duration-200 hover:bg-[#0d8eff] focus:bg-[#222223] text-white rounded-lg px-3 py-3 font-semibold'
          >
            Sign Up
          </button>
        </form>
        <div className='mx-auto'>
          Already have an Account? <Link href='/Components/Login'>Login</Link>
        </div>
      </div>
    </div>
    </div>
  );
}
